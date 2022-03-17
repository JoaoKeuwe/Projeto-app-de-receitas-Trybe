export default async function Foods() {
  const URL_RANDOM_FOOD = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const response = await fetch(URL_RANDOM_FOOD);
  const data = await response.json();
  return data;
}
