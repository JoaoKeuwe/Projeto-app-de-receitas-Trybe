import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../Context/context';
import Header from '../Components/Header';

function Drinks() {
  const { recipes } = useContext(Context);
  const [redirectId, setRedirectId] = useState(false);
  function handleRedirect() {
    if (recipes && recipes.length === 1) {
      return setRedirectId(true);
    }
  }

  useEffect(() => handleRedirect());
  return (
    <div>
      <Header title="Drinks" />
      { redirectId && <Redirect to={ `/drinks/${recipes[0].idDrink}` } /> }
    </div>
  );
}
export default Drinks;
