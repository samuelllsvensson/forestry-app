
import React, { useEffect, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';

import { UserContext } from "../providers/UserProvider";
import SummaryComponent from './SummaryComponent';
import AgeTableComponent from './AgeTableComponent';
import MetadataComponent from './MetadataComponent';
import Map from './Map';
import {auth} from "../utils/firestore";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[800],
    },
    secondary: {
      main: '#ff9100',
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
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  buttonPadding: {    
    padding: '0px',   
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
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Home = () => {
  const classes = useStyles();
  const user = useContext(UserContext);

  useEffect(() => {

  }, []);

  const [value, setValue] = React.useState(0);
  const [clickedID, setClickedID] = React.useState(1); // the lifted state

  const sendDataToParent = (index) => { // the callback. Use a better name
    console.log(index);
    setClickedID(index);
    setValue(2);

  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Grid container spacing={1}>
          <Grid item sm={5}>
            <Map sendDataToParent={sendDataToParent}/> 
          </Grid>
          <Grid item sm={7}>
            <AppBar position="static">
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Sammanställning" />
                <Tab label="Åldersklassfördelning" />
                <Tab label="Avdelningsinformation" />
                <Tab value={false} label={
              <React.Fragment>
                <Button 
                    className={classes.buttonPadding} 
                    startIcon={<PersonIcon />} 
                    onClick={() => { auth.signOut() }}>
                  Logga ut
                </Button>
                <span style={{ fontSize: "0.5vw" }}>{user.displayName}</span>
              </React.Fragment>
            } />

              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
            <Paper><SummaryComponent /></Paper>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <AgeTableComponent ageData={"test"}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <MetadataComponent dataParentToChild = {clickedID}/>
            </TabPanel>
              
          </Grid>
        </Grid>    
      </ThemeProvider>
    </div>
  );
}

export default Home;
