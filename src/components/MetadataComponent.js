import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
// Select
import InputLabel from "@material-ui/core/InputLabel";
import LinearProgress from "@material-ui/core/LinearProgress";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import ActionsTable from "../components/ActionsTable.js";
import EditableTextArea from "../components/EditableTextArea.js";
import EditableTextField from "../components/EditableTextField.js";
// import { metadata, actions } from "../geojsonSource.js";
import TreeDistCharts from "../components/TreeDistCharts.js";
import ClassPopoverInfo from "../utils/ClassPopoverInfo.js";
import { firestore } from "../utils/firestore.js";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    flexGrow: 1,
  },
  cardRoot: {
    width: "100%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  title: {
    fontSize: 14,
    textAlign: "left",
  },
  classTitle: {
    textAlign: "left",
  },
}));

const MetadataComponent = ({ dataParentToChild }) => {
  const classes = useStyles();
  const [metaData, setMetaData] = useState({
    general: {},
    distribution: {},
    notes: "",
    description: {},
  });
  const [actionData, setActionData] = useState([]);
  const [loading, setLoading] = useState(true);

  // MÅLKLASS
  const [goalClass, setGoalClass] = useState("");

  // HUGGNINGSKLASS
  const [chopClassVal, setChopClassVal] = useState("");

  useEffect(() => {
    if (dataParentToChild) {
      // firestore
      //   .collection("data")
      //   .doc(dataParentToChild.toString())
      //   .set(metadata)
      //   .then(function () {
      //     console.log("Document successfully written!");
      //   })
      //   .catch(function (error) {
      //     console.error("Error writing document: ", error);
      //   });
      // console.log(actions);
      // Add default subcollection:
      // firestore
      //   .collection("data")
      //   .doc(dataParentToChild.toString())
      //   .collection("actions")
      //   .add(actions)
      //   .then(function () {
      //     console.log("Document successfully written! act");
      //   })
      //   .catch(function (error) {
      //     console.error("Error writing document: ", error);
      //   });
    }
    firestore
      .collection("data")
      .doc(dataParentToChild.toString())
      .get()
      .then(function (doc) {
        if (doc.exists) {
          let data = doc.data();
          setMetaData(data);
          setGoalClass(data.general.class);
          setChopClassVal(data.description.type);
          setLoading(false);
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

    firestore
      .collection("data")
      .doc(dataParentToChild.toString())
      .collection("actions")
      .get()
      .then(function (querySnapshot) {
        let tempArray = [];
        querySnapshot.forEach(function (doc) {
          let data = doc.data();
          data.id = doc.id;
          tempArray.push(data);
          setLoading(false);
        });
        setActionData(tempArray);
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, [dataParentToChild]);

  metaData["actions"] = actionData;

  const editableData = (value, path) => {
    if (path) {
      let parentObject = path.split(".")[0];
      let childObject = path.split(".")[1];
      let dbData = {};
      let child = {};
      let numberValue = -1;
      let test = isNaN(parseInt(value));

      if (!childObject) {
        // For notes which only contains parentObject
        dbData[parentObject] = value;
      } else {
        child[childObject] = test ? value : numberValue;
        dbData[parentObject] = child;
      }

      if (!test) {
        numberValue = parseInt(value);
      }

      firestore
        .collection("data")
        .doc(dataParentToChild.toString())
        .set(dbData, { merge: true })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    }
  };

  const handleSelectChange = (event) => {
    console.log("Select val: " + event.target.value);
    firestore
      .collection("data")
      .doc(dataParentToChild.toString())
      .set({ description: { type: event.target.value } }, { merge: true })
      .then(function () {
        setLoading(false);
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
    setGoalClass(event.target.value);
  };

  const handleSelectClassChange = (event) => {
    console.log("Select val: " + event.target.value);
    firestore
      .collection("data")
      .doc(dataParentToChild.toString())
      .set({ general: { class: event.target.value } }, { merge: true })
      .then(function () {
        setLoading(false);
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
    setChopClassVal(event.target.value);
  };

  return (
    <Paper className={classes.root}>
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Paper className={classes.root}>
          <Container maxWidth="md">
            <Grid container spacing={3} justify="center">
              <Typography variant="h3">{metaData.general.name}</Typography>
              <Grid item sm={12}>
                <Typography variant="h5">
                  {metaData.general.area} hektar
                </Typography>
              </Grid>
              <Grid item sm={4}>
                <Card className={classes.cardRoot}>
                  <CardContent className={classes.classDesc}>
                    {/* Production goal */}
                    <EditableTextField
                      editableData={editableData}
                      name={"general.goal"}
                      value={metaData.general.goal}
                      label="Produktionsmål"
                    />
                    <EditableTextField
                      editableData={editableData}
                      name={"description.age"}
                      value={metaData.description.age}
                      label="Snittålder"
                    />
                    <EditableTextField
                      editableData={editableData}
                      name={"description.index"}
                      value={metaData.description.index}
                      label="Ståndortsindex"
                    />
                    <EditableTextField
                      editableData={editableData}
                      name={"description.volume"}
                      value={metaData.description.volume}
                      label="Volym (m3sk)"
                    />
                    <EditableTextField
                      editableData={editableData}
                      name={"description.totVolume"}
                      value={metaData.description.totVolume}
                      label="Total volym (m3sk/bestånd)"
                    />
                  </CardContent>
                </Card>
              </Grid>
              {/* Description */}

              <Grid item sm={3}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <FormControl margin="none" className={classes.formControl}>
                    <InputLabel
                      shrink
                      id="demo-simple-select-placeholder-label-label"
                    >
                      Målklass
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-placeholder-label-label"
                      id="demo-simple-select-placeholder-label"
                      value={goalClass ? goalClass : ""}
                      displayEmpty
                      onChange={handleSelectChange}
                      className={classes.selectEmpty}
                    >
                      {/* Många skogsbruksplaner använder en målklassning där varje avdelning klassas efter hur de ska tillfredställa de båda målen produktion och miljö. Målklassning är också ett krav om skogsbruket är certifierat. */}
                      <MenuItem value={"PG"}>PG</MenuItem>
                      {/* PG – Produktion med generell miljöhänsyn. Den vanligaste målklassen, här bedrivs skogsbruk för virkesproduktion, men naturligtvis gäller generell hänsyn vid varje åtgärd. */}
                      <MenuItem value={"PFK"}>PF (K)</MenuItem>
                      {/* PF (K) – Produktion med förstärkt miljöhänsyn (kombinerat mål). Här brukas skogen också för virkesproduktion men det finns ett miljöintresse utöver den generella hänsynen. */}
                      <MenuItem value={"NO"}>NO</MenuItem>
                      {/* NO – Naturvård, orört. Här kan det handla om till exempel gammal skog med mycket död ved eller en sumpskog. Skogen lämnas för fri utveckling. */}
                      <MenuItem value={"NS"}>NS</MenuItem>
                      {/* NS – Naturvård med skötsel. I NS-beståndet väger miljövärdena tyngst men de kan behöva bevaras eller förstärkas med naturvårdande skötsel. Exempel kan vara att frihugga gamla ekar eller att ta bort gran som håller på att ta över i en lövskog. */}
                    </Select>
                  </FormControl>
                  <ClassPopoverInfo popType={1} />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <FormControl className={classes.formControl}>
                    <InputLabel
                      shrink
                      id="demo-simple-select-placeholder-label-label"
                    >
                      Huggningsklass
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-placeholder-label-label"
                      id="demo-simple-select-placeholder-label"
                      value={chopClassVal ? chopClassVal : ""}
                      displayEmpty
                      onChange={handleSelectClassChange}
                      className={classes.selectEmpty}
                    >
                      <MenuItem value={"K1"}>K1</MenuItem>
                      <MenuItem value={"K2"}>K2</MenuItem>
                      <MenuItem value={"R1"}>R1</MenuItem>
                      <MenuItem value={"R2"}>R2</MenuItem>
                      <MenuItem value={"G1"}>G1</MenuItem>
                      <MenuItem value={"G2"}>G2</MenuItem>
                      <MenuItem value={"S1"}>S1</MenuItem>
                      <MenuItem value={"S2"}>S2</MenuItem>
                      <MenuItem value={"S3"}>S3</MenuItem>
                    </Select>
                  </FormControl>
                  <ClassPopoverInfo popType={2} />
                </div>
              </Grid>
              <TreeDistCharts data={metaData.distribution} />

              {/* Notes */}
              <Grid item sm={10}>
                <EditableTextArea
                  editableData={editableData}
                  name={"notes"}
                  value={metaData.notes}
                />
              </Grid>
              {/* Actions */}
              <Grid item sm={10}>
                <ActionsTable
                  actionData={metaData.actions}
                  areaId={dataParentToChild.toString()}
                />
              </Grid>
            </Grid>
          </Container>
        </Paper>
      )}
    </Paper>
  );
};
export default MetadataComponent;
