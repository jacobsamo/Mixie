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
    return getDocs(collection(db, 'recipes'));
  }

  async getAllRecipes() {
    const recipes: Recipe[] = [];
    const querySnapshot = await getDocs(query(collection(db, 'recipes')));
    const allRecipes = querySnapshot.forEach((recipe) => {
      const data = recipe.data() as Recipe;
      recipes.push(data)
    });
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
