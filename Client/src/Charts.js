import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import {
  Fetchgetapi,
  Fetchpostapi,
  Fetchputapi,
  Fetchdeleteapi,
} from "./services";
function TodoChart() {
  const[todos,settodos]=useState([]);
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
    // Step 2: Parse the data
    const data = todos.map((todo) => ({
      date: new Date(todo.date),
      title:todo.title,
      count: +1,
    }));

    // Step 3: Group the todos by date
    const groupedData = d3.group(data, (d) => d.date.toDateString());

    // Step 4: Aggregate the data
    const aggregatedData = Array.from(groupedData, ([key, values]) => ({
      date: new Date(key),
      count: d3.sum(values, (v) => v.count),
    }));
   
    // Step 5: Create a chart
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const arc = d3.arc().outerRadius(radius - 10).innerRadius(0);

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
//   useEffect(() => {
//     // Step 2: Parse the data
//     console.log(todos)
//     const data = todos.map((todo) => ({
//       date: new Date(todo.date),
//       title: todo.title,
//       count: +1,
//     }));
// console.log("d",data)
//     // Step 3: Group the todos by date and title
//     const groupedData = d3.group(
//       data,
//       (d) => d.date.toDateString(),
//       (d) => d.title
//     );

//     // Step 4: Aggregate the data
//     const aggregatedData = Array.from(groupedData, ([dateKey, dateValues]) => ({
//       date: new Date(dateKey),
//       values: Array.from(dateValues, ([titleKey, titleValues]) => ({
//         title: titleKey,
//         count: d3.sum(titleValues, (v) => v.count),
//       })),
//     }));
//     console.log(aggregatedData);
//     console.log(aggregatedData[1]);
//     // Step 5: Create a chart
//     const width = 500;
//     const height = 500;
//     const radius = Math.min(width, height) / 2;

//     const color = d3.scaleOrdinal(d3.schemeCategory10);

//     const arc = d3.arc().outerRadius(radius - 10).innerRadius(0);

//     const pie = d3
//       .pie()
//       .sort(null)
//       .value((d) => d.count);

//     // Remove existing chart before rendering new chart
//     d3.select(chartRef.current).selectAll("*").remove();

//     const svg = d3
//       .select(chartRef.current)
//       .append("svg")
//       .attr("width", width)
//       .attr("height", height)
//       .append("g")
//       .attr("transform", `translate(${width / 2},${height / 2})`);

//     const g = svg
//       .selectAll(".arc")
//       .data(pie(aggregatedData[0].values))
//       .enter()
//       .append("g")
//       .attr("class", "arc");

//     g.append("path")
//       .attr("d", arc)
//       .style("fill", (d) => color(d.data.title));

//     g.append("text")
//       .attr("transform", (d) => `translate(${arc.centroid(d)})`)
//       .attr("dy", "0.35em")
//       .text((d) => d.data.title);

//     // Create a second chart for title-based data
//     const chartRef2 = d3.select("#chart2");

//     const svg2 = chartRef2
//       .append("svg")
//       .attr("width", width)
//       .attr("height", height)
//       .append("g")
//       .attr("transform", `translate(${width / 2},${height / 2})`);

//     const g2 = svg2
//       .selectAll(".arc")
//       .data(pie(aggregatedData[1].values))
//       .enter()
//       .append("g")
//       .attr("class", "arc");

//     g2.append("path")
//       .attr("d", arc)
//       .style("fill", (d) => color(d.data.title));

//     g2.append("text")
//       .attr("transform", (d) => `translate(${arc.centroid(d)})`)
//       .attr("dy", "0.35em")
//       .text((d) => d.data.title);
//   }, [todos]);

//   return (
//     <>
//       <div ref={chartRef}></div>
     
      
//       <div id="chart2"/>
// </>
// );
}


export default TodoChart;
