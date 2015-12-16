require('../../build/index.html'); // so we have live reload
var data = require("./components/data.js");
var d3 = require("d3");
var $ = require("jquery");

require("../style/main.css")

var d = d = data(),
    table = d3.selectAll("#container"),
    thead = table.append("thead"),
    tbody = table.append("tbody"),
    ident = function(x) {return x;},
    cells = null,
    rows = null;

function update(data) {
    rows = tbody.selectAll("tr")
        .data(data);

    rows.enter()
        .append("tr");

    cells = rows.selectAll("td")
        .data(ident);

    cells.enter()
        .append("td")
        .classed("abc", true)
        .on("mouseover", function(d) {
            selectSameVersion(d.v, true)
        })
        .on("mouseout",  function(d) {
            selectSameVersion(d.v, false)
        })
        .text(function(d) {return "v:" + d.v})

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

update(d);

function selectSameVersion(version, bool) {
    cells.filter(function(x) {
        return x.v == version
    }).classed("active", bool)
}
