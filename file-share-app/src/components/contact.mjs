import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Contact = (props) => {
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const lastNameChange = (e) => {
        console.log(e.target.value);

        setLastName(e.target.value);
    }
    const firstNameChange = (e) => {
        console.log(e.target.value);

        setFirstName(e.target.value);
    }
    const emailChange = (e) => {
        console.log(e.target.value);

        setEmail(e.target.value);
    }
    const messageChange = (e) => {
        console.log(e.target.value);

        setMessage(e.target.value);
    }
    const submitContact = () => {
        const data = { lastName: lastName, firstName: firstName, email: email, message: message };
        console.log("submit contact", data);
        // app post data to server.
        fetch(props.serverUrl + "contact",
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((resp) => resp.json())
            .then((data) => {
                console.log("RESP", data);
            })
    }
    return (<div>

        <p>
            <input type='text' value={lastName} onChange={lastNameChange} placeholder='Last Name' />

        </p>
        <p>
            <input type='text' value={firstName} onChange={firstNameChange} placeholder='First Name' />

        </p>
        <p>
            <input type='text' value={email} onChange={emailChange} placeholder='Email' />

        </p>
        <p>
            <input type='text' value={message} onChange={messageChange} placeholder='Message' />

        </p>
        <p>
            <button className='btn btn-primary' onClick={submitContact}>Submit</button>
        </p>
    </div>);
}

export default Contact;