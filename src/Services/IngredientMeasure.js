const IngredientMeasure = (arr) => {
  const entries = Object.entries(arr[0]);
  const arrIngredients = entries.filter(
    (entri) => entri[0].includes('strIngredient') && entri[1] !== null,
  );
  const arrMeasure = entries.filter(
    (entri) => entri[0].includes('strMeasure') && entri[1] !== null,
  );
  const arrI = arrIngredients.map((i) => i[1]);
  const arrM = arrMeasure.map((m) => m[1]);
  const fullArray = arrI.reduce(((acc, item, index) => {
    const setup = { ingredient: '', measure: '' };
    setup.ingredient = item;
    setup.measure = arrM[index];
    acc.push(setup);
    return acc;
  }), []);
  return fullArray;
};

export default IngredientMeasure;
