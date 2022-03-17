export default async function Drinks() {
  const URL_RANDOM_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const response = await fetch(URL_RANDOM_DRINKS);
  const data = await response.json();
  return data;
}
