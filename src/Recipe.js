import React from "react";
import style from "./recipe.module.css";

const Recipe = ({ title, calories, image, ingredients, totalTime }) => {
  return (
    <div className={style.recipe}>
      <h2 className={style.name}>
        {title} <span className={style.time}>{totalTime} min</span>
      </h2>
      <p className={style.calories}>{calories.toFixed(2)} cal</p>
      <img className={style.image} src={image} alt="meal" />
      <ul>
        {ingredients.map(ingredient => (
          <li key={ingredients.indexOf(ingredient)}>{ingredient.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recipe;
