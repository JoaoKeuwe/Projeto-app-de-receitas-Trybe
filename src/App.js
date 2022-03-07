import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
// import DoneRecipes from './Pages/DoneRecipes';
import Foods from './Pages/Foods';
import Drinks from './Pages/Drinks';
import DrinksDetails from './Pages/DrinksDetails';
import DrinksInProgress from './Pages/DrinksInProgress';
import Explore from './Pages/Explore';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        {/* <Route exact path="/foods/{id-da-receita}" component={ RecipesDetails } /> */}
        <Route exact path="/drinks/{id-da-receita}" component={ DrinksDetails } />
        {/* <Route
          exact
          path="/foods/{id-da-receita}/in-progress"
          component={ RecipesInProgress }
        /> */}
        <Route
          exact
          path="/drinks/{id-da-receita}/in-progress"
          component={ DrinksInProgress }
        />
        <Route exact path="/explore" component={ Explore } />
        {/* <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/explore/foods/ingredients" component={ IngredientsFoods } />
        <Route exact path="/explore/drinks/ingredients" component={ IngredientsDrinks } />
        <Route exact path="/explore/foods/nationalities" component={ Nationalities } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
