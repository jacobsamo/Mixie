export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      blog: {
        Row: {
          author_id: string;
          blog_id: string;
          blog_type: Database["public"]["Enums"]["blog_type"];
          content: string;
          created_at: string;
          image_attributes: Json | null;
          image_url: string | null;
          published: boolean;
          slug: string;
          tags: string[] | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          author_id: string;
          blog_id?: string;
          blog_type?: Database["public"]["Enums"]["blog_type"];
          content: string;
          created_at?: string;
          image_attributes?: Json | null;
          image_url?: string | null;
          published?: boolean;
          slug: string;
          tags?: string[] | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          author_id?: string;
          blog_id?: string;
          blog_type?: Database["public"]["Enums"]["blog_type"];
          content?: string;
          created_at?: string;
          image_attributes?: Json | null;
          image_url?: string | null;
          published?: boolean;
          slug?: string;
          tags?: string[] | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "blog_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      bookmark_link: {
        Row: {
          bookmark_id: string;
          collection_id: string;
          created_at: string;
          link_id: string;
          recipe_id: string | null;
          user_id: string | null;
        };
        Insert: {
          bookmark_id: string;
          collection_id: string;
          created_at?: string;
          link_id?: string;
          recipe_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          bookmark_id?: string;
          collection_id?: string;
          created_at?: string;
          link_id?: string;
          recipe_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "bookmark_link_bookmark_id_fkey";
            columns: ["bookmark_id"];
            isOneToOne: false;
            referencedRelation: "bookmarks";
            referencedColumns: ["bookmark_id"];
          },
          {
            foreignKeyName: "bookmark_link_bookmark_id_fkey";
            columns: ["bookmark_id"];
            isOneToOne: false;
            referencedRelation: "bookmarks_view";
            referencedColumns: ["bookmark_id"];
          },
          {
            foreignKeyName: "bookmark_link_collection_id_fkey";
            columns: ["collection_id"];
            isOneToOne: false;
            referencedRelation: "collections";
            referencedColumns: ["collection_id"];
          },
          {
            foreignKeyName: "bookmark_link_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipes";
            referencedColumns: ["recipe_id"];
          },
          {
            foreignKeyName: "bookmark_link_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      bookmarks: {
        Row: {
          bookmark_id: string;
          created_at: string;
          notes: string | null;
          rating: number | null;
          recipe_id: string | null;
          tags: string[] | null;
          user_id: string | null;
        };
        Insert: {
          bookmark_id?: string;
          created_at?: string;
          notes?: string | null;
          rating?: number | null;
          recipe_id?: string | null;
          tags?: string[] | null;
          user_id?: string | null;
        };
        Update: {
          bookmark_id?: string;
          created_at?: string;
          notes?: string | null;
          rating?: number | null;
          recipe_id?: string | null;
          tags?: string[] | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "bookmarks_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipes";
            referencedColumns: ["recipe_id"];
          },
          {
            foreignKeyName: "bookmarks_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      collections: {
        Row: {
          collection_id: string;
          created_at: string;
          description: string | null;
          title: string;
          user_id: string | null;
        };
        Insert: {
          collection_id?: string;
          created_at?: string;
          description?: string | null;
          title: string;
          user_id?: string | null;
        };
        Update: {
          collection_id?: string;
          created_at?: string;
          description?: string | null;
          title?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "collections_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      documents: {
        Row: {
          content: string;
          created_at: string;
          document_id: string;
          document_type: Database["public"]["Enums"]["document_type"];
          title: string;
          updated_at: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          document_id?: string;
          document_type: Database["public"]["Enums"]["document_type"];
          title: string;
          updated_at?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          document_id?: string;
          document_type?: Database["public"]["Enums"]["document_type"];
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      feedback: {
        Row: {
          created_at: string;
          description: string;
          feedback_id: string;
          page: string | null;
          title: string;
          type: Database["public"]["Enums"]["feedback_type"];
          user_email: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          description: string;
          feedback_id?: string;
          page?: string | null;
          title: string;
          type?: Database["public"]["Enums"]["feedback_type"];
          user_email: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string;
          feedback_id?: string;
          page?: string | null;
          title?: string;
          type?: Database["public"]["Enums"]["feedback_type"];
          user_email?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "feedback_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          bio: string | null;
          created_at: string;
          email: string | null;
          first_name: string | null;
          full_name: string | null;
          last_name: string | null;
          profile_id: string;
          profile_picture: string | null;
          updated_at: string;
          user_name: string | null;
          user_role: Database["public"]["Enums"]["user_role"];
        };
        Insert: {
          bio?: string | null;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          full_name?: string | null;
          last_name?: string | null;
          profile_id: string;
          profile_picture?: string | null;
          updated_at?: string;
          user_name?: string | null;
          user_role?: Database["public"]["Enums"]["user_role"];
        };
        Update: {
          bio?: string | null;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          full_name?: string | null;
          last_name?: string | null;
          profile_id?: string;
          profile_picture?: string | null;
          updated_at?: string;
          user_name?: string | null;
          user_role?: Database["public"]["Enums"]["user_role"];
        };
        Relationships: [
          {
            foreignKeyName: "profiles_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      ratings: {
        Row: {
          rating: number;
          rating_id: string;
          recipe_id: string | null;
          user_id: string | null;
        };
        Insert: {
          rating: number;
          rating_id?: string;
          recipe_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          rating?: number;
          rating_id?: string;
          recipe_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ratings_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipes";
            referencedColumns: ["recipe_id"];
          },
          {
            foreignKeyName: "ratings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      recipe_versions: {
        Row: {
          changes: Json;
          recipe_id: string | null;
          recipe_version_id: string;
          updated_at: string;
          updated_by: string | null;
          version: string;
        };
        Insert: {
          changes: Json;
          recipe_id?: string | null;
          recipe_version_id?: string;
          updated_at?: string;
          updated_by?: string | null;
          version: string;
        };
        Update: {
          changes?: Json;
          recipe_id?: string | null;
          recipe_version_id?: string;
          updated_at?: string;
          updated_by?: string | null;
          version?: string;
        };
        Relationships: [
          {
            foreignKeyName: "recipe_versions_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipes";
            referencedColumns: ["recipe_id"];
          },
          {
            foreignKeyName: "recipe_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      recipes: {
        Row: {
          category: string[] | null;
          cook_time: number | null;
          created_at: string;
          created_by: string;
          cuisine: string[] | null;
          description: string | null;
          difficulty_level: Database["public"]["Enums"]["difficulty_level"];
          id: string;
          image_attributes: Json | null;
          image_url: string | null;
          ingredients: Json | null;
          ingredients_list: string[] | null;
          keywords: string[] | null;
          meal_time: Json | null;
          notes: string | null;
          nutrition: Json | null;
          prep_time: number | null;
          public: boolean;
          rating: number | null;
          recipe_creation_type: Database["public"]["Enums"]["recipe_creation_type"];
          recipe_id: string;
          source: string | null;
          steps: Json | null;
          suitable_for_diet: string | null;
          sweet_savoury: Database["public"]["Enums"]["sweet_savoury"];
          title: string;
          total_time: number | null;
          version: string;
          yield: number | null;
        };
        Insert: {
          category?: string[] | null;
          cook_time?: number | null;
          created_at?: string;
          created_by: string;
          cuisine?: string[] | null;
          description?: string | null;
          difficulty_level?: Database["public"]["Enums"]["difficulty_level"];
          id: string;
          image_attributes?: Json | null;
          image_url?: string | null;
          ingredients?: Json | null;
          ingredients_list?: string[] | null;
          keywords?: string[] | null;
          meal_time?: Json | null;
          notes?: string | null;
          nutrition?: Json | null;
          prep_time?: number | null;
          public?: boolean;
          rating?: number | null;
          recipe_creation_type?: Database["public"]["Enums"]["recipe_creation_type"];
          recipe_id?: string;
          source?: string | null;
          steps?: Json | null;
          suitable_for_diet?: string | null;
          sweet_savoury?: Database["public"]["Enums"]["sweet_savoury"];
          title: string;
          total_time?: number | null;
          version?: string;
          yield?: number | null;
        };
        Update: {
          category?: string[] | null;
          cook_time?: number | null;
          created_at?: string;
          created_by?: string;
          cuisine?: string[] | null;
          description?: string | null;
          difficulty_level?: Database["public"]["Enums"]["difficulty_level"];
          id?: string;
          image_attributes?: Json | null;
          image_url?: string | null;
          ingredients?: Json | null;
          ingredients_list?: string[] | null;
          keywords?: string[] | null;
          meal_time?: Json | null;
          notes?: string | null;
          nutrition?: Json | null;
          prep_time?: number | null;
          public?: boolean;
          rating?: number | null;
          recipe_creation_type?: Database["public"]["Enums"]["recipe_creation_type"];
          recipe_id?: string;
          source?: string | null;
          steps?: Json | null;
          suitable_for_diet?: string | null;
          sweet_savoury?: Database["public"]["Enums"]["sweet_savoury"];
          title?: string;
          total_time?: number | null;
          version?: string;
          yield?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "recipes_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      blog_view: {
        Row: {
          author_id: string | null;
          author_meta: Json | null;
          blog_id: string | null;
          blog_type: Database["public"]["Enums"]["blog_type"] | null;
          content: string | null;
          created_at: string | null;
          image_attributes: Json | null;
          image_url: string | null;
          published: boolean | null;
          tags: string[] | null;
          title: string | null;
          updated_at: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "blog_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      bookmarks_view: {
        Row: {
          bookmark_id: string | null;
          collections: Json | null;
          created_at: string | null;
          notes: string | null;
          rating: number | null;
          recipe_id: string | null;
          recipes: Json | null;
          tags: string[] | null;
          user_id: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "bookmarks_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipes";
            referencedColumns: ["recipe_id"];
          },
          {
            foreignKeyName: "bookmarks_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      allergens:
        | "none"
        | "gluten"
        | "dairy"
        | "nuts"
        | "eggs"
        | "soya"
        | "fish"
        | "shellfish"
        | "sesame"
        | "celery"
        | "mustard"
        | "lupin"
        | "molluscs";
      amount: "not_set" | "1/8" | "1/2" | "1/3" | "2/3" | "1/4" | "3/4";
      averageTimeToCook:
        | "not_set"
        | "less_than_15"
        | "15_to_30"
        | "30_to_45"
        | "45_to_60"
        | "60_to_90"
        | "90_to_120"
        | "more_than_120";
      blog_type: "blog" | "release" | "announcement" | "event";
      diet:
        | "none"
        | "vegetarian"
        | "vegan"
        | "pescatarian"
        | "gluten_free"
        | "dairy_free"
        | "nut_free"
        | "egg_free";
      dietary:
        | "none"
        | "vegetarian"
        | "vegan"
        | "pescatarian"
        | "gluten_free"
        | "dairy_free"
        | "nut_free"
        | "egg_free";
      difficulty_level: "not_set" | "easy" | "medium" | "hard";
      document_type: "privacy_policy" | "terms_of_service";
      feedback_type: "feature" | "bug" | "other";
      fonts: "default" | "open_dyslexic" | "monospace" | "serif" | "sans_serif";
      loveCooking:
        | "not_set"
        | "hate_it"
        | "dislike_it"
        | "neutral"
        | "like_it"
        | "love_it";
      mealTime:
        | "not_set"
        | "breakfast"
        | "lunch"
        | "dinner"
        | "snack"
        | "dessert";
      recipe_creation_type: "title" | "image" | "link" | "upload";
      sweet_savoury: "not_set" | "sweet" | "savoury" | "both";
      theme: "system" | "light" | "dark";
      unit:
        | "not_set"
        | "grams"
        | "kg"
        | "cup"
        | "ml"
        | "litre"
        | "tsp"
        | "tbsp"
        | "pinch"
        | "item"
        | "handful"
        | "slice"
        | "piece"
        | "can"
        | "bunch"
        | "bottle";
      user_role: "user" | "admin";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
