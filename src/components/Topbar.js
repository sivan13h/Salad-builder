import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default function Topbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box mr={1.5}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
            width="30px"
          />
        </Box>
        <Typography variant="h6">SaladBuilder</Typography>
      </Toolbar>
    </AppBar>
  );
}
