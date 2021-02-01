import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { Chart } from "primereact/chart";
import React, { useEffect, useState } from "react";
import { forestOptions, groundOptions } from "../utils/chartOptions.js";
import { firestore } from "../utils/firestore.js";
import { summaryText } from "../utils/tooltips.js";

const useStyles = makeStyles({
  root: {
    width: "100%",
    textAlign: "center",
  },
});
const SummaryComponent = () => {
  const classes = useStyles();
  const [summaryData, setSummaryData] = useState({
    volDistribution: {},
    groundUse: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firestore
      .collection("summary")
      .doc("info")
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setSummaryData(doc.data());
          setLoading(false);
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, []);

  const groundPieChartData = {
    labels: ["Produktiv skogsmark", "Myr", "Inägomark", "Övrig landareal"],
    datasets: [
      {
        data: [
          summaryData.groundUse.forest,
          summaryData.groundUse.bog,
          summaryData.groundUse.farmland,
          summaryData.groundUse.misc,
        ],
        backgroundColor: ["#66BB6A", "#42A5F5", "#FFA726"],
        hoverBackgroundColor: ["#81C784", "#64B5F6", "#FFB74D"],
      },
    ],
  };
  const forestPieChartData = {
    labels: ["Gran", "Tall", "Ordinära lövträd"],
    datasets: [
      {
        data: [
          summaryData.volDistribution.fir,
          summaryData.volDistribution.pine,
          summaryData.volDistribution.leaf,
        ],
        backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
        hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
      },
    ],
  };

  return (
    <Paper className={classes.root}>
      <Container>
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
              Totalt virkesförråd: {summaryData.volDistribution.totVolume} m3sk
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Tall: {summaryData.volDistribution.pine} m3sk
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Ordinära lövträd: {summaryData.volDistribution.leaf} m3sk
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Gran: {summaryData.volDistribution.fir} m3sk
            </Typography>

            <Typography variant="subtitle2" gutterBottom>
              <Tooltip title={summaryText.medeltal} arrow>
                <span>
                  Medeltal: {summaryData.volDistribution.median} (m3sk/ha){" "}
                </span>
              </Tooltip>
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              <Tooltip title={summaryText.qualityMedel} arrow>
                <span>
                  Bonitet i medeltal:{" "}
                  {summaryData.volDistribution.qualityMedian} (m3sk/ha och år)
                </span>
              </Tooltip>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Markanvändning
            </Typography>

            <Chart
              type="pie"
              data={groundPieChartData}
              options={groundOptions}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Skogens volymfördelning
            </Typography>
            <Chart
              type="pie"
              data={forestPieChartData}
              options={forestOptions}
            />
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};
export default SummaryComponent;
