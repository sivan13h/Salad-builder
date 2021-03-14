import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Table, TableBody, TableCell, TableRow, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  // closeButton: {
  //   position: "absolute",
  //   right: "1rem",
  //   top: "1rem",
  // },
}));

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  saladInfo: {
    gramms: number;
    calories: number;
    carbs: number;
    fat: number;
    sugar: number;
    protein: number;
  };
}

export const SaladModal: React.FC<ModalProps> = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.isOpen}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.isOpen}>
          <div className={classes.paper}>
            <IconButton onClick={props.handleClose}>
              <CloseIcon />
            </IconButton>
            <h2 id="transition-modal-title">
              Oooo looks Delicious and Healthy!
            </h2>
            <Box m={"auto"} textAlign="center">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                width="100px"
              />
              <p>
                Your salad weighs {props.saladInfo.gramms} Gramms and includes:
              </p>
            </Box>

            <Table id="transition-modal-description" aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell align="center">Calories</TableCell>
                  <TableCell align="center">
                    {props.saladInfo.calories}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Carbs</TableCell>
                  <TableCell align="center">
                    {props.saladInfo.carbs}(g)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Fat</TableCell>
                  <TableCell align="center">{props.saladInfo.fat}(g)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Sugar</TableCell>
                  <TableCell align="center">
                    {props.saladInfo.sugar}(g)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Protein</TableCell>
                  <TableCell align="center">
                    {props.saladInfo.protein}(g)
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
