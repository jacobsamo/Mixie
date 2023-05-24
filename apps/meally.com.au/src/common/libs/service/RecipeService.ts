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
  Timestamp,
} from 'firebase/firestore';
import type { Rating, RatingScale, Recipe, SimplifiedRecipe } from 'libs/types';
import { db, auth } from '@lib/config/firebase';

class RecipeService {
  async createRecipe(
    post: Recipe
  ): Promise<{ message: string | Error; status: number }> {
    try {
      await setDoc(doc(db, 'recipes', post.id), post);
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
        createdAt: Timestamp.fromDate(createdAt.toDate()),
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
        createdAt: Timestamp.fromDate(createdAt.toDate()),
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
        createdAt: Timestamp.fromDate(createdAt.toDate()),
      });
    });
    return recipes;
  }

  async getRecipe(id: string) {
    const docRef = doc(db, 'recipes', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Recipe;
      const querySnapshot = await getDocs(
        collection(doc(db, 'recipes', data.id), 'rating')
      );

      let totalRating = 0;
      let ratingCount = 0;

      querySnapshot.forEach((doc) => {
        const ratingData = doc.data() as Rating;
        totalRating += ratingData.rating;
        ratingCount++;
      });

      if (ratingCount > 0) {
        const averageRating = totalRating / ratingCount;
        const roundedAverageRating = Math.round(averageRating);

        data.info.rating = roundedAverageRating as RatingScale;
      } else {
        data.info.rating = 0;
      }
      data.createdAt.toDate();
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
      data.createdAt.toDate();
      recipes.push({
        ...data,
      });
    });
    return recipes;
  }

  async updateRecipe(id: string, data: Recipe) {
    const docRef = doc(db, 'recipes', id);
    const updatedDoc = await updateDoc(docRef, data);
    return updatedDoc;
  }

  async getRating(id: string) {}

  async updateRating(
    id: string,
    data: Rating
  ): Promise<{ message: string; status: number }> {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(
        collection(doc(db, 'recipes', id), 'rating'),
        user.uid
      );
      await setDoc(docRef, data);
      return { message: 'Successfully updated rating', status: 200 };
    }
    return { message: 'User not authenticated', status: 401 };
  }

  async deleteRecipe(id: string) {
    return "can't delete recipe";
  }
}

export default new RecipeService();
