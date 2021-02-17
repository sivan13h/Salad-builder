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
import { getFruit, checkIfExistLocally } from "../helpers/dataMethods";

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

    if (checkIfExistLocally(searchValue)) {
      setIsLoading(true);
      setCardIsShowing(false);
      getFruitData(searchValue);
    } else {
      alert("Unforunately we don't have information about this item");
      setCardIsShowing(false);
    }

    setSearchValue("");
  };

  const getFruitData = async (fruit) => {
    const fruitData = await getFruit(fruit);
    setCardIsShowing(true);
    setIsLoading(false);
    setCurrentFruitData(fruitData);
  };

  return (
    <div>
      <Typography variant="h6">
        Find out the nutritions of your favorite salads !
      </Typography>
      <br></br>
      <Typography variant="h4">First, Search a Fruit or a Vegetable</Typography>
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
        <ResultsCard data={currentFruitData} openSideBar={props.openSideBar} />
      )}
      {isLoading && (
        <Box mt={3}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}
