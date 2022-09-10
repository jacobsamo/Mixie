import React from 'react'
import { Recipe } from '../common/shared/libs/types';

interface Props {
    post: Recipe;
}
const Details = ({recipe}: Props) =>) => {
  return (
    <div>[id]</div>
  )
}

export default Details;

export async function getStaticPaths() {
    const recipes = await PostService.listPosts();

    const paths = recipes.map((recipe: any) => {
        return { params: { id: recipe.id.toString() } };
    });

    return {
        paths,
        fallback: "blocking", // false or 'blocking'
    };
}

export async function getStaticProps(context: any) {
    const recipe = await PostService.getPost(context.params.id);
    if (!recipe) || !Object.keys(recipe).length) {
        return {
            redirect: {
                permanent: false,
                destination: "/404",
            },
        };
    }
    return {
        props: { recipe },
    };
}
