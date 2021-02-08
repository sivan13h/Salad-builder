import { React, useState } from "react";
import Topbar from "./components/Topbar";
import SearchForm from "./components/SearchForm";
import SideBar from "./components/SideBar";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Paper, CssBaseline } from "@material-ui/core";
import "./App.css";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));
export default function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const openSideBar = () => {
    setOpen(true);
  };

  const addIngredient = (ingredient) => {
    if (ingredients.some((ing) => ing.name === ingredient.name)) {
      alert("this ingredient already exist in you salad!");
    } else {
      setIngredients([...ingredients, ingredient]);
    }
  };

  return (
    <div className="App">
      <Topbar />
      <Container>
        <Box p={3}>
          <div className={classes.root}>
            <CssBaseline />
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              <Paper elevation={3}>
                <Box p={3}>
                  <SearchForm
                    openSideBar={openSideBar}
                    addIngredient={addIngredient}
                  />
                </Box>
              </Paper>
            </main>
            <SideBar ingredients={ingredients} open={open} />
          </div>
        </Box>
      </Container>
    </div>
  );
}
