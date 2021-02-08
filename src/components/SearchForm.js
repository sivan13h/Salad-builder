import { useState } from "react";

import ResultsCard from "../components/ResultsCard";
import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  Input,
  Grid,
  CircularProgress,
  Box,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { getFruit } from "../helpers/apiMethods";

export default function SearchForm(props) {
  const [searchValue, setSearchValue] = useState("");
  const [cardIsShowing, setCardIsShowing] = useState(false);
  const [currentFruitData, setCurrentFruitData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCardIsShowing(false);

    getFruitData(searchValue);
    setSearchValue("");
  };

  const getFruitData = async (fruit) => {
    const fruitData = await getFruit(fruit);
    console.log(fruitData);
    setCardIsShowing(true);
    setIsLoading(false);
    setCurrentFruitData(fruitData);
  };

  return (
    <div>
      <Typography variant="h4">Search a Fruit or a Vegetable</Typography>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <FormControl>
              <InputLabel htmlFor="my-input">Fruit / Vegetable</InputLabel>
              <Input
                required
                id="my-input"
                onChange={handleChange}
                aria-describedby="my-helper-text"
                value={searchValue}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
      {cardIsShowing && currentFruitData && (
        <ResultsCard
          data={currentFruitData}
          openSideBar={props.openSideBar}
          addIngredient={props.addIngredient}
        />
      )}
      {isLoading && (
        <Box mt={3}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}
