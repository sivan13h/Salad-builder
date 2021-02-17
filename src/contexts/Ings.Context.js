import React, { createContext, useState } from "react";

export const IngsContext = createContext();

export function IngsProvider(props) {
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = (ingredient) => {
    if (ingredients.some((ing) => ing.name === ingredient.name)) {
      alert("this ingredient already exist in you salad!");
    } else {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const updateIngredients = (updatedIngredients) => {
    setIngredients(updatedIngredients);
  };

  const removeIngredient = (ingredient) => {
    const filteredIngredients = ingredients.filter((ing) => ing !== ingredient);
    setIngredients(filteredIngredients);
  };

  return (
    <IngsContext.Provider
      value={{
        ingredients,
        addIngredient,
        removeIngredient,
        updateIngredients,
      }}
    >
      {props.children}
    </IngsContext.Provider>
  );
}
