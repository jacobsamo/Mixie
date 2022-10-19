# Meally

## Difficulties

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