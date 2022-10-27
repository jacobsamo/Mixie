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
    return setDoc(doc(db, "recipes", post.id), post);
  }

  async getRecipe() {
    return getDocs(collection(db, "recipes"))
  }

  async getAllRecipes() {
    const recipes = query(
      collection(db, "recipes"),
    )
    let docs: any = []
    const querySnapshot = await getDocs(recipes)
    const allRecipes = querySnapshot.forEach(recipe => {
      docs.push(recipe.data())
    })  
    // console.log(docs)
    return docs
}

  async updateRecipe(id: string) {
    return '';
  }

  async deleteRecipe(id: string) {
    return '';
  }
}

export default new RecipeService();
