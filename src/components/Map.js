import React, { useEffect, useState } from 'react';

import ReactMapGL, { Source, Layer} from 'react-map-gl';

//import firebase from "firebase/app";

import {dataLayer} from './map-style.js';
import {geoPointToArrayList, getColor, geoJsonToFirestore} from '../Utils.js'
import {featurecollection} from "../geojsonSource.js"
import db from '../firestore.js'

const Map = () => {
  const [data, setData] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 57.430398,
    longitude: 13.708269,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });

  useEffect(() => {
    geoJsonToFirestore(featurecollection)
    let temp = {
      "type":"FeatureCollection",
      "features":[]
    }
    // Read data from firestore for drawing map
    db.collection("areas").get().then(async function(querySnapshot) {
      await Promise.all(querySnapshot.docs.map(async (doc) => {
          //console.log(doc.id, " => ", doc.data());
          let newCoords = geoPointToArrayList(doc.data().coordinates)
          temp.features.push({ "type": "Feature","geometry": {"type": "Polygon","coordinates": [newCoords]},"properties": {"color":  parseInt(doc.data().areaID)}, "id": doc.data().areaID});
        
        }));
        setData(temp);
      });
    
  }, []); 
  

  const _onHover = event => {
    const {
      features,
      srcEvent: {offsetX, offsetY}
    } = event;
    const hovFeature = features && features.find(f => f.layer.id === 'data');
    if(hovFeature){
      setHoveredFeature({hovFeature, x: offsetX, y: offsetY});
    }
  };

  const _onClick = event => {
    const feature = event.features && event.features[0].id;

    console.log(feature)
    //setState({popupInfo: city});
  };

  const _renderTooltip = () => {
    return (
      hoveredFeature && (
        <div className="tooltip" style={{left: hoveredFeature.x + 10, top: hoveredFeature.y}}>
          <div>Bestånd {hoveredFeature.hovFeature.id}</div>
          {/* TODO: Total area + trädslagsfördelning?  */}
        </div>
      )
    );
  }
  const _getCursor = ({isHovering, isDragging}) => {
    return isHovering ? 'pointer' : 'default';
  };
  return (

      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        width="50vw"
        height="calc(100vh - 40px)"
        mapStyle="mapbox://styles/samochips/ckjlyko950ecl19oa2kmadjxl"
        getCursor={_getCursor}
        onHover={_onHover}
        onClick={_onClick}
        attributionControl={false}
        antialias={true}
      >
        <Source type="geojson" data={data}>
          <Layer {...dataLayer} />
        </Source>
         {_renderTooltip()}
      </ReactMapGL>
  );
};
export default Map; 
