const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const FRAME1 = d3.select("#vis1") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.left - MARGINS.right;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.top - MARGINS.bottom; 

d3.csv("data/data.csv").then((data) => {

  // find max X
  const MAX_Y2 = d3.max(data, (d) => { return parseInt(d.Value); });
          // Note: data read from csv is a string, so you need to
          // cast it to a number if needed 
  
  // Define scale functions that maps our data values 
  // (domain) to pixel values (range)
  const Y_SCALE2 = d3.scaleLinear() 
                    .domain([0, (MAX_Y2 + 10000)]) // add some padding  
                    .range([0, VIS_HEIGHT]); 

  // Use X_SCALE to plot our points
  FRAME1.selectAll("points")  
      .data(data) // passed from .then  
      .enter()       
      .append("rect")  
        .attr("x", (d) => { return (Y_SCALE2(d.x) + MARGINS.left); }) 
        .attr("y", MARGINS.top) 
        .attr(width="150")
        .attr(height="150")
        .attr("class", "point"); 

  // Add an axis to the vis  
  FRAME1.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(Y_SCALE2).ticks(4)) 
          .attr("font-size", '20px'); 

}); 