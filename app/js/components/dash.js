import d3 from 'd3';

// sselector "#container"
export default (sselector) => {
  var $ = require("jquery");
  const _ = require('lodash');

  // States
  var d3Data,
    table,
    thead,
    tbody,
    ident = function(x) {return x;},
    displayFunc = genDisplayFunc(),
    smallerCells = null,
    cells = null,
    rows = null,
    color = d3.scale.category20();


  function selectSameValue(data, bool) {
    smallerCells.filter((x) => displayFunc(x) == displayFunc(data))
      .transition()
      .style('background-color', (d) => bool ? color(displayFunc(d)) : 'white')
  }

  function update(data = d3Data) {
    if (cells) {
      cells.remove()
    }
    rows = tbody.selectAll("tr")
      .data(data);

    rows.enter()
      .append("tr");

    cells = rows.selectAll("td")
      .data(function(x){return x.values});

    cells.enter()
      .append("td")
      .classed("abc", true)

    smallerCells = cells.selectAll('div')
      .data((x) => x.values)

    smallerCells.enter()
      .append('div')
      .on("mouseover", function(d) {
        selectSameValue(d, true)
      })
      .on("mouseout",  function(d) {
        selectSameValue(d, false)
      })
      .text((x) => `${x.i}: ${displayFunc(x)}`);

    smallerCells.exit()
      .remove()

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

  var get_service = function(d) { return d && d.s; };

  // Extract data from a key-value object.
  // Prepend the key so it is the first item in the values array.
  var extract_row_data = function(d) {
    var values = d.value.slice();
    // Prepend the key
    values.unshift(d.key);
    return values;

  };

  $("#health-button").click(function() {
    displayFunc = genDisplayFunc("health");
    update();
    $("#current").html("Health")
  });

  $("#version-button").click(function() {
    displayFunc = genDisplayFunc("version");
    update();
    $("#current").html("Version")
  });
  $("#buildtime-button").click(function() {
    displayFunc = genDisplayFunc("buildtime");
    update();
    $("#current").html("Build time")
  });

  return {
    clusters: [],
    services: [],
    init(data) {
    this.services = _.uniq(_.map(data.data, x=> x.s));
    this.clusters = _.uniq(_.map(data.data, x=> x.c));
      d3Data = d3.nest()
        .key(function(d){return d.s})
        .key(function(d){return d.c})
        .entries(data.data);

      table = d3.select(sselector)
        .append("table")
        .style("border-collapse", "collapse")
        .style("border", "2px black solid");
      thead = table.append("thead");
      tbody = table.append("tbody");
      ident = function(x) {return x;};
      displayFunc = genDisplayFunc();
      cells = null;
      rows = null;
      color = d3.scale.category20();

    },
    update: update,
    test() {
      console.log(d3Data, this);
    }
  }
}