
(function(){

    var margin = {top: 30, right: 30, bottom: 30, left: 60};
    var width = 1000 - margin.left - margin.right;
    var height = 700 - margin.top - margin.bottom;
    
    var svg = d3.select("svg#animatedBar")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    let index = 0
    let data = [
        {value: 98, label: index},
        // {value: 27, label: 'B'}
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
        .text("Animated Bar Chart")

    let xScale = d3.scaleBand()
        .domain(data.map((d) => d.label))
        .range([0, width])
        .padding(.2)

    svg.append("g")
        .attr("class", "xaxis")
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
            .attr("fill", "red")


    svg.selectAll('rect').on("mouseover", function(d) {
        let rect = d3.select(this)
        rect.transition().duration(500).attr('fill', 'darkred')
    })
    svg.selectAll('rect').on("mouseout", function(d) {
        let rect = d3.select(this)
        rect.transition().duration(500).attr('fill', 'red')
    })

    const chars = "BCDEFGHIJKLMNOPQRSTUVWXTZ";

    d3.selectAll('#animationTrigger').on("click", function() {

        index++;

        data.push({value: Math.floor(Math.random() * 100), label: index})

        console.log(data)

        const t = svg.transition()
            .duration(750);
        
        xScale = d3.scaleBand()
            .domain(data.map((d) => d.label))
            .range([0, width])
            .padding(.2)
            
        svg.selectAll("rect")
            .data(data, d => d.label)
            .join(
                enter => enter.append("rect")
                        .attr("y", (d) => yScale(d.value))
                        .attr("x", d => width)
                        .attr("height", (d) => height - yScale(d.value))
                        .attr("width", xScale.bandwidth())
                    .call(enter => enter.transition(t)
                        .attr("x", (d) => xScale(d.label))
                        .attr("fill", "green")
                    ),
                update => update
                    .call(update => update.transition(t)
                        .attr("x", (d, i) => xScale(d.label))
                        .attr("width", xScale.bandwidth())
                    ),
                exit => exit.remove()
            )
        
            svg.selectAll("g.xaxis")
                .transition()
                .duration(750)
                .call(d3.axisBottom(xScale));
    })

})()