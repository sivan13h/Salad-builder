import React, { createContext, useState } from "react";

interface ingredient {
  name: string;
  gramms: number;
}

interface AppContextInterface {
  ingredients: ingredient[];
  addIngredient: (ingredient: ingredient) => void;
  removeIngredient: (ingredient: ingredient) => void;
  updateIngredients: (updatedIngredients: ingredient[]) => void;
}

export const IngsContext = createContext<AppContextInterface>(
  {} as AppContextInterface
);

export const IngsProvider: React.FC<{}> = ({ children }) => {
  const [ingredients, setIngredients] = useState<ingredient[]>([]);

  const addIngredient = (ingredient: ingredient) => {
    if (ingredients.some((ing) => ing.name === ingredient.name)) {
      alert("this ingredient already exist in you salad!");
    } else {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const updateIngredients = (updatedIngredients: ingredient[]) => {
    setIngredients(updatedIngredients);
  };

  const removeIngredient = (ingredient: ingredient) => {
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
      {children}
    </IngsContext.Provider>
  );
};
