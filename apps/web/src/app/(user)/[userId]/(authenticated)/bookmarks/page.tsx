import {
  CardRecipe,
  CardRectangle,
  CardRectangleSmall,
  CardSquare,
  SearchCard,
} from "@/components/cards";
import { createClient } from "@mixie/supabase/server";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookmarkIcon, FolderIcon, PlusCircleIcon } from "lucide-react";
import { search } from "unsplash-js/dist/internals";
import { getBookmarksForCollection } from "@/lib/utils/bookmarks";
import { Bookmark, BookmarkWithRecipe } from "@/types";
import { Tables } from "@mixie/supabase/types";
import CreateCollectionDialog from "@/components/modals/create-collection-modal";
import CollectionRecipeModal from "@/components/providers/collection-recipes-modal";

interface DraftsPageProps {
  params: {
    userId: string;
  };
  searchParams?: { [key: string]: string | undefined };
}

export default async function DraftsPage({
  params,
  searchParams,
}: DraftsPageProps) {
  const supabase = createClient();
  const { data: bookmarks } = await supabase
    .from("bookmarks_with_recipes")
    .select()
    .eq("user_id", params.userId);
  const { data: links } = await supabase
    .from("bookmark_link")
    .select()
    .eq("user_id", params.userId);
  const { data: collections } = await supabase
    .from("collections")
    .select()
    .eq("user_id", params.userId);

  const selectedCollection =
    collections?.find(
      (collection) => collection.collection_id === searchParams?.collection
    ) ?? null;
  const typedBookmarks = bookmarks as BookmarkWithRecipe[];

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Recipe Bookmarks</h1>
      <Tabs defaultValue="collections">
        <TabsList className="mb-4">
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="all-bookmarks">All Bookmarks</TabsTrigger>
        </TabsList>
        <TabsContent value="collections">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {collections &&
              collections.map((collection) => (
                <Card key={collection.collection_id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{collection.title}</CardTitle>
                    {collection.description && (
                      <CardDescription>
                        {collection.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="grid grid-cols-3 gap-2">
                      {getBookmarksForCollection(
                        collection.collection_id,
                        links,
                        typedBookmarks
                      )!
                        .slice(0, 3)
                        .map((bookmark) => {
                          return (
                            <img
                              key={bookmark.bookmark_id}
                              src={bookmark.image_url!}
                              alt={bookmark.title!}
                              className="aspect-square h-auto w-full rounded-sm object-cover"
                            />
                          );
                        })}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <CollectionRecipeModal
                      collection={collection}
                      bookmarks={
                        getBookmarksForCollection(
                          collection.collection_id,
                          links,
                          typedBookmarks
                        ) as CardRecipe[]
                      }
                    />
                  </CardFooter>
                </Card>
              ))}
            <Card className="flex items-center justify-center">
              <CreateCollectionDialog />
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="all-bookmarks">
          <div className="flex flex-wrap gap-2">
            {bookmarks &&
              bookmarks.map((bookmark) => (
                <CardRectangleSmall
                  key={bookmark.bookmark_id}
                  recipe={bookmark as CardRecipe}
                />
              ))}
            {/* <Card className="flex items-center justify-center">
              <Button variant="ghost" className="h-full w-full">
                <BookmarkIcon className="mr-2 h-4 w-4" />
                Add Bookmark
              </Button>
            </Card> */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
