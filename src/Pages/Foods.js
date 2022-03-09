import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../Context/context';
import Header from '../Components/Header';

export default function Foods() {
  const { recipes } = useContext(Context);
  const [redirectId, setRedirectId] = useState(false);
  function handleRedirect() {
    if (recipes && recipes.length === 1) {
      return setRedirectId(true);
    }
  }

  useEffect(() => {
    handleRedirect();
  });
  return (
    <div>
      <Header
        title="Foods"
      />
      { redirectId && <Redirect to={ `/foods/${recipes[0].idMeal}` } /> }
    </div>
  );
}
