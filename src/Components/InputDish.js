import React, { useState, useEffect, useRef } from "react";
import styles from "./InputDish.module.css";

const InputDish = (props) => {
  const [dish, setDish] = useState("");
  const formRef = useRef(null);

  const inputChangeHandler = (event) => {
    setDish(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (dish.trim()) {
      props.searchHandler(dish);
      setDish("");
    } else {
      alert("Please Input a dish");
    }
  };

  useEffect(() => {
    return () => {
      formRef.current ?
      formRef.current.removeEventListener("submit", formSubmitHandler)
      : null;
    };
  }, []);

  return (
    <form onSubmit={formSubmitHandler} ref={formRef}>
      <input
        type="text"
        placeholder="Search Dish"
        value={dish}
        onChange={inputChangeHandler}
        className={styles.input}
      />
      <button className={styles.button}>Search</button>
    </form>
  );
};

export default InputDish;
