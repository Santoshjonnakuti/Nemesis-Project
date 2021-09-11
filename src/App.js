import './App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from './components/Table/Table';
import "bootstrap/dist/css/bootstrap.css";

function App() {

  const [users, setUsers] = useState([]);
  const fetchData = async() => {
    const data = await axios.get("https://jsonplaceholder.typicode.com/users", {
      method:"GET",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    setUsers(data.data);
  }

  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div className="App">
      <h1>Table of Users</h1>
      <Table users={users} />
    </div>
  );
}

export default App;
