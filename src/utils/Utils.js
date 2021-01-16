
import firebase from "firebase/app";
import db from './firestore.js'

export const geoPointToArrayList = (input) => {
    let output = []
  
    input.forEach(coord => {
      //console.log(coord)
      let newcoord = [coord.x_, coord.N_]
      output.push(newcoord)
    }) 
    return output
}

export function geoJsonToFirestore(featurecollection) {
  // Prepare GeoJSON for sending to Firestore
  let featurecollectioncoordinateArray = []
  featurecollection.features.forEach(function(feature) { // for each feature in featurecollection
    let featureCoordinateArray = []
    feature.geometry.coordinates.forEach(function(nestedCoordArray) { // Nested
      nestedCoordArray.forEach(function(coord) {  // Loops through every coordinate in feature
        featureCoordinateArray.push(new firebase.firestore.GeoPoint(coord[0], coord[1]))
      })
    })
    featurecollectioncoordinateArray.push(featureCoordinateArray)
  })


 let output = {}
 for (var x = 0; x < featurecollection.features.length; x++) {
   output[x] = {
     coordinates: featurecollectioncoordinateArray[x],
     areaID: featurecollection.features[x].id
     };

     db.collection("areas").doc(x.toString()).set(output[x])
     .then(function() {
       console.log("Document successfully written!");
     })
     .catch(function(error) {
       console.error("Error writing document: ", error);
     });
 }
}