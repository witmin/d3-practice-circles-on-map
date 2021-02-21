import {select, scaleOrdinal, schemeSpectral} from 'd3';
import {loadAndProcessData} from "./loadAndProcessData";
import {colorLegend} from "./colorLegend";
import {choroplethMap} from "./drawChoroplethMap";

const width = document.body.clientWidth;
const height = document.body.clientHeight;

const svg = select('svg');
svg
    .attr('width', width)
    .attr('height', height)
    .append('rect');

const g = svg.append('g');
const choroplethMapG = svg.append('g');
const colorLegendG = svg.append('g')
    .attr('transform', `translate(40, 280)`);

const colorValue = d => d.properties.economy;

let selectedColorValue;
let features;

const onClick = (event, d) => {
    selectedColorValue = d;
    console.log(selectedColorValue);
    render();
};

loadAndProcessData().then(countries => {
    features = countries.features;
    render();
});

const render = () => {
    choroplethMapG.call(choroplethMap, {
        features,
        selectedColorValue
    });
}
