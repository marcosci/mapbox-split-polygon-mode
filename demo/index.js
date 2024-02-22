import SelectFeatureMode, {
  drawStyles as selectFeatureDrawStyles,
} from "mapbox-gl-draw-select-mode";
import defaultDrawStyle from "https://unpkg.com/@mapbox/mapbox-gl-draw@1.3.0/src/lib/theme.js";

import SplitPolygonMode, {
  drawStyles as splitPolygonDrawStyles,
  Constants as splitPolygonConstants,
} from "..";

const { MODE } = import.meta.env;

import "./index.css";

let map, draw, drawBar;

function goSplitMode(selectedFeatureIDs) {
  try {
    draw?.changeMode("split_polygon", {
      featureIds: selectedFeatureIDs,
      /** Default option vlaues: */
      // lineWidth: 0,
      // lineWidthUnit: "kilometers",
    });
  } catch (err) {
    console.error(err);
  }
}

function splitPolygon() {
  const selectedFeatureIDs = draw.getSelectedIds();

  if (selectedFeatureIDs.length > 0) {
    goSplitMode(selectedFeatureIDs);
  } else {
    draw.changeMode("select_feature", {
      selectHighlightColor: "yellow",
      onSelect(selectedFeatureID) {
        goSplitMode([selectedFeatureID]);
      },
    });
  }
}

class extendDrawBar {
  constructor(opt) {
    let ctrl = this;
    ctrl.draw = opt.draw;
    ctrl.buttons = opt.buttons || [];
    ctrl.onAddOrig = opt.draw.onAdd;
    ctrl.onRemoveOrig = opt.draw.onRemove;
  }
  onAdd(map) {
    let ctrl = this;
    ctrl.map = map;
    ctrl.elContainer = ctrl.onAddOrig(map);
    ctrl.buttons.forEach((b) => {
      ctrl.addButton(b);
    });
    return ctrl.elContainer;
  }
  onRemove(map) {
    let ctrl = this;
    ctrl.buttons.forEach((b) => {
      ctrl.removeButton(b);
    });
    ctrl.onRemoveOrig(map);
  }
  addButton(opt) {
    let ctrl = this;
    var elButton = document.createElement("button");
    elButton.className = "mapbox-gl-draw_ctrl-draw-btn";
    if (opt.classes instanceof Array) {
      opt.classes.forEach((c) => {
        elButton.classList.add(c);
      });
    }
    elButton.addEventListener(opt.on, opt.action);
    ctrl.elContainer.appendChild(elButton);
    opt.elButton = elButton;
  }
  removeButton(opt) {
    opt.elButton.removeEventListener(opt.on, opt.action);
    opt.elButton.remove();
  }
}

if (mapboxgl.getRTLTextPluginStatus() === "unavailable")
  mapboxgl.setRTLTextPlugin(
    "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
    (err) => {
      err && console.error(err);
    },
    true
  );

map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/light-v11", // style URL
  center: [7.743189929905293, 48.09744836188367],
  zoom: 10, // starting zoom
  accessToken:
    "pk.eyJ1IjoibWFyY28tc2NpYWluaSIsImEiOiJja3hhdTNqeTAxM2dpMnJxY3hlODdna2FlIn0.ca84aO5lB8kRqzAoNZQvfg",
});

draw = new MapboxDraw({
  modes: {
    ...SplitPolygonMode(SelectFeatureMode(MapboxDraw.modes)),
  },
  styles: [
    ...splitPolygonDrawStyles(selectFeatureDrawStyles(defaultDrawStyle)),
  ],
  userProperties: true,
});

window.draw = draw;

drawBar = new extendDrawBar({
  draw: draw,
  buttons: [
    {
      on: "click",
      action: splitPolygon,
      classes: ["split-polygon"],
    },
  ],
});

map.once("load", () => {
  map.resize();
  map.addControl(drawBar, "top-right");
  draw.set({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [8.05892488973916, 48.21173348996617],
              [8.040389557676358, 48.21112520081343],
              [8.022034039466151, 48.209306234621394],
              [8.004036366485282, 48.206294236680506],
              [7.986571024318377, 48.20211842141038],
              [7.9698072274959815, 48.196819282957804],
              [7.953907250657969, 48.19044819439171],
              [7.939024833742595, 48.183066899781025],
              [7.9253036778003985, 48.17474690456374],
              [7.912876046822984, 48.165568770666354],
              [7.901861489584627, 48.15562132379653],
              [7.892365693948659, 48.145000781199975],
              [7.884479484421631, 48.1338098089338],
              [7.878277971977873, 48.12215651835779],
              [7.873819863357798, 48.11015341207634],
              [7.871146935196024, 48.097916289974314],
              [7.870283676489869, 48.0855631262802],
              [7.871237101102274, 48.07321292875936],
              [7.873996730229845, 48.060984591192494],
              [7.878534743077625, 48.04899575023395],
              [7.884806292384346, 48.03736165757608],
              [7.892749979949092, 48.02619407807675],
              [7.902288485931917, 48.01560022414356],
              [7.913329344443583, 48.00568173621912],
              [7.92576585680572, 47.99653371868368],
              [7.939478132852663, 47.98824383989376],
              [7.95433424975744, 47.98089150441468],
              [7.970191517092309, 47.9745471047907],
              [7.986897836173265, 47.969271359433776],
              [8.00429314118093, 47.96511474241058],
              [8.022210909090377, 47.962117010071324],
              [8.040479725072078, 47.96030682860071],
              [8.05892488973916, 47.95970150568664],
              [8.077370054406243, 47.96030682860071],
              [8.095638870387942, 47.962117010071324],
              [8.11355663829739, 47.96511474241058],
              [8.130951943305055, 47.969271359433776],
              [8.147658262386011, 47.9745471047907],
              [8.163515529720883, 47.98089150441468],
              [8.178371646625658, 47.98824383989376],
              [8.192083922672602, 47.99653371868368],
              [8.204520435034738, 48.00568173621912],
              [8.215561293546404, 48.01560022414356],
              [8.22509979952923, 48.02619407807675],
              [8.233043487093974, 48.03736165757608],
              [8.239315036400695, 48.04899575023395],
              [8.243853049248477, 48.060984591192494],
              [8.246612678376048, 48.07321292875936],
              [8.247566102988452, 48.0855631262802],
              [8.246702844282298, 48.097916289974314],
              [8.244029916120525, 48.11015341207634],
              [8.239571807500448, 48.12215651835779],
              [8.23337029505669, 48.1338098089338],
              [8.225484085529661, 48.145000781199975],
              [8.215988289893694, 48.15562132379653],
              [8.204973732655336, 48.165568770666354],
              [8.192546101677923, 48.17474690456374],
              [8.178824945735727, 48.183066899781025],
              [8.163942528820352, 48.19044819439171],
              [8.148042551982341, 48.196819282957804],
              [8.131278755159943, 48.20211842141038],
              [8.113813412993037, 48.206294236680506],
              [8.09581574001217, 48.209306234621394],
              [8.077460221801964, 48.21112520081343],
              [8.05892488973916, 48.21173348996617],
            ],
          ],
        },
        id: 2,
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [
            [
              [7.120439104305632, 48.159596627635494],
              [7.120439104305632, 48.01123178165423],
              [7.7149383909805636, 48.01123178165423],
              [7.7149383909805636, 48.159596627635494],
              [7.120439104305632, 48.159596627635494],
            ],
          ],
          type: "Polygon",
        },
      },
    ],
  });

  map.on("draw.update", function (e) {
    console.log("🚀 ~ file: index.js ~ line 158 ~ e", e);

    /// Fixing an issue caused by mapbox-gl-draw. check `Readme.md` section ##Notes.
    if (e.action === "split_polygon") {
      const allFeatures = draw.getAll().features;

      allFeatures.forEach(({ id }) =>
        draw.setFeatureProperty(
          id,
          splitPolygonConstants.highlightPropertyName,
          undefined
        )
      );
    }
  });
});
