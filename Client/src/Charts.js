import React,{useState,useEffect} from "react";
import "./Chart.css";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

const Chart = () => {
const[orginal_data, setorginal_data]= useState()

useEffect(() => {
  const logdata = async () => {
    const response = await fetch("api/get");
    const data = await response.json();
    console.log(data);
    setorginal_data(data);
  };
  logdata();
}, []);
console.log(orginal_data);
const data1=orginal_data.map((obj)=>{
    const container = {};
   container["intensity"] = obj.intensity;
    
    container.pestle = obj.pestle;
    return container;
 });
 const data = {};
 for(let i = 0; i < data1.length; i++){
  if(data1[i].pestle !==undefined && data1[i].pestle!="")
    data[data1[i].pestle] = (data[data1[i].pestle] || 0) + data1[i].intensity;
 };
 console.log(data)
// {
//     data2.forEach(function(value, key){
//         data[key] = value
//     });
//   }
  return (
       <div className="body">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="users"
            isAnimationActive={false}
            data={data}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </div> 
   
  );
};

export default Chart;