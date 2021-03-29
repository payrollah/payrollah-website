import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppNavigatorAuthenticated from "../AppNavigatorAuthenticated/AppNavigatorAuthenticated";
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

const theme = createMuiTheme({
  overrides: {
    MuiTextField: {
      root: {
        marginTop: "0.75rem",
        marginBottom: "0.75rem",
      },
    },
    MuiFormControl: {
      root: {
        marginTop: "0.75rem",
        marginBottom: "0.75rem",
      },
    },
  },
});

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <AppNavigatorAuthenticated />
          </MuiPickersUtilsProvider>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
