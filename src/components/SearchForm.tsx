import { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ResultsCard } from "../components/ResultsCard";
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

const useStyles = makeStyles((theme) => ({
  searchFormHeader: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },
  searchSubtitle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },
}));

interface searchFormProps {
  openSideBar: () => void;
  showMenu: () => void;
  screenWidth: number;
}

interface fruitData {
  name: string;
  calories: number;
  carbs: number;
  fat: number;
  sugar: number;
  protein: number;
}

export const SearchForm: React.FC<searchFormProps> = (props) => {
  const classes = useStyles();
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const [cardIsShowing, setCardIsShowing] = useState(false);
  const [currentFruitData, setCurrentFruitData] = useState<fruitData>(
    {} as fruitData
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const node = searchRef.current;
    node?.focus();
  }, []);

  const handleChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchValue(target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
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

  const getFruitData = async (fruit: string) => {
    const fruitData = await getFruit(fruit);
    setCardIsShowing(true);
    setIsLoading(false);
    if (fruitData !== undefined) {
      setCurrentFruitData(fruitData);
    }
  };

  return (
    <div>
      <Typography variant="h6" className={classes.searchFormHeader}>
        Find out the nutritions of your favorite salads !
      </Typography>
      <br></br>
      <Typography variant="h4" className={classes.searchSubtitle}>
        First, Search a Fruit or a Vegetable
      </Typography>
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
                inputRef={searchRef}
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
          screenWidth={props.screenWidth}
          openSideBar={props.openSideBar}
          showMenu={props.showMenu}
        />
      )}
      {isLoading && (
        <Box mt={3}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};
