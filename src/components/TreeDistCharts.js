import { Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Chart } from "primereact/chart";
import React from "react";
import { pieOptions, polarOptions } from "../utils/chartOptions.js";

const TreeDistCharts = ({ data }) => {
  // Polar area chart (Diameter)
  const chartData = {
    datasets: [
      {
        data: [data.diamFir, data.diamLeaf, data.diamPine],
        backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
      },
    ],
    labels: ["Gran", "Löv", "Tall"],
  };
  const pieChartData = {
    datasets: [
      {
        data: [data.distFir, data.distLeaf, data.distPine],
        backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
        hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
      },
    ],
    labels: ["Gran", "Löv", "Tall"],
  };
  return (
    <Grid item sm={4}>
      <Typography variant="subtitle1" gutterBottom>
        Snittdiameter (cm)
      </Typography>
      <Chart type="polarArea" data={chartData} options={polarOptions} />
      <Divider />
      <Typography variant="subtitle1" gutterBottom>
        Trädslagsfördelning (%)
      </Typography>
      <Chart type="pie" data={pieChartData} options={pieOptions} />
    </Grid>
  );
};

export default TreeDistCharts;
