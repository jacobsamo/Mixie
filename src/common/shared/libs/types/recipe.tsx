
export type Recipe = {
    id: string;
    imageUrl?: string;
    title: string;
    steps: Array<Array<string>>;
    ingredients: Array<string>;
    createdAt: string;
    createdBy: string;
}