require('../../build/index.html'); // so we have live reload
var data = require("./components/data.js");
var d3 = require("d3");
var $ = require("jquery");

require("../style/main.css");

var d = d3.nest().key(function(d){return d.s}).entries(data()),
    table = d3.select("#container")
        .append("table")
        .style("border-collapse", "collapse")
        .style("border", "2px black solid"),
    thead = table.append("thead"),
    tbody = table.append("tbody"),
    ident = function(x) {return x;},
    displayFunc = genDisplayFunc(),
    cells = null,
    rows = null,
    color = d3.scale.category20();

function update(data) {
    if (cells) {
        cells.remove()

    }
    data = data || d;
    rows = tbody.selectAll("tr")
        .data(data);

    rows.enter()
        .append("tr");

    cells = rows.selectAll("td")
        .data(function(x){return x.values});

    cells.enter()
        .append("td")
        .classed("abc", true)
        .on("mouseover", function(d) {
            selectSameValue(d, true)
        })
        .on("mouseout",  function(d) {
            selectSameValue(d, false)
        })
        .text(displayFunc)

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

function selectSameValue(data, bool) {
    cells.filter(function(x) {
        return displayFunc(x) == displayFunc(data)
    })
        .transition()
    .style('background-color', function(d) {
        return bool ? color(displayFunc(d)) : 'white';
    })
}


function genDisplayFunc(x) {
    if (x == "health") {
        return function(d) {return d.h}
    } else if (x == "version") {
        return function(d) {return d.v}
    } else if (x == "buildtime") {
        return function(d) {return d.t}
    } else {
        return function(d) {return d.v}
    }
}


$("#health-button").click(function() {
    displayFunc = genDisplayFunc("health");
    update();
    $("#current").html("t")
});

$("#version-button").click(function() {
    displayFunc = genDisplayFunc("version");
    update();
    $("#current").html("v")
});
$("#buildtime-button").click(function() {
    displayFunc = genDisplayFunc("buildtime");
    update();
    $("#current").html("b")
});