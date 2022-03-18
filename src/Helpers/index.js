export function handleFavorite(setFavorite, favorite, drink) {
  setFavorite(!favorite);
  const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const obj = {
    id: drink[0].idDrink,
    type: 'drink',
    nationality: '',
    category: drink[0].strCategory,
    alcoholicOrNot: drink[0].strAlcoholic,
    name: drink[0].strDrink,
    image: drink[0].strDrinkThumb,
  };
  const va = local.some((as) => as.id === drink[0].idDrink);
  const vad = local.some((as) => as.id !== drink[0].idDrink);
  const arr = local.filter((as) => as.id !== drink[0].idDrink);
  if (local.length === 0) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...local, obj]));
  }
  if (vad) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...local, obj]));
  }
  if (va) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...arr]));
  }
}

export function handleDoneRecipes(drink) {
  const local = JSON.parse(localStorage.getItem('doneRecipes'));
  let tags = [];
  if (drink[0].strTags) {
    tags = drink[0].strTags.split(', ');
  }
  let date = new Date();
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  date = `${dd}/${mm}/${yyyy}`;
  const obj = {
    id: drink[0].idDrink,
    type: 'drink',
    nationality: '',
    category: drink[0].strCategory,
    alcoholicOrNot: drink[0].strAlcoholic,
    name: drink[0].strDrink,
    image: drink[0].strDrinkThumb,
    doneDate: date,
    tags,
  };
  // const va = local.some((as) => as.id === drink[0].idDrink);
  const vad = local.some((as) => as.id !== drink[0].idDrink);
  // const arr = local.filter((as) => as.id !== drink[0].idDrink);
  if (local.length === 0) {
    localStorage.setItem('doneRecipes', JSON.stringify([...local, obj]));
  }
  if (vad) {
    localStorage.setItem('doneRecipes', JSON.stringify([...local, obj]));
  }
  // essa logica faz apagar a recieta igual que já tem;
  // if (va) {
  //   localStorage.setItem('doneRecipes', JSON.stringify([...arr]));
  // }
}

export function handleDoneMeals(meal) {
  const local = JSON.parse(localStorage.getItem('doneRecipes'));
  let tags = [];
  if (meal[0].strTags) {
    tags = meal[0].strTags.split(',');
  }
  let date = new Date();
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  date = `${dd}/${mm}/${yyyy}`;
  const obj = {
    id: meal[0].idMeal,
    type: 'food',
    nationality: meal[0].strArea,
    category: meal[0].strCategory,
    alcoholicOrNot: meal[0].strAlcoholic,
    name: meal[0].strMeal,
    image: meal[0].strMealThumb,
    doneDate: date,
    tags,
  };
  // const va = local.some((as) => as.id === meal[0].idMeal);
  const vad = local.some((as) => as.id !== meal[0].idMeal);
  // const arr = local.filter((as) => as.id !== meal[0].idMeal);
  if (local.length === 0) {
    localStorage.setItem('doneRecipes', JSON.stringify([...local, obj]));
  }
  if (vad) {
    localStorage.setItem('doneRecipes', JSON.stringify([...local, obj]));
  }
  // essa logica faz apagar a recieta igual que já tem;
  // if (va) {
  //   localStorage.setItem('doneRecipes', JSON.stringify([...arr]));
  // }
}
