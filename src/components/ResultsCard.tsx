import React, { useContext } from "react";
import { IngsContext } from "../contexts/Ings.Context";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Box,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles((theme) => ({
  tableBody: {
    padding: 0,
  },
  card: {
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  tableCell: {
    [theme.breakpoints.down("sm")]: {
      padding: "8px",
    },
  },
}));

interface resultCardProps {
  data: {
    name: string;
    calories: number;
    carbs: number;
    fat: number;
    sugar: number;
    protein: number;
  };
  openSideBar: () => void;
  showMenu: () => void;
  screenWidth: number;
}

interface dataKeys {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
  sugar: number;
}

export const ResultsCard: React.FC<resultCardProps> = (props) => {
  const classes = useStyles();
  const { addIngredient } = useContext(IngsContext);
  const dataKeys = Object.keys(props.data) as (keyof dataKeys)[];

  const handleAddClick = () => {
    addIngredient({ name: props.data.name, gramms: 0 });
    if (props.screenWidth >= 768) {
      props.openSideBar();
    } else {
      props.showMenu();
    }
  };
  const { name } = props.data;
  return (
    <Box m="1rem auto" width="60%" maxWidth="500px" className={classes.card}>
      <Card elevation={5}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              src={`${process.env.PUBLIC_URL}/assets/images/${name}.png`}
            />
          }
          title={name}
          titleTypographyProps={{ variant: "h4" }}
          subheader="(Per 100g)"
        />

        <CardContent className={classes.tableBody}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableBody>
                {dataKeys.map((key) => {
                  if (key === "name") {
                    return;
                  } else {
                    return (
                      <TableRow>
                        <TableCell align="center" className={classes.tableCell}>
                          {key}
                        </TableCell>
                        <TableCell align="center" className={classes.tableCell}>
                          {props.data[key]}
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions disableSpacing>
          <Box m="auto">
            <IconButton aria-label="add to salad" onClick={handleAddClick}>
              <AddCircleOutlineIcon style={{ color: green[500] }} />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
