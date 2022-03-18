import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './context';

function Provider({ children }) {
  const [fetchSearch, setFetchSearch] = useState('');
  const [fetchRadio, setFetchRadio] = useState('');
  const [recipes, setRecipes] = useState('');
  const [filterIngredients, setFilterIngredients] = useState([]);
  console.log(filterIngredients);

  function handleRecipes(param) {
    if (param && Object.keys(param).includes('drinks')) {
      return setRecipes(param.drinks);
    }
    if (param && Object.keys(param).includes('meals')) {
      return setRecipes(param.meals);
    }
    return setRecipes(param);
  }

  function handleSearch(search) {
    return setFetchSearch(search);
  }
  function handleRadio(radio) {
    return setFetchRadio(radio);
  }
  const context = {
    handleRadio,
    handleSearch,
    handleRecipes,
    fetchRadio,
    fetchSearch,
    recipes,
    filterIngredients,
    setFilterIngredients,
  };
  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
