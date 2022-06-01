(function(){
    var svg = d3.select("svg#interactiveBar")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let data = [
        {value: 98, label: 'A'},
        {value: 27, label: 'B'}
    ]

    let yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0])

    svg.append("g")
        .call(d3.axisLeft(yScale))

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 5))
        .attr("text-anchor", "middle")
        .attr("font-size", "35px")
        .text("Interactive Bar Chart")

    let xScale = d3.scaleBand()
        .domain(data.map((d) => d.label))
        .range([0, width])
        .padding(.2)

    svg.append("g")
        .attr("transform", "translate( 0," + height + ")")
        .call(d3.axisBottom(xScale));

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
            .attr("x", (d) => xScale(d.label))
            .attr("y", (d) => yScale(d.value))
            .attr("width", xScale.bandwidth())
            .attr("height", (d) => height - yScale(d.value))
            .attr("fill", "#69b3a2")


})()