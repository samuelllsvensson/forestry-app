import React, {useState, useEffect, useRef} from 'react';
import db from '../utils/firestore.js' // <----
import firebase from "firebase/app";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import { Chart } from 'primereact/chart';

const useStyles = makeStyles({
    root: {
      width: '100%',
      textAlign: 'center',
    },
  });
const SummaryComponent = () => {
    const classes = useStyles();
    const [summaryData, setSummaryData] = useState({volDistribution: {}, groundUse: {}});
    const [loading, setLoading] = useState(true);
    const obj = {
        groundUse: {
            forest: 82.8,
            bog: 7.8, 
            farmland: 10.2, 
            misc: 10.2,
            sumArea: 102.3,
            water: 11.1
        },
        volDistribution: {
            pine: 3700,
            fir: 11210,
            leaf: 990,
            totVolume: 11210,
            median: 192,
            qualityMedian: 7.3,
            growth: 5.4
        }
        
    }
    useEffect(() => {
        // db.collection("summary").doc("info").set(obj)
        //     .then(function() {
        //     console.log("Document successfully written!");
        //     })
        //     .catch(function(error) {
        //     console.error("Error writing document: ", error);
        //     });

        db.collection("summary").doc("info").get()
        .then(function(doc) {
            if (doc.exists) {
                //console.log("Document data:", doc.data());
                setSummaryData(doc.data());
                setLoading(false);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }, []);

    const groundOptions = {
        legend: {
            labels: {
                fontColor: '#495057',
                fontSize: 10
            }
        }
    };
    const groundPieChartData = {
        labels: ['Produktiv skogsmark', 'Myr', 'Inägomark', 'Övrig landareal'],
        datasets: [
            {
                data: [
                    summaryData.groundUse.forest,
                    summaryData.groundUse.bog, 
                    summaryData.groundUse.farmland, 
                    summaryData.groundUse.misc
                ],
                backgroundColor: [
                    "#66BB6A", 
                    "#42A5F5",
                    "#FFA726"
                ],
                hoverBackgroundColor: [
                    "#81C784",
                    "#64B5F6",
                    "#FFB74D"
                ]
            }
        ]
    };
    const forestPieChartData = {
        labels: ['Gran', 'Tall', 'Ordinära lövträd'],
        datasets: [
            {
                data: [summaryData.volDistribution.fir, 
                    summaryData.volDistribution.pine, 
                    summaryData.volDistribution.leaf,
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
        ]
    };

    const forestOptions = {
        legend: {
            labels: {
                fontColor: '#495057'
            }
        }
    };
    return (
        <Paper className={classes.root}>
            <Container >
                <Typography variant="h3" gutterBottom>
                    Källshyltan
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Nissafors 1:12
                </Typography>
                <Grid container spacing={6}>
                    <Grid item xs={3} sm={6}>
                        <Typography variant="h5" gutterBottom>
                            Total landareal: {summaryData.groundUse.sumArea} ha
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Myr: {summaryData.groundUse.bog} ha
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Inägomark: {summaryData.groundUse.farmland} ha
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Produktiv skogsmark: {summaryData.groundUse.forest} ha
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Övrig landsareal: {summaryData.groundUse.misc} ha
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            Vatten: {summaryData.groundUse.water} ha
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Typography variant="h6" gutterBottom>
                            Total skogsmark: {summaryData.volDistribution.totVolume} ha
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Tall: {summaryData.volDistribution.pine} ha
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Ordinära lövträd: {summaryData.volDistribution.leaf} ha
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Gran: {summaryData.volDistribution.pine} ha
                        </Typography>

                        <Typography variant="subtitle2" gutterBottom>
                            Medeltal: {summaryData.volDistribution.median} (m3sk/ha)
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Bonitet i medeltal: {summaryData.volDistribution.qualityMedian} (m3sk/ha och år)
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        
                        <Typography variant="h6"  gutterBottom>
                            Markanvändning
                        </Typography>
                        
                        <Chart type="pie" data={groundPieChartData} options={groundOptions} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        
                        <Typography variant="h6" gutterBottom>
                            Skogens volymfördelning
                        </Typography>
                        <Chart type="pie" data={forestPieChartData} options={forestOptions} />
                    
                    </Grid>
                    

                </Grid>

            </Container>
        </Paper>
   
      );
}
export default SummaryComponent;