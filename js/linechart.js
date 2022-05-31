function linearFunction(x) {
    return [x, Math.pow(x - .5, 2) * 40]
}

function lineData() {
    let temp = []
    for (let i = 0; i <= 100; i++) {
        temp.push( linearFunction(i) )
    }
    return temp
}

let linesvg = d3.select("svg#linechart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let data = lineData()

let yScale = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => {return d[1]})])
        .range([ height, 0])

let xScale = d3.scaleLinear()
                .domain([0, d3.max(data, (d) => {return d[0]} )])
                .range([0, width])

linesvg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))

linesvg.append("g")
    .call(d3.axisLeft(yScale))

linesvg.append("text")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 5))
    .attr("text-anchor", "middle")  
    .style("font-size", "35px") 
    .text("Interactive D3 line chart");

// line generator
let Gen = d3.line()
let pathOfLine = Gen(data);

var line = d3.line()
        .x(function(d) { return xScale(d[0]); }) 
        .y(function(d) { return yScale(d[1]); }) 
        .curve(d3.curveMonotoneX)
        
linesvg.append("path")
    .datum(data) 
    .attr("d", line)
    .style("fill", "none")
    .style("stroke", "#CC0000")
    .style("stroke-width", "2");

linesvg.append('g')
    .selectAll("dot")
    .data([[0,0]])
    .enter()
    .append("circle")
    .attr("cx", function (d) { return xScale(d[0]); } )
    .attr("cy", function (d) { return yScale(d[1]); } )
    .attr("class", "dot")
    .attr("r", 6)
    .style("fill", "#CC0000");


d3.select('input#myRange').on("input", function(){
        
    let newXY = linearFunction(parseInt(this.value))

    linesvg.select("circle.dot")
        .attr("cx", function (d) { return xScale(newXY[0]); })
        .attr("cy", function (d) { return yScale(newXY[1]); })

})