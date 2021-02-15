import React from "react";
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
}));

export default function ResultsCard(props) {
  const classes = useStyles();
  const handleAddClick = () => {
    props.addIngredient({ name: props.data.name, gramms: 0 });
    props.openSideBar();
  };
  const { name } = props.data;
  return (
    <Box m="1rem auto" width="60%" maxWidth="500px">
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
                {Object.keys(props.data).map((key) => {
                  if (key === "name") {
                    return;
                  } else {
                    return (
                      <TableRow>
                        <TableCell align="center">{key}</TableCell>
                        <TableCell align="center">{props.data[key]}</TableCell>
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
}
