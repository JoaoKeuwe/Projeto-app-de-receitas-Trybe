/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import RecomendationCard from './RecomendationCard';
import CardFoods from './CardFoods';
import Context from '../Context/context';
import CardDrinks from './CardDrinks';
import SI from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/startRecipe.css';
import '../styles/doneRecipes.css';
import '../styles/carousel.css';

export default function Details() {
  const {
    fetchConditional,
    drink,
    meal,
    ingredients,
    recomendations,
    URLvideo,
    id,
  } = useContext(Context);
  const [name, setName] = useState();
  const [copy, setCopy] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [favorite, setFavorite] = useState();
  const NUM = 6;
  const SR = 'Start Recipe';
  const WHI = whiteHeartIcon;
  const BHI = blackHeartIcon;
  const localFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));

  useEffect(() => { fetchConditional(); }, []);

  function changeButton() {
    const getProcess = localStorage.getItem('inProgressRecipes');
    setName(SR);
    if (getProcess === null) return setName(SR);
    const condition = getProcess.includes(id);
    if (condition) {
      setName('Continue Recipe');
    } if (!condition) {
      setName(SR);
    }
  }
  useEffect(() => { changeButton(); });
  function clipURL() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopy(true);
  }
  const handleFavoriteDrinks = () => {
    setFavorite(!favorite);
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (drink) {
      const obj = { id: drink[0].idDrink,
        type: 'drink',
        nationality: '',
        category: drink[0].strCategory,
        alcoholicOrNot: drink[0].strAlcoholic,
        name: drink[0].strDrink,
        image: drink[0].strDrinkThumb };
      const va = local.some((as) => as.id === drink[0].idDrink);
      const vad = local.some((as) => as.id !== drink[0].idDrink);
      const arr = local.filter((as) => as.id !== drink[0].idDrink);
      if (local.length === 0) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([...local, obj]));
      } if (vad) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([...local, obj]));
      } if (va) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([...arr]));
      }
    } if (meal) {
      const obj = { id: meal[0].idMeal,
        type: 'food',
        nationality: meal[0].strArea,
        category: meal[0].strCategory,
        alcoholicOrNot: '',
        name: meal[0].strMeal,
        image: meal[0].strMealThumb };
      const va = local.some((as) => as.id === meal[0].idMeal);
      const vad = local.some((as) => as.id !== meal[0].idMeal);
      const arr = local.filter((as) => as.id !== meal[0].idMeal);
      if (local.length === 0) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([...local, obj]));
      } if (vad) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([...local, obj]));
      } if (va) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([...arr]));
      }
    }
  };
  function toRedirect() {
    setRedirect(true);
  }

  function verificationFavorite() {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (local) {
      const check = local.some((e) => e.id === id);
      setFavorite(check);
    }
  }
  useEffect(() => {
    verificationFavorite();
  }, [id, verificationFavorite]);
  useEffect(() => {
    if (localFavorite === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, [localFavorite]);
  return (
    <section>
      { drink !== undefined && drink.map((data, index) => (
        <div key={ index }>
          <CardDrinks index={ index } data={ data } />
          <div className="icons-details">
            {copy && (<span>Link copied!</span>)}
            <button type="button" data-testid="share-btn" onClick={ clipURL } src={ SI }>
              <img src={ SI } alt="shareIcon" />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ handleFavoriteDrinks }
              src={ favorite ? BHI : WHI }
            >
              <img src={ favorite ? BHI : WHI } alt="white Heart" />
            </button>
          </div>
          <h4>Ingredients and Measures</h4>
          <ol className="ingredients">
            { ingredients && ingredients.filter(
              ({ ingredient, measure }) => ingredient !== '' && measure !== '',
            ).map(
              ({ ingredient, measure }, x) => (
                <li key={ x } data-testid={ `${x}-ingredient-name-and-measure` }>
                  {`${ingredient} - ${measure}`}
                </li>),
            ) }
          </ol>
          <h4>Instructions</h4>
          <p data-testid="instructions" className="ins">{ data.strInstructions }</p>
          <h4>Recomendations</h4>
          <Carousel>
            {recomendations && recomendations.slice(0, NUM).map((rcard, rindex) => (
              <CarouselItem key={ rindex } className="carousel">
                <RecomendationCard key={ rindex } index={ rindex } recipe={ rcard } />
              </CarouselItem>))}
          </Carousel>
          <button
            className="start-recipe"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ toRedirect }
          >
            {name}
          </button>
          {redirect && <Redirect to={ `/drinks/${data.idDrink}/in-progress` } /> }
        </div>
      ))}
      {meal !== undefined && meal.map((data, index) => (
        <div key={ index }>
          <CardFoods index={ index } data={ data } />
          <div className="icons-details">
            {copy && (<span>Link copied!</span>)}
            <button type="button" data-testid="share-btn" onClick={ clipURL } src={ SI }>
              <img src={ SI } alt="shareIcon" />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ handleFavoriteDrinks }
              src={ favorite ? BHI : WHI }
            >
              <img src={ favorite ? BHI : WHI } alt="white Heart" />
            </button>
          </div>
          <h4>Ingredients and Measures</h4>
          <ol>
            { ingredients && ingredients.filter(
              ({ ingredient, measure }) => ingredient !== '' && measure !== '',
            ).map(
              ({ ingredient, measure }, i) => (
                <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                  {`${ingredient} - ${measure}`}
                </li>),
            ) }
          </ol>
          <h4>Instructions</h4>
          <p data-testid="instructions" className="ins">{ data.strInstructions }</p>
          <h4>Recomendations</h4>
          <Carousel>
            {recomendations && recomendations.slice(0, (NUM)).map((rcardd, ind) => (
              <CarouselItem key={ ind } className="carousel">
                <RecomendationCard key={ ind } recipe={ rcardd } index={ ind } />
              </CarouselItem>))}
          </Carousel>
          <h4>Video</h4>
          <iframe
            className="video"
            title="iframe"
            data-testid="video"
            src={ `https://www.youtube.com/embed/${URLvideo}` }
          />
          <button
            className="start-recipe"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ toRedirect }
          >
            {name}
          </button>
          {redirect && <Redirect to={ `/foods/${data.idMeal}/in-progress` } /> }
        </div>
      ))}
    </section>
  );
}
