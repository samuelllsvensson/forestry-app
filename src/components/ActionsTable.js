import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { firestore } from "../utils/firestore.js";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const ActionsTable = ({ actionData, areaId }) => {
  const classes = useStyles();

  const [columns, setColumns] = useState([
    { title: "Åtgärd", field: "type" },
    {
      title: "När",
      field: "time",
      initialEditValue: "",
    },
    { title: "Uttag (%)", field: "amount", type: "numeric" },
    { title: "Volym (m3sk)", field: "volume", type: "numeric" },
  ]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const [data, setData] = useState({});

  useEffect(() => {
    setData(actionData);
    setLoading(false);
    if (areaId === "100") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [actionData]);

  return (
    <Paper className={classes.root}>
      {loading ? (
        <LinearProgress color="secondary" />
      ) : isVisible ? (
        <div
          style={{
            padding: 30,
            width: "30%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          elevation={1}
        >
          Inga åtgärder är tillgängliga
        </div>
      ) : (
        <MaterialTable
          title="Åtgärder"
          columns={columns}
          data={data}
          options={{
            search: false,
            actionsColumnIndex: 4,
            paging: false,
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setData([...data, newData]);
                  resolve();
                  const databaseRef = firestore
                    .collection("data")
                    .doc(areaId)
                    .collection("actions");

                  databaseRef
                    .add(newData)
                    .then(function (docRef) {
                      console.log("Document successfully written! ", docRef.id);
                    })
                    .catch(function (error) {
                      console.error("Error writing document: ", error);
                    });
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const databaseRef = firestore
                    .collection("data")
                    .doc(areaId)
                    .collection("actions");
                  resolve();

                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  databaseRef
                    .get()
                    .then(function (querySnapshot) {
                      querySnapshot.forEach(function (doc) {
                        // console.log(doc.id);

                        if (doc.data().tableData.id === index) {
                          console.log("Found doc!", doc.id);
                          dataDelete.splice(index, 1);
                          setData([...dataDelete]);

                          databaseRef
                            .doc(doc.id)
                            .delete()
                            .then(function () {
                              console.log("Document successfully deleted!");
                            })
                            .catch(function (error) {
                              console.error("Error removing document: ", error);
                            });
                        }
                      });
                    })
                    .catch(function (error) {
                      console.log("Error getting document:", error);
                    });
                }, 1000);
              }),
          }}
        />
      )}
    </Paper>
  );
};

export default ActionsTable;
