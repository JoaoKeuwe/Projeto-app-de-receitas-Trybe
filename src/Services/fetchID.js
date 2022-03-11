export async function mealID(id) {
  const URL_FETCH_ID = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(URL_FETCH_ID);
  const data = await response.json();
  return data;
}

export async function drinkID(id) {
  const URL_FETCH_ID = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(URL_FETCH_ID);
  const data = await response.json();
  return data;
}
