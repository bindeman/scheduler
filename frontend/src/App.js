import React from 'react';
import './App.css';
import Dashboard from './Dashboard'
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from "@material-ui/core/CssBaseline";

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
    palette: {
        primary: {
            main: '#fff',
        },
    },
    props: {
        MuiTooltip: {
            enterTouchDelay: 0,
            leaveTouchDelay: 2700,
        },
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': "Open Sans",
            },

        },
        MuiTooltip: {
            tooltip: {
                fontSize: "12px",
                fontWeight: 600,
                boxShadow: " 0 0 20px rgba(0,0,0,0.30)",
                backgroundColor: "#1C5100",
                borderRadius: "6px",
                padding: "10px",
                minWidth: "75px",
                maxWidth: "150px",
            },
            arrow: {
                color: "#1C5100",
            }
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
