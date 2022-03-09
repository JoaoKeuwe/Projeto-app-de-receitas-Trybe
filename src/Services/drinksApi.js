const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export async function drinksApi(search, radio) {
  const URL_INGREDIENT = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
  const URL_DRINK = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
  const URL_FIRST_LETTER = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;
  if (radio === 'Ingredient') {
    const response = await fetch(URL_INGREDIENT);
    const data = await response.json();
    return data;
  }
  if (radio === 'Name') {
    const response = await fetch(URL_DRINK);
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

export async function drinksApiMonunt() {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}
