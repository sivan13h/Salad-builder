import { useState, useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import { IngsContext } from "../contexts/Ings.Context";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Drawer from "@material-ui/core/Drawer";
import {
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  TextField,
  List,
  Divider,
  ListItem,
  Button,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeSalad } from "../helpers/dataMethods";
import { SaladModal } from "./SaladModal";

interface topBarProps {
  menuIsShowing: boolean;
}
interface newSalad {
  gramms: number;
  calories: number;
  carbs: number;
  fat: number;
  sugar: number;
  protein: number;
}

const useStyles = makeStyles((theme) => ({
  navMain: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem",
    },
  },
  menu: {
    position: "absolute",
    right: "1rem",
    color: "white",
  },
  // drawerPaper: {
  //   width: drawerWidth,
  // },
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

export const Topbar: React.FC<topBarProps> = (props) => {
  const classes = useStyles();
  const [newSalad, setNewSalad] = useState<newSalad>({} as newSalad);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const { ingredients, updateIngredients, removeIngredient } = useContext(
    IngsContext
  );
  const handleClose = () => {
    setDrawerIsOpen(false);
  };

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
    setDrawerIsOpen(false);
  };
  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  return (
    <AppBar position="static">
      <Drawer anchor="top" open={drawerIsOpen} onClose={handleClose}>
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
      <Toolbar>
        <Box mr={1.5}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
            width="30px"
          />
        </Box>
        <Typography variant="h6" className={classes.navMain}>
          SaladBuilder
        </Typography>
        {props.menuIsShowing && (
          <Fade in={props.menuIsShowing}>
            <IconButton
              className={classes.menu}
              onClick={() => setDrawerIsOpen(true)}
            >
              <MenuBookIcon />
            </IconButton>
          </Fade>
        )}
      </Toolbar>
    </AppBar>
  );
};
