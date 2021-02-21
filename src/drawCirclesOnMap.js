import {geoPath, geoNaturalEarth1, zoom, geoCentroid, scaleSqrt, max, format} from 'd3';
import {sizeLegend} from "./sizeLegend";

const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection);
const sizeScale = scaleSqrt();
const radiusValue = d => d.properties['2020'];
const populationFormat = format(',');

export const choroplethMap = (selection, props) => {
    const {
        features,
        featuresWithPopulation,
        selectedColorValue
    } = props;

    const gUpdate = selection.selectAll('g').data([null]);
    const gEnter = gUpdate.enter().append('g');
    const g = gUpdate.merge(gEnter);

    gEnter
        .append('path')
        .attr('class', 'sphere')
        .attr('d', pathGenerator({type: 'Sphere'}))
        .merge(gUpdate.select('.sphere'))
        .attr('opacity', selectedColorValue ? 0.2 : 1);

    selection.call(zoom().on('zoom', (event) => {
        g.attr('transform', event.transform);
    }));

    sizeScale.domain([0, max(featuresWithPopulation, radiusValue)])
        .range([0, 32]);

    // Draw Size Legend
    selection.append('g')
        .attr('transform', `translate(80, 200)`)
        .call(sizeLegend, {
            sizeScale,
            spacing: 40,
            textOffset: 10,
            numTicks: 5,
            tickFormat: populationFormat
        })

    const countryPaths = g.selectAll('.country').data(features);
    const countryPathsEnter = countryPaths
        .enter().append('path')
        .attr('class', 'country');

    countryPaths
        .merge(countryPathsEnter)
        .attr('d', pathGenerator)
        .attr('fill', d => d.properties['2020'] ? '#dddddd' : '#e5d8d8');

    countryPathsEnter.append('title')
        .text(d => d.properties['Region, subregion, country or area *'] + ': ' + populationFormat(radiusValue(d)));

    featuresWithPopulation.forEach(d => {
        d.properties.projected = projection(geoCentroid(d));
    });
    g.selectAll('.circle').data(featuresWithPopulation)
        .enter().append('circle')
        .attr('class', 'country-circle')
        .attr('cx', d => d.properties.projected[0])
        .attr('cy', d => d.properties.projected[1])
        .attr('r', d => sizeScale(radiusValue(d)));
}