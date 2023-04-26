import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  where,
} from 'firebase/firestore';

import type { Recipe, SimplifiedRecipe } from 'libs/types';
import { db, auth } from '@lib/config/firebase';

class RecipeService {
  async createRecipe(
    post: Recipe
  ): Promise<Recipe | { message: string | Error; status: number }> {
    try {
      await setDoc(doc(db, 'recipes', post.id), post);
      await addDoc(
        collection(db, 'users', auth.currentUser?.uid || '', 'recipes'),
        {
          id: post.id,
          recipeName: post.recipeName,
          image: post.image,
          sweet_savoury: post.sweet_savoury,
          dietary: post.dietary,
          info: {
            total: post.info.total,
            rating: post.info.rating,
          },
          keywords: post.keywords,
          createdAt: post.createdAt,
          createdBy: post.createdBy,
        } as SimplifiedRecipe
      );
      return { message: 'Recipe created successfully', status: 200 };
    } catch (e: any) {
      console.error('Error saving recipe:', e);
      return { message: e, status: 400 };
    }
  }

  async getLatestRecipes(limitAmount?: number) {
    const recipeRef = collection(db, 'recipes');

    const querySnapshot = await getDocs(
      query(recipeRef, orderBy('createdAt', 'asc'), limit(limitAmount || 9))
    );

    const recipes: Recipe[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Recipe;
      const createdAt = data.createdAt as any;
      recipes.push({
        ...data,
        createdAt: new Date(createdAt).toDateString(),
      });
    });
    return recipes;
  }

  async getRecipesByCategory(sweet_savoury: string, limitAmount?: number) {
    const recipeRef = collection(db, 'recipes');

    const querySnapshot = await getDocs(
      query(
        recipeRef,
        where(sweet_savoury, '==', 'sweet_savoury'),
        orderBy('createdAt', 'asc'),
        limit(limitAmount || 9)
      )
    );

    const recipes: Recipe[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Recipe;
      const createdAt = data.createdAt as any;
      recipes.push({
        ...data,
        createdAt: new Date(createdAt).toDateString(),
      });
    });
    return recipes;
  }

  async getLatestMealTime(time: string) {
    const recipeRef = collection(db, 'recipes');

    const querySnapshot = await getDocs(
      query(
        recipeRef,
        where(time, '==', 'mealTime'),
        orderBy('createdAt', 'asc'),
        limit(9)
      )
    );

    const recipes: Recipe[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Recipe;
      const createdAt = data.createdAt as any;
      recipes.push({
        ...data,
        createdAt: new Date(createdAt).toDateString(),
      });
    });
    return recipes;
  }

  async getRecipe(id: string) {
    const docRef = doc(db, 'recipes', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Recipe;
      const createdAt = data.createdAt as any;
      data['createdAt'] = new Date(createdAt.toDate()).toDateString();
      return data;
    } else {
      return {};
    }
  }

  async getAllRecipes() {
    const querySnapshot = await getDocs(collection(db, 'recipes'));
    const recipes: Recipe[] = [];
    querySnapshot.forEach((recipe) => {
      const data = recipe.data() as Recipe;
      const createdAt = data.createdAt as any;
      recipes.push({
        ...data,
        createdAt: new Date(createdAt).toDateString(),
      });
    });
    return recipes;
  }

  async updateRecipe(id: string, data: any) {
    const docRef = doc(db, 'recipes', id);
    const updatedDoc = await updateDoc(docRef, data);
    return updatedDoc;
  }

  async deleteRecipe(id: string) {
    return "can't delete recipe";
  }
}

export default new RecipeService();
