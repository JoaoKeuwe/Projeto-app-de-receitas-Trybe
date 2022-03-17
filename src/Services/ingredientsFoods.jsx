export default async function Ingredients() {
  const URL_INGREDIENTS_FOODS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(URL_INGREDIENTS_FOODS);
  const data = await response.json();
  return data;
}
