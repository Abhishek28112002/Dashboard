import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "./App.css";
import Chart from "./Charts.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Delete from "./Assets//delete-icon.svg";
import Edit from "./Assets/task-edit-icon.svg";
import {
  Fetchgetapi,
  Fetchpostapi,
  Fetchputapi,
  Fetchdeleteapi,
} from "./services";
function App() {
  const [orginal_data, setorginal_data] = useState();
  const [newdata, setnewdata] = useState([]);
  const [search, setsearch] = useState("");
  const [modal, setmodal] = useState();
  const [title, settitle] = useState("");
  const [todoId, settodoId] = useState("");
  const [description, setdescription] = useState("");
  const DeleteTodo = async (todoId) => {
    const response = await Fetchdeleteapi(todoId);
    Logdata();
  };

  const EditTodo = async () => {
    const response = await Fetchputapi({
      _id: todoId,
      title: title,
      description: description,
    });
    setmodal(false);
    Logdata();
  };
  const dragItem = React.useRef(null);
  const dragOverItem = React.useRef(null);

  const handleSort = () => {
    let _TodoItems = [...orginal_data];
    const draggedItemContent = _TodoItems.splice(dragItem.current, 1)[0];
    _TodoItems.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setorginal_data(_TodoItems);
    setnewdata(_TodoItems);
    _TodoItems.map(async (item, index) => {
      item.todono = index + 1;
      const response = await Fetchputapi(item);
    });
  };

  const AddData = async () => {
    const data = {
      title: search,
      todono: orginal_data.length,
    };
    const response = await Fetchpostapi(data);

    Logdata();
    if (response.status == 200) window.alert("Data Added");
    else window.alert(response.error);
  };

  const handlechange = (e) => {
    setsearch(e.target.value);
    let updateddata = orginal_data.filter((data) => {
      return data.title
        ? data.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !=
            -1 ||
            data.date.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1
        : 1;
    });

    setnewdata(updateddata);
  };
  const Logdata = async () => {
    let response = await Fetchgetapi();

    response = response ? response : [];
    response.sort(function (a, b) {
      return a.todono > b.todono ? 1 : -1;
    });
    setorginal_data(response);
    setnewdata(response);
  };
  useEffect(() => {
    Logdata();
  }, []);

  return (
    <div className="main-wrapper">
      <header>
        <h2 className="heading" id="dashboard" style={{ color: "#001623" }}>
          Abhishek Mittal
        </h2>

        <h2 style={{ color: "#001623" }}>Visualization Dashboard</h2>
      </header>
      <main>
        <div className="recent-grid" style={{ marginTop: "-60px" }}>
          <div className="projects">
            <Chart />
            <div className="card">
              <div className="card-header">
                <h3 className="heading"> Dashboard</h3>
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="text"
                    placeholder="Type..."
                    style={{
                      margin: "2px",
                      padding: "6px",
                      border: "none",
                    }}
                    onChange={(e) => {
                      handlechange(e);
                    }}
                  />
                  <Button onClick={() => AddData()}>Add</Button>
                </div>
                <h3 style={{ color: "white" }}>{newdata.length}</h3>
              </div>
              <div className="card-body">
                <div className="table-responsive grid-container">
                  {newdata.map((data, index) => {
                    return (
                      <div
                        key={data._id}
                        draggable
                        onDragStart={(e) => (dragItem.current = index)}
                        onDragEnter={(e) => (dragOverItem.current = index)}
                        onDragEnd={handleSort}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        <Card
                          className="grid-item"
                          style={{
                            width: "13rem",
                            display: "flex",
                            flexDirection: "row",
                            cursor: "-webkit-grab",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                              margin: "5px 0 0 5px",
                            }}
                          >
                            <img
                              src={Delete}
                              style={{ width: "1rem", cursor: "pointer" }}
                              onClick={() => DeleteTodo(data._id)}
                            />
                            <img
                              src={Edit}
                              style={{ width: "1rem", cursor: "pointer" }}
                              onClick={() => {
                                settodoId(data._id);
                                settitle(data.title);
                                setdescription(data.description);
                                setmodal(true);
                              }}
                            />
                          </div>
                          <div>
                            <Card.Body>
                              <Card.Title>
                                <h6 style={{ fontWeight: "bold" }}>
                                  {data.title}
                                </h6>
                              </Card.Title>
                              <h6>{data.description}</h6>
                              <p
                                style={{
                                  fontSize: "15px",
                                  marginTop: "2px",
                                  float: "right",
                                  marginBottom: "-2px",
                                }}
                              >
                                {data.date.split(".")[0]}
                              </p>
                            </Card.Body>
                          </div>
                        </Card>
                      </div>
                    );
                  })}
                </div>
                {modal && (
                  <div
                    style={{
                      width: "100%",
                      zIndex: "99",
                      position: "absolute",
                      top: "100px",
                      margin: "auto",
                      float: "center",
                      alignItems: "center",
                      margin: "auto",
                    }}
                  >
                    <div
                      style={{
                        width: "200px",
                        height: "200px",
                        margin: "auto",
                        backgroundColor: "white",
                        border: "2px solid crimson",
                        borderRadius: "20px",
                        padding: "10px",
                      }}
                    >
                      <h6>
                        Title:
                        <input
                          type="text"
                          style={{
                            marginRight: "2px",
                            padding: "5px",
                            border: "1px solid crimson",
                          }}
                          value={title}
                          onChange={(e) => {
                            settitle(e.target.value);
                          }}
                        />
                      </h6>
                      <h6>
                        Description:
                        <input
                          type="text"
                          style={{
                            marginRight: "4px",
                            padding: "4px",
                            border: "1px solid crimson",
                          }}
                          value={description}
                          onChange={(e) => {
                            setdescription(e.target.value);
                          }}
                        />
                      </h6>
                      <Button
                        style={{
                          marginRight: "4px",
                          padding: "4px 8px",
                          border: "1px solid crimson",
                          backgroundColor: "green",
                          borderRadius: "10px",
                        }}
                        onClick={() => EditTodo()}
                      >
                        Save
                      </Button>
                      <Button
                        style={{
                          marginRight: "4px",
                          padding: "4px",
                          borderRadius: "10px",
                          border: "1px solid crimson",
                        }}
                        onClick={() => setmodal(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
