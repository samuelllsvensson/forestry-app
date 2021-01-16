import './App.css';
import React, { useEffect } from 'react';
// import Moment from 'react-moment';

// import firebase from "firebase/app";
//import db from './firestore.js' 

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
//import { metadata} from "./geojsonSource.js"
// import {geoPointToArrayList, getColor} from './Utils.js'

import SummaryComponent from './components/SummaryComponent';
import AgeTableComponent from './components/AgeTableComponent';
import MetadataComponent from './components/MetadataComponent';

import Map from './components/Map';

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: green[800],
    },
    secondary: {
      // This is green.A700 as hex.
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const App = () => {
  const classes = useStyles();
  
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
              <Tabs value={value} onChange={handleChange}>
                <Tab label="Sammanställning" {...a11yProps(0)} />
                <Tab label="Åldersklassfördelning" {...a11yProps(1)} />
                <Tab label="Avdelningsinformation" {...a11yProps(2)} />
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

export default App;
