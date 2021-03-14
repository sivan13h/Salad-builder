import axios from "axios";

const existingIngs = [
  "apple",
  "banana",
  "orange",
  "apricot",
  "beetroot",
  "carrot",
  "celery",
  "champignon",
  "cucumber",
  "onion",
  "orange",
  "peach",
  "pear",
  "pepper",
  "pineapple",
  "strawberry",
  "tomato",
];

interface ing {
  name: string,
    gramms: number
}

const getFruit = async function (fruit: string) {
  return await axios
    .get<{[x: string]: any}>(`https://api.calorieninjas.com/v1/nutrition?query=${fruit}`, {
      headers: { "X-Api-Key": "jgglQftAE0+iD8JuXpn5tA==6bm5ahKJXO01pJni" },
    })
    .then((res) => {
      if (res.data.items[0]) {
        return {
          name: res.data.items[0].name.toString(),
          calories: parseFloat(res.data.items[0].calories),
          carbs: parseFloat(res.data.items[0].carbohydrates_total_g),
          fat: parseFloat(res.data.items[0].fat_total_g),
          sugar: parseFloat(res.data.items[0].sugar_g),
          protein: parseFloat(res.data.items[0].protein_g),
        };
      } else {
        alert("Sorry, we don't have info about this one yet.. :(");
  
      }
    })
    .catch((err) => {
      console.log(err);  
    });
};

const calcIngNutritions = async (ing: ing) => {
  const ingData = await getFruit(ing.name);
  const grammsAdded = ing.gramms;
  const ingNutritions = {gramms: 0, calories: 0, carbs: 0, fat: 0, sugar: 0, protein: 0};
  if(ingData !== undefined){
    ingNutritions.gramms = grammsAdded;
    ingNutritions.calories = parseFloat(
      ((ingData.calories * grammsAdded) / 100).toFixed(2)
    );
    ingNutritions.carbs = parseFloat(
      ((ingData.carbs * grammsAdded) / 100).toFixed(2)
    );
    ingNutritions.fat = parseFloat(
      ((ingData.fat * grammsAdded) / 100).toFixed(2)
    );
    ingNutritions.sugar = parseFloat(
      ((ingData.sugar * grammsAdded) / 100).toFixed(2)
    );
    ingNutritions.protein = parseFloat(
      ((ingData.protein * grammsAdded) / 100).toFixed(2)
    );
    return ingNutritions;
  }
 
};

const makeSalad = async (ingredients: ing[]) => {
  let salad = {
    gramms: 0,
    calories: 0,
    carbs: 0,
    fat: 0,
    sugar: 0,
    protein: 0,
  };
  for (let ing of ingredients) {
    const ingNutritions = await calcIngNutritions(ing);

  if(ingNutritions !== undefined){
    salad.gramms += ing.gramms;
    salad.calories += ingNutritions.calories;
    salad.carbs += ingNutritions.carbs;
    salad.fat += ingNutritions.fat;
    salad.sugar += ingNutritions.sugar;
    salad.protein += ingNutritions.protein;
  }
   
  }
  let fixedSalad = {
    gramms: salad.gramms,
    calories: parseFloat(salad.calories.toFixed(2)),
    carbs: parseFloat(salad.carbs.toFixed(2)),
    fat: parseFloat(salad.fat.toFixed(2)),
    sugar: parseFloat(salad.sugar.toFixed(2)),
    protein: parseFloat(salad.protein.toFixed(2)),
  };
  return fixedSalad;
};

const checkIfExistLocally = (ing: string) => {
  if (existingIngs.includes(ing.toLowerCase())) {
    return true;
  } else {
    return false;
  }
};
export { getFruit, calcIngNutritions, makeSalad, checkIfExistLocally };
