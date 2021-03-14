import React, { useState, useContext } from "react";
import { IngsContext } from "../contexts/Ings.Context";
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
  Button,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeSalad } from "../helpers/dataMethods";

import { SaladModal } from "./SaladModal";

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

interface SidebarProps {
  sidebarIsOpen: boolean;
}

interface newSalad {
  gramms: number;
  calories: number;
  carbs: number;
  fat: number;
  sugar: number;
  protein: number;
}

export const SideBar: React.FC<SidebarProps> = (props) => {
  const classes = useStyles();
  const [newSalad, setNewSalad] = useState<newSalad>({} as newSalad);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { ingredients, updateIngredients, removeIngredient } = useContext(
    IngsContext
  );

  const handleGrammsChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const ingToChange = ingredients.find((ing) => ing.name === target.id);
    const newIngredients = ingredients.map((ing) => {
      if (ing === ingToChange) {
        if (!target.value) {
          return {
            ...ing,
            gramms: 0,
          };
        } else {
          return {
            ...ing,
            gramms: parseInt(target.value),
          };
        }
      } else {
        return ing;
      }
    });
    updateIngredients(newIngredients);
  };

  const handleRemove = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    const ingToRemove = ingredients.find(
      (ing) => ing.name === e.currentTarget.id
    )!;
    removeIngredient(ingToRemove);
  };

  const handleMakeSaladClick = async () => {
    let newSalad = await makeSalad(ingredients);
    setNewSalad(newSalad);
    handleModalOpen();
  };

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={props.sidebarIsOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography variant="h5">Your Ingredients:</Typography>
        </div>
        <Divider />
        <List>
          {ingredients.length > 0 &&
            ingredients.map((ing) => (
              <ListItem dense key={ing.name}>
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
                  <IconButton
                    id={ing.name}
                    edge="end"
                    aria-label="delete"
                    onClick={handleRemove}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
        <Box textAlign="center">
          <Button
            onClick={handleMakeSaladClick}
            variant="outlined"
            color="primary"
            endIcon={<SendIcon />}
          >
            Make me a salad
          </Button>
        </Box>
      </Drawer>
      <SaladModal
        isOpen={modalIsOpen}
        saladInfo={newSalad}
        handleClose={handleModalClose}
      />
    </>
  );
};
