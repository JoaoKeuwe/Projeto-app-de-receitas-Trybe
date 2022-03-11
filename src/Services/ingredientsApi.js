const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export async function ingredientsApi(search, radio) {
  const URL_INGREDIENT = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
  const URL_NAME_FOOD = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  const URL_FIRST_LETTER = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
  if (radio === 'Ingredient') {
    const response = await fetch(URL_INGREDIENT);
    const data = await response.json();
    return data;
  }
  if (radio === 'Name') {
    const response = await fetch(URL_NAME_FOOD);
    const data = await response.json();
    return data;
  }
  if (radio === 'First letter') {
    if (search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const response = await fetch(URL_FIRST_LETTER);
      const data = await response.json();
      return data;
    }
  }
}

export async function foodsApiMount() {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export async function foodsApiCategory() {
  const URL_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(URL_CATEGORY);
  const data = await response.json();
  return data;
}

export async function handleClickCategory(category) {
  const URL_FOODS_CATEGORY = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(URL_FOODS_CATEGORY);
  const data = await response.json();
  return data;
}
