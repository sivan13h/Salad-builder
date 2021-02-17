import { React, useState } from "react";
import Topbar from "./components/Topbar";
import SearchForm from "./components/SearchForm";
import SideBar from "./components/SideBar";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Paper, CssBaseline } from "@material-ui/core";
import "./App.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Spartan",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

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

  const openSideBar = () => {
    setOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Topbar />
        <Container>
          <Box p={0}>
            <div className={classes.root}>
              <CssBaseline />
              <main
                className={clsx(classes.content, {
                  [classes.contentShift]: open,
                })}
              >
                <Paper elevation={3}>
                  <Box p={2}>
                    <SearchForm openSideBar={openSideBar} />
                  </Box>
                </Paper>
              </main>
              <SideBar open={open} />
            </div>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
