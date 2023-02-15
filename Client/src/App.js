import React, { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [orginal_data, setorginal_data] = useState();
  const [newdata, setnewdata] = useState([]);
  const [filter, setfilter] = useState([
    {
      end_year: "",
      topic: "",
      sector: "",
      pestle: "",
      region: "",
      source: "",
      country: "",
      intensity: "",
    },
  ]);
  const handlechange = (e, obj) => {
    let newArr = [...filter];

    newArr[0][obj] = e.target.value;
    setfilter(newArr);
    let updateddata = orginal_data.filter((data) => {
      return filter[0]["end_year"] ? filter[0]["end_year"]==data.end_year : 1;
    });
    updateddata = updateddata.filter((data) => {
      return filter[0]["topic"]
        ? data.topic.toLowerCase().indexOf(filter[0]["topic"]) != -1
        : 1;
    });
    updateddata = updateddata.filter((data) => {
      return filter[0]["sector"]
        ? data.sector.toLowerCase().indexOf(filter[0]["sector"]) != -1
        : 1;
    });
    updateddata = updateddata.filter((data) => {
      return filter[0]["pestle"]
        ? data.pestle.toLowerCase().indexOf(filter[0]["pestle"]) != -1
        : 1;
    });
    updateddata = updateddata.filter((data) => {
      return filter[0]["region"]
        ? data.region.toLowerCase().indexOf(filter[0]["region"]) != -1
        : 1;
    });

    updateddata = updateddata.filter((data) => {
      return filter[0]["source"]
        ? data.source.toLowerCase().indexOf(filter[0]["source"]) != -1
        : 1;
    });
    updateddata = updateddata.filter((data) => {
      return filter[0]["country"]
        ? data.country.toLowerCase().indexOf(filter[0]["country"]) != -1
        : 1;
    });
    updateddata = updateddata.filter((data) => {
      return filter[0]["intensity"]
        ? filter[0]["intensity"] == data.intensity
        : 1;
    });
    setnewdata(updateddata);
  };

  useEffect(() => {
    const logdata = async () => {
      const response = await fetch("api/get");
      const data = await response.json();
      console.log(data);
      setorginal_data(data);
      setnewdata(data);
    };
   logdata();
   
  }, []);

  return (
    <div className="App">
      <div className="sidebar">
        <div className="sidebar-menu">
          <ul>
            <li>
              <div>
                <span style={{ color: "white" }}>End Year</span>

                <input
                  className="input-group"
                  type="number"
                  value={filter[0]["end_year"]}
                  onChange={(e) => handlechange(e, "end_year")}
                ></input>
              </div>
            </li>
            <li>
              <div>
                <span style={{ color: "white" }}>Topics</span>

                <input
                  className="input-group"
                  type="text"
                  onChange={(e) => handlechange(e, "topic")}
                  value={filter[0]["topic"]}
                ></input>
              </div>
            </li>
            <li>
              <div>
                <span style={{ color: "white" }}>Sector</span>

                <input
                  className="input-group"
                  type="text"
                  onChange={(e) => handlechange(e, "sector")}
                  value={filter[0]["sector"]}
                ></input>
              </div>
            </li>
            <li>
              <div>
                <span style={{ color: "white" }}>Region</span>

                <input
                  className="input-group"
                  type="text"
                  onChange={(e) => handlechange(e, "region")}
                  value={filter[0]["region"]}
                ></input>
              </div>
            </li>
            <li>
              <div>
                <span style={{ color: "white" }}>PEST</span>

                <input
                  className="input-group"
                  type="text"
                  onChange={(e) => handlechange(e, "pestle")}
                  value={filter[0]["pestle"]}
                ></input>
              </div>
            </li>
            <li>
              <div>
                <span style={{ color: "white" }}>Source</span>

                <input
                  className="input-group"
                  type="text"
                  onChange={(e) => handlechange(e, "source")}
                  value={filter[0]["source"]}
                ></input>
              </div>
            </li>
            <li>
              <div>
                <span style={{ color: "white" }}>Country</span>

                <input
                  className="input-group"
                  type="text"
                  onChange={(e) => handlechange(e, "country")}
                  value={filter[0]["country"]}
                ></input>
              </div>
            </li>
            <li>
              <div>
                <span style={{ color: "white" }}>Intensity</span>

                <input
                  className="input-group"
                  type="number"
                  onChange={(e) => handlechange(e, "intensity")}
                  value={filter[0]["intensity"]}
                ></input>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="main-wrapper">
        <div className="main-content">
          <header>
            <h2 className="heading" id="dashboard">
              Abhishek Mittal
            </h2>
            <h2>Visualization Dashboard</h2>
          </header>
          <main>
            <div className="recent-grid" style={{ marginTop: "-60px" }}>
              <div className="projects">
                <div className="card">
                  <div className="card-header">
                    <h3 className="heading">Data Visualization Dashboard</h3>
                    <h3>{newdata.length}</h3>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table width="100%">
                        <thead>
                          <tr>
                            <td>Intensity</td>
                            <td>Likelihood</td>
                            <td>Relevance</td>
                            <td>Sector</td>
                            <td>Pestle</td>
                            <td>Topics</td>
                            <td>Region</td>
                            <td>Source </td>
                          </tr>
                        </thead>
                        <tbody>
                          {newdata.map((data, index) => {
                            return (
                              <tr key={index}>
                                <td>{data.intensity}</td>
                                <td>{data.likelihood}</td>
                                <td>{data.relevance}</td>
                                <td>{data.sector}</td>
                                <td>{data.pestle}</td>
                                <td>{data.topic}</td>
                                <td>{data.region}</td>
                                <td>{data.source}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
}

export default App;
