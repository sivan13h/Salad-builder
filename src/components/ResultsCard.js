import React from "react";
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

export default function ResultsCard(props) {
  const handleAddClick = () => {
    props.addIngredient({ name: props.data.name, gramms: 0 });
    props.openSideBar();
  };
  return (
    <Box m="1rem auto" width="60%" maxWidth="500px">
      <Card elevation={5}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              src={`${process.env.PUBLIC_URL}/assets/images/${props.data.name}.png`}
            />
          }
          title={props.data.name}
          subheader="(Per 100g)"
        />

        <CardContent>
          <TableContainer>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell align="center">Calories</TableCell>
                  <TableCell align="center">{props.data.calories}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Carbs</TableCell>
                  <TableCell align="center">
                    {props.data.carbohydrates_total_g}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Fat</TableCell>
                  <TableCell align="center">{props.data.fat_total_g}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Sugar</TableCell>
                  <TableCell align="center">{props.data.sugar_g}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="center">Protein</TableCell>
                  <TableCell align="center">{props.data.protein_g}</TableCell>
                </TableRow>
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
