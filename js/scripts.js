d3.select("body")
    .append("svg")
    .attr("width", 50)
    .attr("height", 50)
    .append("circle")
    .attr("cx", 25)
    .attr("cy", 25)
    .attr("r", 25)
    .style("fill", "purple");

var margin = {top: 30, right: 30, bottom: 70, left: 60};
var width = 400 - margin.top - margin.bottom;
var height = 400 - margin.top - margin.right;

// var svg = d3.select("#my_dataviz")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/prasertcbs/basic-dataset/master/college-salaries/degrees-that-pay-back.csv").then(data => {
    console.log(data)
});
