import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  TextField,
  Drawer,
  List,
  Divider,
  ListItem,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { getFruit } from "../helpers/apiMethods";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "center",
  },
  grammsInput: {
    width: "40%",
    margin: "auto",
  },
}));

export default function SideBar(props) {
  const classes = useStyles();
  const [ingredients, setIngredients] = useState([]);
  const [newSalad, setNewSalad] = useState({});

  useEffect(() => {
    if (props.ingredients.length > 0) {
      if (ingredients.length > 1) {
        const existingIngsNames = ingredients.map((ing) => ing.name);
        console.log(existingIngsNames);
        const ingToAdd = props.ingredients.find(
          (ing) => !existingIngsNames.includes(ing.name)
        );
        setIngredients([...ingredients, ingToAdd]);
      } else {
        setIngredients(props.ingredients);
      }
    }
  }, [props.ingredients]);

  const handleGrammsChange = (e) => {
    console.log(Number.isNaN(e.target.value), e.target.value);
    const ingToChange = ingredients.find((ing) => ing.name === e.target.id);
    const newIngredients = ingredients.map((ing) => {
      if (ing === ingToChange) {
        if (!e.target.value) {
          console.log("not a number");
          return {
            ...ing,
            gramms: 0,
          };
        } else {
          return {
            ...ing,
            gramms: parseInt(e.target.value),
          };
        }
      } else {
        return ing;
      }
    });
    console.log(ingToChange);
    setIngredients(newIngredients);
  };

  const handleMakeSaladClick = async () => {
    let gramms = 0;
    let calories = 0;
    let carbs = 0;
    let fat = 0;
    let sugar = 0;
    for (let ing of ingredients) {
      const ingNutritions = await calcIngNutritions(ing);
      gramms += ing.gramms;
      calories += ingNutritions.calories;
      carbs += ingNutritions.carbs;
      fat += ingNutritions.fat;
      sugar += ingNutritions.sugar;
    }
    setNewSalad({
      gramms: gramms,
      calories: parseFloat(calories.toFixed(2)),
      carbs: parseFloat(carbs.toFixed(2)),
      fat: parseFloat(fat.toFixed(2)),
      sugar: parseFloat(sugar.toFixed(2)),
    });
    console.log(newSalad);
  };

  const calcIngNutritions = async (ing) => {
    const ingData = await getFruit(ing.name);
    const grammsAdded = ing.gramms;
    const ingNutritions = {};
    ingNutritions.gramms = parseFloat(grammsAdded);
    ingNutritions.calories = parseFloat(
      (ingData.fat_total_g * grammsAdded) / 100
    );
    ingNutritions.carbs = parseFloat(
      (ingData.carbohydrates_total_g * grammsAdded) / 100
    );
    ingNutritions.fat = parseFloat((ingData.fat_total_g * grammsAdded) / 100);

    ingNutritions.sugar = parseFloat((ingData.sugar_g * grammsAdded) / 100);
    return ingNutritions;
  };
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Typography variant="h5" alignCenter>
          Your Ingredients:
        </Typography>
      </div>
      <Divider />
      <List>
        {props.ingredients.length > 0 &&
          props.ingredients.map((ing) => (
            <ListItem dense>
              <ListItemAvatar>
                <Avatar
                  alt={`${ing} img`}
                  src={`${process.env.PUBLIC_URL}/assets/images/${ing.name}.png`}
                />
              </ListItemAvatar>
              <TextField
                className={classes.grammsInput}
                id={ing.name}
                type="number"
                size="small"
                defaultValue={0}
                onChange={handleGrammsChange}
              />
              <Box mr={1.5}>
                <Typography>(g)</Typography>
              </Box>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
      <IconButton>
        <DeleteIcon onClick={handleMakeSaladClick} />
      </IconButton>
    </Drawer>
  );
}
