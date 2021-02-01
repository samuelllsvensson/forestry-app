import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import { green } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { ThemeProvider } from "@material-ui/styles";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../utils/firestore";
import AgeTable from "./AgeTable";
import Map from "./Map";
import MetadataComponent from "./MetadataComponent";
import SummaryComponent from "./SummaryComponent";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[800],
    },
    secondary: {
      main: "#ff9100",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  buttonPadding: {
    padding: "0px",
  },
  rightAlign: {
    marginLeft: "auto",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const Home = () => {
  const classes = useStyles();
  const user = useContext(UserContext);

  useEffect(() => {}, []);

  const [value, setValue] = React.useState(0);
  const [clickedID, setClickedID] = React.useState(1); // the lifted state

  const sendDataToParent = (index) => {
    setClickedID(index);
    setValue(2);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Grid container>
          <Grid item sm={5}>
            <Map sendDataToParent={sendDataToParent} />
          </Grid>
          <Grid item sm={7}>
            <AppBar position="static">
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Sammanställning" />
                <Tab label="Åldersklassfördelning" />
                <Tab label="Beståndsinformation" />
                <Tab
                  value={false}
                  className={classes.rightAlign}
                  onClick={() => {
                    auth.signOut();
                  }}
                  label={
                    <React.Fragment>
                      Logga ut
                      <br />
                      <span style={{ fontSize: "0.5vw" }}>
                        {user.displayName}
                      </span>
                    </React.Fragment>
                  }
                />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <Paper>
                <SummaryComponent />
              </Paper>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <AgeTable />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <MetadataComponent dataParentToChild={clickedID} />
            </TabPanel>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default Home;
