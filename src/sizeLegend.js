export const sizeLegend = (selection, props) => {
    const {
        sizeScale,
        spacing,
        textOffset,
        numTicks,
        tickFormat
    } = props;
    const ticks = sizeScale.ticks(numTicks).filter(d => d !== 0).reverse();


    const groups = selection.selectAll('g')
        .data(ticks);
    const groupEnter = groups.enter().append('g');
    groupEnter.merge(groups)
        .attr('transform', (d, i) => `translate(0, ${i * spacing})`);

    groups.exit().remove();

    // Enter & Update
    groupEnter.append('circle')
        .merge(groups.select('circle'))
        .attr('class', 'tick-circle')
        .attr('r', d => sizeScale(d));

    groupEnter.append('text')
        .attr('x', d => sizeScale(d) + textOffset)
        .attr('dy', '0.32em')
        .merge(groups.select('text'))
        .text(tickFormat);
}