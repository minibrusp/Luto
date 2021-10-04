import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import imgBowl from "../assets/Bowl.png";
import img404 from "../assets/404.png";
import InputDish from "./InputDish";
import GenericRecipe from "./GenericRecipe";
import styles from "./RecipeContainer.module.css";

const RecipeContainer = () => {
  const [recipes, setRecipes] = useState([]);
  const [dish, setDish] = useState("Chicken Adobo");

  const fetchRecipe = async (defaultDish = dish) => {
    const filterDish = defaultDish.replace(" ", "%20");
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${filterDish}&app_id=04d87ff3&app_key=32db41b123e7d896f5f485a84e6a9db8`;
    const data = await fetch(url);
    const items = await data.json();
    setRecipes(items.hits);
  };

  useEffect(() => {
    const temp = sessionStorage.getItem("dish");
    if (temp) {
      const savedDish = JSON.parse(temp);
      fetchRecipe(savedDish);
    } else {
      fetchRecipe();
    }
  }, []);

  const searchHandler = (dishName) => {
    fetchRecipe(dishName);
    setDish(dishName);
    const temp = JSON.stringify(dishName);
    sessionStorage.setItem("dish", temp);
  };

  // return <h1>asdsadsad</h1>;

  if (recipes.length) {
    return (
      <section>
        <img src={imgBowl} alt="food" className="landingImg" />
        <InputDish searchHandler={searchHandler} />
        <div className={styles.itemsContainer}>
          {recipes.map((recipe) => (
            <GenericRecipe key={uuidv4()} recipe={recipe} />
          ))}
        </div>
      </section>
    );
  } else {
    return (
      <section>
        <InputDish searchHandler={searchHandler} />
        <div>
          <h2>Searching . . .</h2>
          <img src={img404} alt="404" className="notFoundImg" />
          <p>If it takes too long</p>
          <p>Please try another search</p>
        </div>
      </section>
    );
  }
};

export default RecipeContainer;
