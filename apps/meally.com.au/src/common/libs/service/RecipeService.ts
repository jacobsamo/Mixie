import {
  doc,
  setDoc,
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

import type { Recipe } from 'libs/types';
import { db } from '@lib/config/firebase';

class RecipeService {
  createRecipe(post: Recipe) {
    return setDoc(doc(db, 'recipes', post.id), post);
  }

  async getLatestRecipes() {
    const recipeRef = collection(db, 'recipes');

    const querySnapshot = await getDocs(
      query(recipeRef, orderBy('createdAt', 'asc'), limit(9))
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
