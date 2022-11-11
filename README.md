# Meally
Meally is an open source recipe website to easily find recipes you love. 

## General idea
As meally is very new most of the features below won't be implemented straight away however these will be implemented going into the future. 

Here is the general idea: All recipes to be made by the community and approved by the community, meaning there aren't any recipes will spelling mistakes, grammar or a recipe with bad information.

A few big things setting us aside from everyone else is a feature added into the future which will be no recipe is the same an example of this when you get a cook book there isn't any of the same recipe making the same dish. Another thing is for all recipes to have the ability to be edited by the community with of course all recipes being reviewed before being accepted kind of like how github contributions this will also lead to have a version history of the recipe so the community can always go back to the last change or even the original recipe. 




## Difficulties faced though the project

Difficulty 1 issue with useEffect setting a array throwing this error: "Type '{}' is not assignable to type 'never'. " 

What i was trying to do:
```javascript
    useEffect(() => {
        setRecipeData([recipes]);
    }, []);
```

What the issue was:
```javascript

    //this
    const [recipeData, setRecipeData] = useState<any[]>([]);

    //not this
    const [recipeData, setRecipeData] = useState([]);
```

This happens due to not setting an array type and as the data is being fetched from the data base the array starts off as *null* which causes an error as a an array with out an array can't be set to *null*

```javascript
{recipe.steps.forEach(step => {
    <>
        <h1>{step.number.toString()}</h1>
        <p>{step.body}</p>
    </>
 })}
```