import {geoPath, geoNaturalEarth1, zoom} from 'd3';

const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection);

export const choroplethMap = (selection, props) => {
    const {
        features,
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
}