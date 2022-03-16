function SaveFavRecipes(recipe) {
  const recipeKey = Object.keys(recipe);
  const typeRecipe = recipeKey[0];
  if (typeRecipe === 'idDrink') {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([
        {
          id: recipe.idDrink,
          type: 'drink',
          nationality: '',
          category: recipe.strCategory,
          alcoholicOrNot: recipe.strAlcoholic,
          name: recipe.strDrink,
          image: recipe.strDrinkThumb,
        }]),
    );
  }
  if (typeRecipe === 'idMeal') {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([
        {
          id: recipe.idMeal,
          type: 'food',
          nationality: recipe.strArea,
          category: recipe.strCategory,
          alcoholicOrNot: '',
          name: recipe.strMeal,
          image: recipe.strMealThumb,
        }]),
    );
  }
}

export default SaveFavRecipes;
