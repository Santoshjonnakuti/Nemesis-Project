import React, { useState } from "react";
import axios from "axios";
import "./Row.scss";

export default function Row(props) {
    const [isEditing, setisEditing] = useState(props.addUser || false)
    const [buttonEdit, setButtonEdit] = useState("Edit");
    const [name, setName] = useState(props.user.name);
    const [username, setUsername] = useState(props.user.username);
    const [email, setEmail] = useState(props.user.email);
    const [phone, setPhone] = useState(props.user.phone);
    const [website, setWebsite] = useState(props.user.website);
    const [isDeleted, setisDeleted] = useState(false);
    const editRow = async() => {
        if(isEditing) {
            const response = await axios.patch('https://jsonplaceholder.typicode.com/users/' + props.index, {
                method: 'PATCH',
                body: JSON.stringify({
                  id: props.index,
                  name,
                  username,
                  email,
                  phone,
                  website,
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
            });
            console.log(response);
            if(response.status === 200) {
                setisEditing(false);
                setButtonEdit("Edit");
            }
        }
        else {
            setisEditing(true);
            setButtonEdit("Update");
        }
    }
    const inputChangeHandler = (setFunction, setValue) => {
        setFunction(setValue)
    }
    const deleteRow = async() => {
        const response = await axios.delete("https://jsonplaceholder.typicode.com/users/"+props.index, {
            method:"DELETE"
        });
        console.log(response);
        if(response.status === 200) {
            setisDeleted(true);
        }
    }
    return(
        isEditing ? 
        <tr className="border-class-hover">
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
            <td className="button">
                <button onClick={editRow} className="edit-update-button"><i className="fa fa-edit"></i>{buttonEdit}</button>
            </td>
            <td className="button">
                <button onClick={deleteRow} className="delete-button"><i className="fa fa-trash"></i>Delete</button>
            </td>
        </tr>
        :
        isDeleted ?
        <></>
        :
        <tr className="border-class-hover">
            <td className="border-class">
                {name}
            </td>
            <td className="border-class">
                {username}
            </td>
            <td className="border-class">
                {email}
            </td>
            <td className="border-class">
                {phone}
            </td>
            <td className="border-class">
                {website}
            </td>
            <td className="button">
                <button onClick={editRow} className="edit-update-button"><i className="fa fa-edit"></i>{buttonEdit}</button>
            </td>
            <td className="button">
                <button onClick={deleteRow} className="delete-button"><i className="fa fa-trash"></i>Delete</button>
            </td>
        </tr>
    )
}
