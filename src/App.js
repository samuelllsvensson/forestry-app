import './App.css';
import React, { useEffect, useState } from 'react';
// import Moment from 'react-moment';

// import firebase from "firebase/app";
//import db from './firestore.js' 

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

//import { metadata} from "./geojsonSource.js"
// import {geoPointToArrayList, getColor} from './Utils.js'

import MetadataComponent from './components/MetadataComponent';
//import AgeTableComponent from './components/AgeTableComponent';
import Map from './components/Map';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const App = () => {
  const classes = useStyles();
  //const [map, setMap] = useState(null);
  //const mapContainer = useRef(null);
  const [metaData, setMetaData] = useState({});

  // Write to metadata collection 
  // db.collection("data").doc("0").set(data)
  // .then(function() {
  //     console.log("Document successfully written!");
  // })
  // .catch(function(error) {
  //     console.error("Error writing document: ", error);
  // });

  useEffect(() => {

  }, []);


  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xl={7}>
          <Map/> 
        </Grid>
        <Grid item xl={5}>
          <Paper className={classes.paper}><MetadataComponent dataParentToChild = {metaData}/></Paper> 
          {/* <Paper className={classes.paper}><AgeTableComponent ageData={"test"}/></Paper>  */}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
