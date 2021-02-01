import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import { Chart } from "primereact/chart";
import React, { useEffect, useState } from "react";
import { firestore } from "../utils/firestore.js";
import { tableText } from "../utils/tooltips.js";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  table: {
    marginLeft: "auto",
    marginRight: "auto",
    minWidth: 650,
  },
  selectTableCell: {
    width: 20,
    height: 0,
    padding: 0,
  },
  tableCell: {
    width: 30,
    height: 0,
    padding: 0,
  },
  input: {
    width: 40,
    height: 30,
    flex: 1,
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
  },
}));

const createData = (
  ageRange,
  area,
  percent,
  hecVolume,
  totVolume,
  quality,
  growthRate,
  pine,
  fir,
  leaf
) => ({
  id: ageRange.replace(" ", "_"),
  ageRange,
  area,
  percent,
  hecVolume,
  totVolume,
  quality,
  growthRate,
  pine,
  fir,
  leaf,
  isEditMode: false,
});

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="center" className={classes.tableCell}>
      {isEditMode ? (
        <TextField
          value={row[name]}
          name={name}
          onChange={(e) => onChange(e, row)}
          className={classes.input}
          size="small"
          type="number"
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

function AgeTable() {
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const [previous, setPrevious] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let temp = [];
    firestore
      .collection("ages")
      .orderBy("orderId")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setLoading(false);
          temp.push(
            createData(
              doc.data().ageRange,
              doc.data().area,
              doc.data().percent,
              doc.data().hecVolume,
              doc.data().totVolume,
              doc.data().quality,
              doc.data().growthRate,
              doc.data().pine,
              doc.data().fir,
              doc.data().leaf
            )
          );
        });

        let newArray = sumRows(temp);
        console.log(newArray);
        setRows((state) => {
          return newArray.map((row) => {
            return row;
          });
        });
      });
  }, []);

  const onToggleEditMode = (id) => {
    setRows((state) => {
      return rows.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onSaveEditMode = (id) => {
    const found = rows.find((element) => element.id === id);
    firestore
      .collection("ages")
      .doc(found.ageRange)
      .update(found)
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
    onToggleEditMode(id);
    console.log("saved to database");
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }

    let value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: parseFloat(value) };
      }
      return row;
    });
    setRows(newRows);
  };

  const onRevert = (id) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

  const calcMedian = (arr) => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };
  const sumRows = (rows) => {
    //
    let rowsCopy = rows;

    let area = rows.reduce((r, d) => parseInt(r) + d.area, 0);
    let percent = rows.reduce((r, d) => r + d.percent, 0);

    var hecVolArray = [];
    for (var i = 0; i < rows.length; i++) {
      hecVolArray.push(rows[i].hecVolume);
    }
    let hecVolumeMedian = calcMedian(hecVolArray);
    let totVolume = rows.reduce((r, d) => r + d.totVolume, 0);

    var qualityArray = [];
    for (var j = 0; j < rows.length; j++) {
      qualityArray.push(rows[j].quality);
    }
    let qualityMedian = calcMedian(qualityArray);

    var growthRateArray = [];
    for (var k = 0; k < rows.length; k++) {
      growthRateArray.push(rows[k].growthRate);
    }
    let growthRateMedian = calcMedian(growthRateArray);

    // hardcoded percents for now
    let pine = 23;
    let fir = 71;
    let leaf = 6;
    let summedRow = createData(
      "Summa",
      area,
      percent,
      hecVolumeMedian.toFixed(1),
      totVolume,
      qualityMedian.toFixed(1),
      growthRateMedian.toFixed(1),
      pine,
      fir,
      leaf
    );
    rowsCopy.push(summedRow); // Append sum row
    return rowsCopy;
  };

  let ageLabels = rows.map((a) => a.ageRange);
  ageLabels.pop();
  let areaData = rows.map((a) => a.area);
  areaData.pop();

  const basicData = {
    labels: ageLabels,
    datasets: [
      {
        label: "Åldersklassfördelning idag",
        backgroundColor: "#42A5F5",
        data: areaData,
      },
    ],
  };
  let basicOptions = {
    legend: {
      labels: {
        fontColor: "#495057",
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: "#495057",
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: "#495057",
          },
        },
      ],
    },
  };

  return (
    <Paper className={classes.root}>
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <div>
          <Table
            className={classes.table}
            size="small"
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={1}>
                  <Tooltip title={tableText.areal} arrow>
                    <span>Åldersklass</span>
                  </Tooltip>
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  <Tooltip title={tableText.areal} arrow>
                    <span>Areal</span>
                  </Tooltip>
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  <Tooltip title={tableText.storage} arrow>
                    <span>Virkesförråd</span>
                  </Tooltip>
                </TableCell>
                <TableCell align="center" colSpan={1}>
                  <Tooltip title={tableText.quality} arrow>
                    <span>Bonitet</span>
                  </Tooltip>
                </TableCell>
                <TableCell align="center" colSpan={1}>
                  <Tooltip title={tableText.growthRate} arrow>
                    <span>Tillväxt</span>
                  </Tooltip>
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  <Tooltip title={tableText.distribution} arrow>
                    <span>Trädslagsfördelning&nbsp;(%)</span>
                  </Tooltip>
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" />
                <TableCell align="center">ha</TableCell>
                <TableCell align="center">%</TableCell>
                <TableCell align="center">m3sk/ha</TableCell>
                <TableCell align="center">m3sktot</TableCell>
                <TableCell align="center" colSpan={2}>
                  m3sk/ha och år
                </TableCell>
                <TableCell align="center">Tall</TableCell>
                <TableCell align="center">Gran</TableCell>
                <TableCell align="center">Löv</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row" align="center">
                    {row.ageRange}
                  </TableCell>
                  <CustomTableCell {...{ row, name: "area", onChange }} />
                  <CustomTableCell {...{ row, name: "percent", onChange }} />
                  <CustomTableCell {...{ row, name: "hecVolume", onChange }} />
                  <CustomTableCell {...{ row, name: "totVolume", onChange }} />
                  <CustomTableCell {...{ row, name: "quality", onChange }} />
                  <CustomTableCell {...{ row, name: "growthRate", onChange }} />
                  <CustomTableCell {...{ row, name: "pine", onChange }} />
                  <CustomTableCell {...{ row, name: "fir", onChange }} />
                  <CustomTableCell {...{ row, name: "leaf", onChange }} />
                  <TableCell className={classes.selectTableCell}>
                    {row.isEditMode ? (
                      <>
                        <IconButton
                          aria-label="done"
                          size="small"
                          onClick={() => onSaveEditMode(row.id)}
                        >
                          <DoneIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="revert"
                          size="small"
                          onClick={() => onRevert(row.id)}
                        >
                          <RevertIcon fontSize="small" />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => onToggleEditMode(row.id)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Chart type="bar" data={basicData} options={basicOptions} />
        </div>
      )}
    </Paper>
  );
}

export default AgeTable;
