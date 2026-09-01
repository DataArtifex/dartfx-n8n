import type { INodeProperties } from "n8n-workflow";

export const VizDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["viz"],
      },
    },
  },
  {
    displayName: "Output File Path",
    name: "outputPath",
    type: "string",
    default: "",
    description:
      "Optional path to write output file directly to disk (if omitted, results are returned in node output)",
    displayOptions: {
      show: {
        operation: ["viz"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv viz",
    displayOptions: {
      show: {
        operation: ["viz"],
      },
    },
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add Option",
    default: {},
    displayOptions: {
      show: {
        operation: ["viz"],
      },
    },
    options: [
      {
        displayName: "X",
        name: "x",
        type: "string",
        default: "",
        description: "Column for the x-axis / category / bin / group.",
      },
      {
        displayName: "Y",
        name: "y",
        type: "string",
        default: "",
        description: "Column for the y-axis / value.",
      },
      {
        displayName: "Z",
        name: "z",
        type: "string",
        default: "",
        description:
          "The z column: a heatmap pivot value (with --x and --y), or",
      },
      {
        displayName: "Cols",
        name: "cols",
        type: "string",
        default: "",
        description: "Columns to use. For heatmap: numeric columns for the",
      },
      {
        displayName: "Series",
        name: "series",
        type: "string",
        default: "",
        description: "Column to split into multiple series (one trace per",
      },
      {
        displayName: "Color",
        name: "color",
        type: "string",
        default: "",
        description:
          "For scatter/scatter3d/map/geo: a numeric column to encode as",
      },
      {
        displayName: "Size",
        name: "size",
        type: "string",
        default: "",
        description:
          "For scatter/scatter3d/map/geo: a numeric column to encode as",
      },
      {
        displayName: "Donut",
        name: "donut",
        type: "boolean",
        default: false,
        description: "Render a pie chart as a donut (with a center hole).",
      },
      {
        displayName: "Ohlc Open",
        name: "ohlcOpen",
        type: "string",
        default: "",
        description: "Open-price column for candlestick/ohlc charts.",
      },
      {
        displayName: "High",
        name: "high",
        type: "string",
        default: "",
        description: "High-price column for candlestick/ohlc charts.",
      },
      {
        displayName: "Low",
        name: "low",
        type: "string",
        default: "",
        description: "Low-price column for candlestick/ohlc charts.",
      },
      {
        displayName: "Close",
        name: "close",
        type: "string",
        default: "",
        description: "Close-price column for candlestick/ohlc charts.",
      },
      {
        displayName: "Source",
        name: "source",
        type: "string",
        default: "",
        description: "Source node column for a sankey diagram.",
      },
      {
        displayName: "Target",
        name: "target",
        type: "string",
        default: "",
        description: "Target node column for a sankey diagram.",
      },
      {
        displayName: "Value",
        name: "value",
        type: "string",
        default: "",
        description: "Flow value column for a sankey diagram. When omitted,",
      },
      {
        displayName: "Sankey Value Order",
        name: "sankeyValueOrder",
        type: "boolean",
        default: false,
        description:
          "Order sankey nodes by total flow (largest at the top of each",
      },
      {
        displayName: "Bins",
        name: "bins",
        type: "string",
        default: "",
        description: "Number of bins. For histogram: bins along the x-axis",
      },
      {
        displayName: "Agg",
        name: "agg",
        type: "string",
        default: "",
        description: "For bar/line, aggregate the y values when the x value",
      },
      {
        displayName: "Box Points",
        name: "boxPoints",
        type: "string",
        default: "",
        description: "Which sample points to draw alongside a box. Reading the",
      },
      {
        displayName: "Lat",
        name: "lat",
        type: "string",
        default: "",
        description: "Latitude column for a map (decimal degrees, -90 to 90).",
      },
      {
        displayName: "Lon",
        name: "lon",
        type: "string",
        default: "",
        description:
          "Longitude column for a map (decimal degrees, -180 to 180).",
      },
      {
        displayName: "Text",
        name: "text",
        type: "string",
        default: "",
        description: "Column whose value labels each point on hover.",
      },
      {
        displayName: "Density",
        name: "density",
        type: "boolean",
        default: false,
        description: "Render a density heatmap (DensityMap) instead of points.",
      },
      {
        displayName: "Style",
        name: "style",
        type: "string",
        default: "",
        description:
          "MapLibre basemap style (all render without an access token):",
      },
      {
        displayName: "Projection",
        name: "projection",
        type: "string",
        default: "",
        description: "Map projection for `viz geo`. One of: natural-earth (the",
      },
      {
        displayName: "Locations",
        name: "locations",
        type: "string",
        default: "",
        description:
          "Column holding the region key for each row (an ISO-3 country",
      },
      {
        displayName: "Location Mode",
        name: "locationMode",
        type: "string",
        default: "",
        description:
          "How --locations values are matched to regions. One of: iso3",
      },
      {
        displayName: "Color Scale",
        name: "colorScale",
        type: "string",
        default: "",
        description:
          "Colorscale for the region fill. One of: viridis (the default),",
      },
      {
        displayName: "Map",
        name: "map",
        type: "boolean",
        default: false,
        description:
          "Render on a token-free MapLibre tile basemap (a ChoroplethMap)",
      },
      {
        displayName: "Geojson",
        name: "geojson",
        type: "string",
        default: "",
        description:
          "Custom region polygons as a local file path or an http(s) URL",
      },
      {
        displayName: "Feature Id Key",
        name: "featureIdKey",
        type: "string",
        default: "",
        description:
          "Property path in each GeoJSON feature whose value matches an",
      },
      {
        displayName: "Feature Name Key",
        name: "featureNameKey",
        type: "string",
        default: "",
        description: "GeoJSON property path whose value is shown as the",
      },
      {
        displayName: "Denominator Key",
        name: "denominatorKey",
        type: "string",
        default: "",
        description: "GeoJSON property path holding each region's DENOMINATOR",
      },
      {
        displayName: "Denominator Unit",
        name: "denominatorUnit",
        type: "string",
        default: "",
        description: "",
      },
      {
        displayName: "Denominator",
        name: "denominator",
        type: "string",
        default: "",
        description:
          "Column holding each region's DENOMINATOR, as an alternative",
      },
      {
        displayName: "Geocode",
        name: "geocode",
        type: "boolean",
        default: false,
        description: "Derive the region codes by reusing qsv's geocode engine",
      },
      {
        displayName: "Geocode Country",
        name: "geocodeCountry",
        type: "string",
        default: "",
        description: "",
      },
      {
        displayName: "Geocode Admin1",
        name: "geocodeAdmin1",
        type: "string",
        default: "",
        description: "",
      },
      {
        displayName: "No Snap",
        name: "noSnap",
        type: "boolean",
        default: false,
        description:
          "For point-in-polygon binning (lat/lon points binned into a",
      },
      {
        displayName: "Snap Max Dist",
        name: "snapMaxDist",
        type: "string",
        default: "",
        description:
          "For point-in-polygon binning: the farthest (in km) an outside",
      },
      {
        displayName: "Max Charts",
        name: "maxCharts",
        type: "string",
        default: "",
        description:
          "Maximum number of panels in the Data Schematic. 0 (the default)",
      },
      {
        displayName: "Grid Cols",
        name: "gridCols",
        type: "string",
        default: "",
        description:
          "Number of columns in the Data Schematic grid for the per-column",
      },
      {
        displayName: "Preview Threshold",
        name: "previewThreshold",
        type: "string",
        default: "",
        description: "Row threshold for the interactive data viewer drawer of",
      },
      {
        displayName: "Heatmap Density",
        name: "heatmapDensity",
        type: "string",
        default: "",
        description: "For the `viz smart` map panel: at or above <n> mappable",
      },
      {
        displayName: "Cluster",
        name: "cluster",
        type: "string",
        default: "",
        description: "For the `viz smart` map panel: whether to offer an",
      },
      {
        displayName: "Photos",
        name: "photos",
        type: "boolean",
        default: false,
        description:
          "For the `viz smart` map panel: when a column holds image URLs",
      },
      {
        displayName: "Limit",
        name: "limit",
        type: "number",
        default: 10,
        description: "Top-N categories per frequency bar chart. [default: 10]",
      },
      {
        displayName: "No Nulls",
        name: "noNulls",
        type: "boolean",
        default: false,
        description:
          'Omit the "(NULL)" bar (empty cells) from frequency bar charts.',
      },
      {
        displayName: "No Other",
        name: "noOther",
        type: "boolean",
        default: false,
        description:
          'Omit the "Other (N)" aggregate bar from frequency bar charts. It',
      },
      {
        displayName: "Smarter",
        name: "smarter",
        type: "boolean",
        default: false,
        description:
          "Before building the Data Schematic, run `qsv moarstats --advanced`",
      },
      {
        displayName: "Hierarchy Style",
        name: "hierarchyStyle",
        type: "string",
        default: "",
        description:
          "For `smart`, the chart used for the categorical part-to-whole",
      },
      {
        displayName: "Dictionary",
        name: "dictionary",
        type: "string",
        default: "",
        description:
          "Use a describegpt Data Dictionary to guide panel selection from",
      },
      {
        displayName: "Dictionary Context",
        name: "dictionaryContext",
        type: "string",
        default: "",
        description: "Path to a file with extra context about the dataset",
      },
      {
        displayName: "Dict Info",
        name: "dictInfo",
        type: "boolean",
        default: false,
        description:
          "When a usable Data Dictionary is available (per --dictionary), add",
      },
      {
        displayName: "Dataset Pid",
        name: "datasetPid",
        type: "string",
        default: "",
        description:
          "A persistent identifier (PID) for the dataset - typically a full",
      },
      {
        displayName: "Bivariate",
        name: "bivariate",
        type: "boolean",
        default: false,
        description: "Add two pairwise-association overview panels driven by",
      },
      {
        displayName: "Log Scale",
        name: "logScale",
        type: "string",
        default: "",
        description: "Use a logarithmic y-axis for panels with a high dynamic",
      },
      {
        displayName: "Violin",
        name: "violin",
        type: "string",
        default: "",
        description: "Draw distribution panels as violins (a box plot",
      },
      {
        displayName: "Title",
        name: "title",
        type: "string",
        default: "",
        description: "Chart title.",
      },
      {
        displayName: "X Title",
        name: "xTitle",
        type: "string",
        default: "",
        description: "X-axis title. (defaults to the x column name)",
      },
      {
        displayName: "Y Title",
        name: "yTitle",
        type: "string",
        default: "",
        description: "Y-axis title. (defaults to the y column name)",
      },
      {
        displayName: "Y Range",
        name: "yRange",
        type: "string",
        default: "",
        description: "Fix the y-axis to an explicit min:max range (two colon-",
      },
      {
        displayName: "Rangeslider",
        name: "rangeslider",
        type: "boolean",
        default: false,
        description:
          "Add a draggable range-slider (a navigator strip) under the",
      },
      {
        displayName: "Slider",
        name: "slider",
        type: "string",
        default: "",
        description:
          "Animate the chart over a column: each distinct value of the",
      },
      {
        displayName: "Slider Speed",
        name: "sliderSpeed",
        type: "string",
        default: "",
        description:
          "Milliseconds each animation frame is shown while playing.",
      },
      {
        displayName: "Slider Cumulative",
        name: "sliderCumulative",
        type: "boolean",
        default: false,
        description:
          "Accumulate rows across frames: frame N includes every row",
      },
      {
        displayName: "Annotation",
        name: "annotation",
        type: "string",
        default: "",
        description:
          "Caption note drawn at the bottom of the plot (e.g. to note",
      },
      {
        displayName: "Theme",
        name: "theme",
        type: "string",
        default: "",
        description: "Plotly theme that drives the chart's overall look",
      },
      {
        displayName: "Language",
        name: "language",
        type: "string",
        default: "",
        description: "Render the Data Schematic UI in this language. Accepts a",
      },
      {
        displayName: "Width",
        name: "width",
        type: "string",
        default: "",
        description: "Image width in pixels for static export. Default 1000;",
      },
      {
        displayName: "Height",
        name: "height",
        type: "string",
        default: "",
        description: "Image height in pixels for static export. Default 600;",
      },
      {
        displayName: "Scale",
        name: "scale",
        type: "number",
        default: 1.0,
        description: "Image scale factor (static export). [default: 1.0]",
      },
      {
        displayName: "Open",
        name: "open",
        type: "boolean",
        default: false,
        description: "Open the generated chart in the default browser/viewer.",
      },
      {
        displayName: "Delimiter",
        name: "delimiter",
        type: "string",
        default: "",
        description: "The field delimiter for reading CSV data.",
      },
      {
        displayName: "No Headers",
        name: "noHeaders",
        type: "boolean",
        default: false,
        description: "When set, the first row will not be interpreted",
      },
    ],
  },
];
