export default async function ingredientsDrinks() {
  const URL_INGREDIENTS_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(URL_INGREDIENTS_DRINKS);
  const data = await response.json();
  return data;
}
