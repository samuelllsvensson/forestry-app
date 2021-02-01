// Beståndsinfo
const polarOptions = {
  legend: {
    labels: {
      fontColor: "#495057",
    },
  },
  scale: {
    gridLines: {
      color: "#ebedef",
    },
  },
  tooltips: {
    mode: "label",
    callbacks: {
      label: function (tooltipItem, data) {
        return data["datasets"][0]["data"][tooltipItem["index"]] + " cm";
      },
    },
  },
};
const pieOptions = {
  legend: {
    labels: {
      fontColor: "#495057",
    },
  },
  tooltips: {
    mode: "label",
    callbacks: {
      label: function (tooltipItem, data) {
        return data["datasets"][0]["data"][tooltipItem["index"]] + "%";
      },
    },
  },
};

// Summary
const groundOptions = {
  legend: {
    labels: {
      fontColor: "#495057",
      fontSize: 10,
    },
  },
};

const forestOptions = {
  legend: {
    labels: {
      fontColor: "#495057",
    },
  },
};
export { polarOptions, pieOptions, groundOptions, forestOptions };
