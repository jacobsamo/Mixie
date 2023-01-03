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
} from 'firebase/firestore';

import type { Recipe } from 'libs/types';
import { db } from '@lib/config/firebase';

class RecipeService {
  createRecipe(post: Recipe) {
    return setDoc(doc(db, 'recipes', post.id), post);
  }

  async getRecipe(id: string) {
    const recipe = await getDoc(doc(db, 'recipes', id))
    const data = await recipe.data() as Recipe;
    return data;
  }

  async getAllRecipes() {
    const querySnapshot = await getDocs(collection(db, "recipes"));
    const recipes: Recipe[] = [];
    querySnapshot.forEach((recipe) => {
      const data = recipe.data() as Recipe;
      recipes.push(...recipes, data)
    })
    return recipes;
  }

  async updateRecipe(id: string, data: any) {
    const docRef = doc(db, "recipes", id);
    const updatedDoc = await updateDoc(docRef, data);
    return updatedDoc;
  }

  async deleteRecipe(id: string) {
    return "can't delete recipe";
  }
}

export default new RecipeService();
