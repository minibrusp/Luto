import React from "react";
import "./styles.css";
import Header from "./Components/Header";
import RecipeContainer from "./Components/RecipeContainer";
import RecipeDish from "./Components/RecipeDish";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={RecipeContainer} />
          <Route path="/:id" exact component={RecipeDish} />
        </Switch>
      </div>
    </Router>
  );
}
