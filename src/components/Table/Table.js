import axios from "axios";
import React, { useState, useEffect } from "react";
import Row from "../Row/Row";
import "./Table.css";

function Table(props) {
    const [UsersData, setUsersData] = useState([]);
    const [addUser, setAddUser] = useState(false);
    const [add, setAdd] = useState("Add User");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    // eslint-disable-next-line
    const [isDeleted, setisDeleted] = useState(false);
    useEffect(() => {
        setUsersData(props.users);
    }, [props.users]);
    const makeTable = () => {
        const array = [];
        for(const user in UsersData) {
            array.push(
                <Row user = {UsersData[user]} key={user} index={user} UsersData={UsersData} setUsersData = {setUsersData} />
            )
        }
        return array;
    }
    const adduserFunc = async () => {
        if(add === "Finish") {
            const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                body: JSON.stringify({
                  name,
                  username,
                  email,
                  phone,
                  website
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
            });
            console.log(response);
            if(response.status === 201) {
                setAddUser(false);
                setAdd("Add User");
                setUsersData(UsersData.concat({name, username, email, phone, website}));
                setName("");
                setUsername("");
                setEmail("");
                setPhone("");
                setWebsite("");
            }
        }
        else {
            setAddUser(true);
            setisDeleted(false);
            setAdd("Finish");
        }
    }
    const inputChangeHandler = (setFunction, setValue) => {
        setFunction(setValue)
    }
    return(
        addUser ?
        <div>
            <table className="table table-hover">
                <thead>
                <tr className="border-class">
                    <th className="border-class">Name</th>
                    <th className="border-class">Username</th>
                    <th className="border-class">Email</th>
                    <th className="border-class">Phone</th>
                    <th className="border-class">Website</th>
                </tr>
                </thead>
                <tbody>
                {makeTable()}
                <tr className="border-class hover-effect">
                    <td className="border-class">
                        <input className="input-box-edit" type="text" value={name} 
                            onChange = {(e) => {
                                inputChangeHandler(setName, e.target.value);
                            }}
                        />
                    </td>
                    <td className="border-class">
                        <input className="input-box-edit" type="text" value={username} 
                            onChange = {(e) => {
                                inputChangeHandler(setUsername, e.target.value);
                            }}
                        />
                    </td>
                    <td className="border-class">
                        <input className="input-box-edit" type="text" value={email} 
                            onChange = {(e) => {
                                inputChangeHandler(setEmail, e.target.value);
                            }}
                        />
                    </td>
                    <td className="border-class">
                        <input className="input-box-edit" type="text" value={phone} 
                            onChange = {(e) => {
                                inputChangeHandler(setPhone, e.target.value);
                            }}
                        />
                    </td>
                    <td className="border-class">
                        <input className="input-box-edit" type="text" value={website} 
                            onChange = {(e) => {
                                inputChangeHandler(setWebsite, e.target.value);
                            }}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
            <button className="add-button" onClick={adduserFunc}>{add}</button>
        </div>
        :
        <div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th className="border-class">Name</th>
                    <th className="border-class">Username</th>
                    <th className="border-class">Email</th>
                    <th className="border-class">Phone</th>
                    <th className="border-class">Website</th>
                </tr>
                </thead>
                <tbody>
                    {makeTable()}
                </tbody>
            </table>
            <button className="add-button btn btn-primary" onClick={adduserFunc}>{add}</button>
        </div>
    )
}

export default Table;