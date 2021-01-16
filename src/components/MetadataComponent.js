import React, {useState, useEffect, useRef} from 'react';
import ContentEditable from 'react-contenteditable'
import db from '../utils/firestore.js' // <----
import firebase from "firebase/app";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from '@material-ui/core/Container';
import { Chart } from 'primereact/chart';
import Grid from '@material-ui/core/Grid';
import {metadata} from "../geojsonSource.js"

const useStyles = makeStyles({
  root: {
    width: '100%',
    textAlign: 'center',
  },
});
const MetadataComponent = ({dataParentToChild}) => {
    const classes = useStyles();
    const [metaData, setMetaData] = useState({actions: {}, general: {}, distribution: {}, notes: "", description: {}});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Read data from firestore
        // console.log(dataParentToChild.toString())
        if (dataParentToChild) {
        
            db.collection("data").doc(dataParentToChild.toString()).set(metadata)
            .then(function() {
            console.log("Document successfully written!");
            })
            .catch(function(error) {
            console.error("Error writing document: ", error);
            });
        }
        db.collection("data").doc(dataParentToChild.toString()).get()
        .then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setMetaData(doc.data());
                setLoading(false);
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }, [dataParentToChild]);
    //if(!metaData) { return null }
    //if(loading) { return null } 
    // Polar area chart (Diameter)
    const chartData = {
        datasets: [{
            data: [
                // 5,6 ,7
                metaData.distribution.diamFir,
                metaData.distribution.diamLeaf,
                metaData.distribution.diamPine
            ],
            backgroundColor: [
                "#42A5F5",
                "#66BB6A",
                "#FFA726"
            ],
            label: 'Genomsnittsdiameter träd (cm)'
        }],
        labels: [
            "Gran",
            "Löv",
            "Tall"
        ]
    };
    const pieChartData = {
        datasets: [
            {
                data: [
                    metaData.distribution.distFir, 
                    metaData.distribution.distLeaf, 
                    metaData.distribution.distPine
                ],
                backgroundColor: [
                    "#42A5F5",
                    "#66BB6A",
                    "#FFA726"
                ],
                hoverBackgroundColor: [
                    "#64B5F6",
                    "#81C784",
                    "#FFB74D"
                ]
            }
        ],    
        labels: [
            "Gran",
            "Löv",
            "Tall"
        ],
    };
    const polarOptions = {
        legend: {
            labels: {
                fontColor: '#495057'
            }
        },
        scale: {
            gridLines: {
                color: '#ebedef'
            }
        }
    };
    
    const pieOptions = {
        legend: {
            labels: {
                fontColor: '#495057'
            }
        }
    };
    return (
        <Paper className={classes.root}>
    {loading ? (
    <LinearProgress color="secondary" />
  ) : (
        <Paper className={classes.root}>
            <Container maxWidth="sm">
                <Typography variant="h3" component="h2" gutterBottom>
                    {metaData.general.name}
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                    {metaData.general.area} hektar
                </Typography>
                <Grid container spacing={3}>

                    <Grid item xs={12} sm={6}>
                        <Chart type="polarArea" data={chartData} options={polarOptions} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Chart type="pie" data={pieChartData} options={pieOptions} />
                    </Grid>

                </Grid>

            </Container>
        </Paper>
   
      )}
    </Paper>

    );
}
export default MetadataComponent;