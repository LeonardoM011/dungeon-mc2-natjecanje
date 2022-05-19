const React = require('react');
const ReactDOM = require('react-dom');
import {Grid, Button, TextField, FormControl, InputAdornment, Input} from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {AccountCircle, Lock, Email} from "@mui/icons-material";
import {BrowserRouter, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import "./rooms.css";


function Rooms() {
    let navigate = useNavigate();
    const routeChange = () =>{
        let path = `/index`;
        navigate(path);
    }
    const [username, setUsername] = useState("");

    useEffect(() => {
        fetch("/auth/get-username", {})
            .then(function(response) {
                return response.text();
            })
            .then(function(text) {
                // <!DOCTYPE ....
                let txt = JSON.parse(text);
                txt = txt["username"];
                setUsername(txt);
            });
        }, []);



    return (
        <>
            <header>
                <h2>Dobrodošao <span className={"spanuser"}>{username}</span>!</h2>
                <h3 onClick={event =>  window.location.href='/logout'}>Izlogiraj se</h3>
            </header>
            <div id={"wrapper"}>
                <h1>Soba 1</h1>
                <img src={"roomThumbnail.png"} width={450} height={300} onClick={event =>  window.location.href='/index'}>

                </img>
            </div>
        </>
    );
}

ReactDOM.render(

    <React.StrictMode>
        <BrowserRouter>
            <Rooms />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('react')
)