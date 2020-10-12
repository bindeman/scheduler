import React from 'react';
import './App.css';
import Dashboard from './Dashboard'
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from "@material-ui/core/CssBaseline";
import Events from "./Events";
import {Switch, Route, Link} from "react-router-dom";
import Chart from "./Chart";

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Open Sans, Helvetica, Arial',
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 700,
        },
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': "Open Sans",
            },

        },

    },
});

function App() {
  return (
    <div className="App">
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
      <Dashboard />


        </MuiThemeProvider>
    </div>
  );
}

export default App;
