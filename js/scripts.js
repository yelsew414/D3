function np(c) {
    // convert currency values into number
    let z = Number(c.replace(/[^0-9.-]+/g,""));
    console.log(z)
    return z
}

var margin = {top: 30, right: 30, bottom: 100, left: 60};
var width = 1000 - margin.left - margin.right;
var height = 700 - margin.top - margin.bottom;

var svg = d3.select("svg")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    
    var y = d3.scaleLinear()
            .domain([0, 120000])
            .range([ height, 0])
    
    svg.append("g")
        .call(d3.axisLeft(y))
    
    
    d3.csv("https://raw.githubusercontent.com/prasertcbs/basic-dataset/master/college-salaries/degrees-that-pay-back.csv").then(function(data) {

        // reduce data set
        data = data.slice(0, 10)
        
        var x = d3.scaleBand()
                .domain(data.map(function(d) { return d['Undergraduate Major']}))
                .range([ 0, width])
                .padding(.2)
            
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10, 0)rotate(-45)")
            .style("text-anchor", "end");
            
        svg.selectAll("myBar")
            .data(data)
            .enter()
            .append("rect")
                .attr("x", function(d) {return x(d['Undergraduate Major'])})
                .attr("y", function(d) {return y(np(d['Mid-Career Median Salary']))})
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - y(np(d['Mid-Career Median Salary']))})
                .attr("fill", "#69b3a2");

});
