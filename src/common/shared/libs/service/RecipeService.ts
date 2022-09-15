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

import { Recipe } from '../types/recipe';
import { db } from '../config/firebase';

class RecipeService {
  createRecipe(post: Recipe) {
    return db.collection('recipes').doc(post.id).set(post);
  }

  async getAllRecipes() {
    return {
      
    }
  }

  async getRecipe(id: string) {
    return '';
  }

  async updateRecipe(id: string) {
    return '';
  }

  async deleteRecipe(id: string) {
    return '';
  }
}

export default new RecipeService();
