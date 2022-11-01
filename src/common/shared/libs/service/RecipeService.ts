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

import type { Recipe } from '../types/recipe';
import { db } from '../config/firebase';

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

  async updateRecipe(id: string) {
    return '';
  }

  async deleteRecipe(id: string) {
    return '';
  }
}

export default new RecipeService();
