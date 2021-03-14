import React, { useState, useEffect } from "react";
import { Topbar } from "./components/Topbar";
import { SearchForm } from "./components/SearchForm";
import { SideBar } from "./components/SideBar";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Paper, CssBaseline } from "@material-ui/core";
import "./App.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const drawerWidth = 300;

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
  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [menuIsShowing, setMenuIsShowing] = useState<boolean>(false);

  const showMenu = () => {
    if (!menuIsShowing) {
      setMenuIsShowing(true);
    }
  };

  const openSideBar = () => {
    setSidebarIsOpen(true);
  };

  useEffect(() => {
    const handleResizeWindow = () => setScreenWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Topbar menuIsShowing={menuIsShowing} />
        <Container>
          <Box p={0}>
            <div className={classes.root}>
              <CssBaseline />
              <main
                className={clsx(classes.content, {
                  [classes.contentShift]: sidebarIsOpen,
                })}
              >
                <Paper elevation={3}>
                  <Box p={2}>
                    <SearchForm
                      openSideBar={openSideBar}
                      screenWidth={screenWidth}
                      showMenu={showMenu}
                    />
                  </Box>
                </Paper>
              </main>
              <SideBar sidebarIsOpen={sidebarIsOpen} />
            </div>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
