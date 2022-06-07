
(function(){
    
    var margin = {top: 30, right: 30, bottom: 30, left: 100};
    var width = 1000 - margin.left - margin.right;
    var height = 700 - margin.top - margin.bottom;

    const padding = 0.2
    const duration = 750
    const ease = d3.easeLinear()
    
    d3.csv('https://raw.githubusercontent.com/yelsew414/data/main/2018GDP.csv').then( function(fulldata){
        
        var svg = d3.select("svg#animatedBar")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        const WINDOWSIZE = 5
        let index = 1

        let data = fulldata.slice(0, 1)
        
        let yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => +d['GDP'])])
            .range([height, 0])
    
        svg.append("g")
            .attr("class", "yaxis")
            .call(d3.axisLeft(yScale))
    
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 5))
            .attr("text-anchor", "middle")
            .attr("font-size", "35px")
            .text("Animated Bar Chart")

        let xScale = d3.scaleBand()
            .domain(data.map(function(d) {return d['Entity']}))
            .range([0, width])
            .padding(padding)
    
        svg.append("g")
            .attr("class", "xaxis")
            .attr("transform", "translate( 0," + height + ")")
            .call(d3.axisBottom(xScale));
    
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
                .attr("x", (d) => xScale(d.Entity))
                .attr("y", (d) => yScale(d.GDP))
                .attr("width", xScale.bandwidth())
                .attr("height", (d) => height - yScale(d.GDP))
                .attr("fill", "green")

        svg.selectAll('rect').on("mouseout", function(d) {
            let rect = d3.select(this)
            rect.transition().duration(500).attr('fill', 'red')
        })

        function addCountry() {
            index++;
            let start = 0
            if (index > WINDOWSIZE) {
                start = index - WINDOWSIZE
            }
    
            data = fulldata.slice(start, index)
        
            const t = svg.transition()
                .duration(duration);
            
            xScale = d3.scaleBand()
                .domain(data.map((d) => d.Entity))
                .range([0, width])
                .padding(padding)
                
            yScale = d3.scaleLinear()
                .domain([0, d3.max(data, d => +d['GDP'])])
                .range([height, 0])

            svg.selectAll("g.xaxis")
                .transition()
                .duration(duration)
                .call(d3.axisBottom(xScale));
                
            svg.selectAll("rect")
                .data(data, d => d.Entity)
                .join(
                    enter => enter.append("rect")
                            .attr("y", (d) => yScale(d.GDP))
                            .attr("x", d => width)
                            .attr("height", (d) => height - yScale(d.GDP))
                            .attr("width", xScale.bandwidth())
                        .call(enter => enter.transition(t)
                            .attr("x", (d) => xScale(d.Entity))
                            .attr("fill", "green")
                        ),
                    update => update
                        .call(update => update.transition(t)
                            .attr("x", (d, i) => xScale(d.Entity))
                            .attr("width", xScale.bandwidth())
                        ),
                    exit => exit
                        .call(exit => exit.transition(t)
                            .attr("width", 0)
                            .remove()
                        )
                )
            
        }
       
        d3.selectAll('#animationTrigger').on("click", addCountry)

        d3.interval(addCountry, duration)
    })


})()