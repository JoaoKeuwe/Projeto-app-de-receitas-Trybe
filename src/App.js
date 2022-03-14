import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
// import DoneRecipes from './Pages/DoneRecipes';
import ExploreFoods from './Pages/ExploreFoods';
import Drinks from './Pages/Drinks';
import ExploreDrinks from './Pages/ExploreDrinks';
import DrinksDetails from './Pages/DrinksDetails';
import DrinksInProgress from './Pages/DrinksInProgress';
import Explore from './Pages/Explore';
import IngredientsDrinks from './Pages/IngredientsDrinks';
import IngredientsFoods from './Pages/IngredientsFoods';
import Nationalities from './Pages/Nationalities';
import Profile from './Pages/Profile';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import DoneRecipes from './Pages/DoneRecipes';
import FoodsDetails from './Pages/FoodsDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Foods from './Pages/Foods';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/explore/foods/ingredients" component={ IngredientsFoods } />
        <Route exact path="/explore/drinks/ingredients" component={ IngredientsDrinks } />
        <Route exact path="/explore/foods/nationalities" component={ Nationalities } />
        <Route exact path="/foods/:id" component={ FoodsDetails } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/drinks/:id" component={ DrinksDetails } />
        <Route exact path="/explore" component={ Explore } />
        {/* <Route exact path="/drinks/{id-da-receita}" component={  } /> */}
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

        {/*

         */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
