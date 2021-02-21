export const colorLegend = (selection, props) => {
    const {
        colorScale,
        spacing,
        textOffset,
        circleRadius,
        backgroundRectWidth,
        onClick,
        selectedColorValue
    } = props;

    const backgroundRect = selection.selectAll('rect')
        .data([null]);

    backgroundRect.enter().append('rect')
        .merge(backgroundRect)
        .attr('x', -circleRadius * 2)
        .attr('y', -circleRadius * 2)
        .attr('rx', circleRadius * 2)
        .attr('width', backgroundRectWidth + circleRadius)
        .attr('height', spacing * colorScale.domain().length + circleRadius * 2)
        .attr('fill', 'white')
        .attr('opacity', 0.8);

    const groups = selection.selectAll('.tick')
        .data(colorScale.domain());
    const groupEnter = groups.enter().append('g')
        .attr('class', 'tick');
    groupEnter
        .merge(groups)
        .attr('transform', (d, i) =>
            `translate(0, ${i * spacing})`
        )
        .attr('opacity', (d, i) =>
            (!selectedColorValue || d === selectedColorValue) ? 1 : 0.2
        )
        .on('click', (event, d) => onClick(event,
            d === selectedColorValue
                ? null
                : d
        ));

    groups.exit().remove();

    // Enter & Update
    groupEnter.append('circle')
        .merge(groups.select('circle'))
        .attr('r', circleRadius)
        .attr('fill', colorScale);

    groupEnter.append('text')
        .attr('x', textOffset)
        .attr('dy', '0.32em')
        .merge(groups.select('text'))
        .text(d => d);

}