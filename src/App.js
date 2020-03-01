import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
  const API_ID = process.env.REACT_APP_API_ID;
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [recipes, setRecipes] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);
  // [] is the second argument and only runs the request once, not every time the page renders/mounts
  // if we put something in the [] it uses the Effect only if that something changes

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearchWord = e => {
    setSearchWord(e.target.value);
    console.log(searchWord);
  };

  const getSearchWord = e => {
    e.preventDefault();
    setQuery(searchWord);
    setSearchWord("");
  };

  return (
    <div className="App">
      <h1 className="app-header">{query.toUpperCase()} recipes</h1>
      <form onSubmit={getSearchWord} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={searchWord}
          onChange={updateSearchWord}
        ></input>
        <button className="search-button" type="submit">
          Search for other recipes
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            totalTime={recipe.recipe.totalTime}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
