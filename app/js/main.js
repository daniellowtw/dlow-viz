var data = require("./components/data.js");
var d3 = require("d3");
var $ = require("jquery");

require("../style/main.css")

var d = d = data(),
    table = d3.selectAll("#container"),
    thead = table.append("thead"),
    tbody = table.append("tbody"),
    ident = function(x) {return x;}

function update(data) {
    var rows = tbody.selectAll("tr")
        .data(data)

    rows.enter()
        .append("tr");

    var cells = rows.selectAll("td")
        .data(ident);

    cells.enter()
        .append("td")
        .on("mouseover", function() { d3.select(this).classed("active", true ) })       // classed("active",boolean) not working
        .on("mouseout",  function() { d3.select(this).classed("active", false) })
        .text(function(d) {console.log(d.c); return d.c})

    cells.exit()
        .attr('class', 'exit')
        .transition()
        .delay(200)
        .duration(500)
        .style('opacity', 0.0)
        .remove();

    rows.exit()
        .attr('class', 'exit')
        .transition()
        .delay(200)
        .duration(500)
        .style('opacity', 0.0)
        .remove();

}

update(d)