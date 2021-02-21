import {select} from 'd3';
import {loadAndProcessData} from "./loadAndProcessData";
import {choroplethMap} from "./drawCirclesOnMap";

const width = document.body.clientWidth;
const height = document.body.clientHeight;

const svg = select('svg');
svg
    .attr('width', width)
    .attr('height', height)
    .append('rect');

const choroplethMapG = svg.append('g');

let selectedColorValue;
let features;
let featuresWithPop;

loadAndProcessData().then(
    ({countries, featuresWithPopulation}) => {
    features = countries.features;
    featuresWithPop = featuresWithPopulation
    render();
});

const render = () => {
    choroplethMapG.call(choroplethMap, {
        features,
        featuresWithPopulation: featuresWithPop,
        selectedColorValue
    });
}
