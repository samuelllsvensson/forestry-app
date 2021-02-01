// Testing data
var featurecollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [13.700599, 57.432662],
            [13.699354, 57.4325],
            [13.69914, 57.431645],
            [13.700298, 57.431437],
            [13.701371, 57.430698],
            [13.703217, 57.431345],
            [13.702702, 57.431899],
            [13.700599, 57.432662],
          ],
        ],
      },
      properties: { shape: "Polygon", name: "bestånd1", category: "default" },
      id: "1",
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [13.700599, 57.432662],
            [13.702702, 57.431899],
            [13.706222, 57.430975],
            [13.705964, 57.432223],
            [13.704076, 57.433701],
            [13.700642, 57.434025],
            [13.700599, 57.432662],
          ],
        ],
      },
      properties: { shape: "Polygon", name: "bestånd2", category: "default" },
      id: "2",
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [13.703217, 57.431345],
            [13.702959, 57.429404],
            [13.699654, 57.428365],
            [13.702959, 57.42617],
            [13.707981, 57.426285],
            [13.703217, 57.431345],
          ],
        ],
      },
      properties: { shape: "Polygon", name: "bestånd3", category: "default" },
      id: "3",
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [13.704076, 57.433701],
            [13.706733, 57.432483],
            [13.705964, 57.432223],
            [13.706551, 57.432084],
            [13.708096, 57.431414],
            [13.709673, 57.432985],
            [13.707205, 57.434233],
            [13.704076, 57.433701],
          ],
        ],
      },
      properties: { shape: "Polygon", name: "bestånd1", category: "default" },
      id: "1",
    },
  ],
};

var metadata = {
  general: {
    name: "bestånd 1",
    area: 0.3,
    class: "PG",
    goal: "Produktion främst av tall",
  },
  description: {
    type: "G1",
    age: 56,
    index: "T24",
    volume: 90,
    totVolume: 30,
  },
  distribution: {
    distPine: 90,
    distFir: 0,
    distLeaf: 10,
    diamPine: 16,
    diamFir: 0,
    diamLeaf: 12,
  },

  notes: "freetext",
};
var actions = {
  type: "Gallring",
  time: "Om 5 år",
  amount: 30,
  volume: 12,
};
export { featurecollection, metadata, actions };
