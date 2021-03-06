import * as turf from "@turf/turf";
import mapboxgl from "mapbox-gl/dist/mapbox-gl";
import MapboxWorker from "mapbox-gl/dist/mapbox-gl-csp-worker";
import React, { useEffect, useState } from "react";
import ReactMapGL, { Layer, Source } from "react-map-gl";
// import {featurecollection} from "../geojsonSource.js"
//import {featurecollection} from "../data/areas.js"
import { lineCollection } from "../assets/border.js";
import { houseCollection } from "../assets/houses.js";
import { firestore } from "../utils/firestore.js";
import { dataLayer } from "../utils/map-style.js";
import { geoPointToArrayList } from "../utils/Utils.js";

const Map = ({ sendDataToParent }) => {
  mapboxgl.workerClass = MapboxWorker; // Need this until https://github.com/mapbox/mapbox-gl-js-docs/pull/461 is approved
  // Issue: https://github.com/visgl/react-map-gl/issues/1266

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
    //geoJsonToFirestore(featurecollection)
    let temp = {
      type: "FeatureCollection",
      features: [],
    };

    // Read data from firestore for drawing map
    firestore
      .collection("areas")
      .get()
      .then(async function (querySnapshot) {
        await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            //console.log(doc.id, " => ", doc.data());
            let newCoords = geoPointToArrayList(doc.data().coordinates);
            var polygon = turf.polygon([newCoords]);
            var area = turf.area(polygon);
            let hectar = (area / 10000).toFixed(2);
            let idString = "";

            switch (doc.data().areaID) {
              case "100":
                idString = "";
                break;
              case "200":
                idString = "";
                break;
              case "166":
                idString = "16B";
                break;
              default:
                idString = doc.data().areaID;
            }
            // Write extra data that will be accessible when interacting with the areas (onHover etc)
            temp.features.push({
              type: "Feature",
              geometry: { type: "Polygon", coordinates: [newCoords] },
              properties: {
                color: parseInt(doc.data().areaID),
                area: hectar,
                label: idString,
              },
              id: doc.data().areaID,
            });
          })
        );
        setData(temp);
      });
  }, []);

  const _onHover = (event) => {
    const {
      features,
      srcEvent: { offsetX, offsetY },
    } = event;
    const hovFeature = features && features.find((f) => f.layer.id === "data");
    if (hovFeature) {
      setHoveredFeature({ hovFeature, x: offsetX, y: offsetY });
    }
  };

  const _onClick = (event) => {
    if (event.features.length !== 0) {
      const feature = event.features && event.features[0].id;
      sendDataToParent(feature);
    }
  };

  const _renderTooltip = () => {
    let idString = "";
    if (hoveredFeature) {
      switch (hoveredFeature.hovFeature.id) {
        case 100:
          idString = "Myr";
          break;
        case 200:
          idString = "Inägomark";
          break;
        case 166:
          idString = "Bestånd 16B";
          break;
        default:
          idString = `Bestånd ${hoveredFeature.hovFeature.id}`;
      }
    }

    return (
      hoveredFeature && (
        <div
          className="tooltip"
          style={{
            border: " 1px solid black",
            left: hoveredFeature.x + 10,
            top: hoveredFeature.y,
          }}
        >
          <div>{idString}</div>
          <div>Area: {hoveredFeature.hovFeature.properties.area} ha</div>
        </div>
      )
    );
  };
  const _getCursor = ({ isHovering, isDragging }) => {
    return isHovering ? "pointer" : "default";
  };
  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      width="100%"
      height="calc(100vh - 40px)"
      mapStyle="mapbox://styles/samochips/ckjlyko950ecl19oa2kmadjxl"
      getCursor={_getCursor}
      onHover={_onHover}
      onClick={_onClick}
      attributionControl={false}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <Source type="geojson" data={data}>
        {/* Polygon main layer */}
        <Layer {...dataLayer} />
        {/* Polygon border layer */}
        <Layer
          id="lineLayer2"
          type="line"
          source="data"
          layout={{
            "line-join": "round",
            "line-cap": "round",
          }}
          paint={{
            "line-color": "rgba(0, 0, 0, 0.7)",
            "line-width": 1,
          }}
        />
        {/* Polygon label layer */}
        <Layer
          type="symbol"
          layout={{
            "text-size": 13,
            "text-field": "{label}",
          }}
        ></Layer>
      </Source>
      {/* Property border layer */}
      <Source id="polylineLayer" type="geojson" data={lineCollection}>
        <Layer
          id="lineLayer"
          type="line"
          source="my-data"
          layout={{
            "line-join": "bevel",
            "line-cap": "round",
          }}
          paint={{
            "line-color": "rgba(255, 0, 0, 0.7)",
            "line-width": 3,
            "line-dasharray": [1, 2],
          }}
        />
      </Source>

      {/* House layer */}
      <Source type="geojson" data={houseCollection}>
        <Layer
          id="polygonLayer"
          type="fill"
          source="houseCollection"
          paint={{
            "fill-color": "rgba(255, 255, 255, 0.5)",
          }}
        />
      </Source>
      {_renderTooltip()}
    </ReactMapGL>
  );
};
export default Map;
