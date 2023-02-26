# Difficulties faced though the project

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

This happens due to not setting an array type and as the data is being fetched from the data base the array starts off as _null_ which causes an error as a an array with out an array can't be set to _null_

```javascript
{
  recipe.steps.forEach((step) => {
    <>
      <h1>{step.number.toString()}</h1>
      <p>{step.body}</p>
    </>;
  });
}
```

When i was creating the [search dialog](./src/common/components/elements/algolia_search_dialog.tsx) i found out that there is no easy way to pass down click events from parent to a child element so instead i am now handling them in the child element.
