import React from "react";
import { Link } from "react-router-dom";
import styles from "./GenericRecipe.module.css";

const GenericRecipe = (props) => {
  const { label, image, calories, ingredientLines, uri } = props.recipe.recipe;

  const itemId = uri.replace(
    "http://www.edamam.com/ontologies/edamam.owl#recipe_",
    ""
  );

  return (
    <div className={`itemContainer ${styles.itemContainer}`}>
      <Link to={`/${itemId}`}>
        <div className={styles.itemImgContainer}>
          <img src={image} alt="dish" />
        </div>
        <h2>{label}</h2>
      </Link>
      <div className={styles.itemDescription}>
        <p>
          Calories: <span>{Math.round(calories)}</span>
        </p>
        <p>
          Ingredients: <span>{ingredientLines.length}</span>
        </p>
      </div>
    </div>
  );
};

export default GenericRecipe;
