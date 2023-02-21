import { Timestamp } from 'firebase/firestore';

interface recipeCardProps {
    id: string;
    imageUrl: string;
    recipeName: string;
    recipeDescription: string;
}
declare const RecipeCard: ({ id, imageUrl, recipeName, recipeDescription, }: recipeCardProps) => JSX.Element;

declare function AdBanner(): JSX.Element;

declare const Loader: () => JSX.Element;

declare function InputField(props: any): JSX.Element;

declare const AddButton: (props: any) => JSX.Element;

declare function Dialog(props: any): JSX.Element;

interface pageSEOProps {
    title: string;
    url: string;
    imgUrl: string;
    description: string;
}
declare function PageSeo({ title, url, imgUrl, description }: pageSEOProps): JSX.Element;

interface recipeSEOProps {
    recipeDescription: string;
    recipeName: string;
    imageUrl: string;
    info: string;
    recipeUrl: string;
    createdAt: Timestamp | string;
    keywords: string;
}
declare function RecipeSeo({ recipeDescription, recipeName, imageUrl, info, recipeUrl, createdAt, keywords, }: recipeSEOProps): JSX.Element;

export { AdBanner, AddButton, Dialog, InputField, Loader, PageSeo, RecipeCard, RecipeSeo };
