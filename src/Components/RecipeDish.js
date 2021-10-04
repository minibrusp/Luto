import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styles from "./RecipeDish.module.css";
import img404 from "../assets/404.png";

const RecipeDish = (prop = "") => {
  const [recipe, setRecipe] = useState("");

  const fetchRecipe = async () => {
    const url = `https://api.edamam.com/api/recipes/v2/${prop.match.params.id}?type=public&app_id=04d87ff3&app_key=32db41b123e7d896f5f485a84e6a9db8`;
    const data = await fetch(url);
    const item = await data.json();

    setRecipe(item.recipe);
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  const {
    label,
    image,
    calories,
    dishType,
    mealType,
    ingredientLines,
    url
  } = recipe;

  let ingredientsArray = [];
  for (const key in ingredientLines) {
    ingredientsArray.push(ingredientLines[key]);
  }

  if (recipe) {
    return (
      <div className={styles.dish}>
        <Link to={"/"} className="links" title="back to homepage">
          Back to homepage
        </Link>

        <article>
          <header>
            <img src={image} alt="dish" />
            <h2>{label}</h2>
            <p>
              Calories: <span>{Math.round(calories)}</span>
            </p>
            <p>
              Dish Type: <span>{dishType}</span>
            </p>
            <p>
              Meal Type: <span>{mealType}</span>
            </p>
          </header>
          <section className={`dishIngredients ${styles.dishIngredients}`}>
            <h3>
              <span>{ingredientsArray.length}</span> Ingredients
            </h3>
            <div>
              <ul>
                {ingredientsArray.map((item) => (
                  <li key={uuidv4()}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
          <section className={`preparation ${styles.preparation}`}>
            <h3>Preparation</h3>
            <p>
              Please see
              <a href={url} target="true" title="to instructions">
                Instructions
              </a>
            </p>
          </section>
        </article>
        <Link to={"/"} className="links" title="back to homepage">
          Back to homepage
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Loading . . .</h2>
        <img src={img404} alt="404" className="notFoundImg" />
      </div>
    );
  }
};

export default RecipeDish;
