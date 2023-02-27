import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import {
  Fetchgetapi,
  Fetchpostapi,
  Fetchputapi,
  Fetchdeleteapi,
} from "./services";
function TodoChart() {
  const [todos, settodos] = useState([]);
  const Logdata = async () => {
    let response = await Fetchgetapi();

    response = response ? response : [];

    settodos(response);
  };
  useEffect(() => {
    Logdata();
  }, []);

  const chartRef = useRef();

  useEffect(() => {
    const data = todos.map((todo) => ({
      date: new Date(todo.date),
      title: todo.title,
      count: +1,
    }));

    const groupedData = d3.group(data, (d) => d.date.toDateString());

    const aggregatedData = Array.from(groupedData, ([key, values]) => ({
      date: new Date(key),
      count: d3.sum(values, (v) => v.count),
    }));

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.count);
    d3.select(chartRef.current).selectAll("*").remove();
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const g = svg
      .selectAll(".arc")
      .data(pie(aggregatedData))
      .enter()
      .append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", (d) => color(d.data.date.toDateString()));

    g.append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("dy", "0.35em")
      .text((d) => d.data.date.toDateString());
  }, [todos]);

  return <div ref={chartRef}></div>;
}

export default TodoChart;
