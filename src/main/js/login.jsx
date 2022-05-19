import {AccountCircle, Lock} from "@mui/icons-material";
import {BrowserRouter, useNavigate} from "react-router-dom";

const React = require('react');
import {Grid, Button, TextField, FormControl, InputAdornment, Input} from '@material-ui/core';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SendIcon from '@mui/icons-material/Send';
const ReactDOM = require('react-dom');
import "./login.css";
import {useEffect, useState} from "react";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [wrongPassword, setWrongPassword] = useState("");
    const [textError, setTextError] = useState(false);
    const [helperTextError, setHelperTextError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const postBody = JSON.stringify({
            username: username,
            password: password
        });
        fetch("/auth/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: postBody
        })
            .then(response => {
                if (response.status == 401) {
                    setWrongPassword("Krivo korisničko ime ili lozinka!");
                    setTextError(true);
                    setHelperTextError("Pokušajte ponovo");
                } else if (response.status == 200) {
                    navigate('/');
                    window.location.reload();
                }
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} id={"wrapper"}>
                <Grid item xs={12}>
                    <h1>Dungeon Scripter</h1>
                    <h3>Prijavite se</h3>
                    <p id="wrong">{wrongPassword}</p>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={textError}
                        helperText={helperTextError}
                        id="username"
                        label="Username"
                        autoComplete="current-username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={textError}
                        helperText={helperTextError}
                        id="password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button style={{backgroundColor: "rgb(102, 187, 106)"}} endIcon={<SendIcon />} variant="contained" type={"submit"}>Login</Button>
                </Grid>
                <Grid item xs={12} id={"divide"}>
                    <p>Nemate account, kreirajte ga:</p>
                    <Button style={{backgroundColor: "rgb(144, 202, 249)"}} endIcon={<ExitToAppIcon />} variant="contained" href="/register">Register</Button>
                </Grid>
            </Grid>
        </form>);
}

ReactDOM.render(

    <React.StrictMode>
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('react')
)