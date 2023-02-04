import { AddButton } from 'ui';

const Ingredient = (props: any) => {
  return (
    <div className="flex flex-row items-center py-1 gap-1">
      <input type="checkbox" />
    </div>
  );
};

const IngredientContainer = (props: any) => {
  return (
    <>
      <article>
        <section className={`flex flex-col w-[12.5rem] gap-3`}>
          <Ingredient />
          <AddButton type="button" name="Ingredient" />
        </section>
      </article>
    </>
  );
};

//className={styles.IngredientMethodContainer}
//${styles.recipeIngredients}

export { Ingredient, IngredientContainer };
