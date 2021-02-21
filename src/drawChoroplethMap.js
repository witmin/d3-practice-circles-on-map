import {geoPath, geoNaturalEarth1, zoom, geoCentroid, scaleSqrt, max} from 'd3';

const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection);
const radiusScale = scaleSqrt();
const radiusValue = d => d.properties['2020'];

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

    const radiusScale = scaleSqrt()
        .domain([0, max(featuresWithPopulation, radiusValue)])
        .range([0, 32]);

    const countryPaths = g.selectAll('.country').data(features);
    const countryPathsEnter = countryPaths
        .enter().append('path')
        .attr('class', 'country');

    countryPaths
        .merge(countryPathsEnter)
        .attr('d', pathGenerator)
        .attr('fill', d => d.properties['2020'] ? 'green' : 'red');

    countryPathsEnter.append('title')
        .text(d => d.properties.name + ': ' + d.id);

    featuresWithPopulation.forEach(d => {
        d.properties.projected = projection(geoCentroid(d));
    });
    g.selectAll('.circle').data(featuresWithPopulation)
        .enter().append('circle')
        .attr('class', 'country-circle')
        .attr('cx', d => d.properties.projected[0])
        .attr('cy', d => d.properties.projected[1])
        .attr('r', d => radiusScale(radiusValue(d)));

}