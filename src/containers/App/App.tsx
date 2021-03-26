import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppNavigatorAuthenticated from "../AppNavigatorAuthenticated/AppNavigatorAuthenticated";
import "./App.css";

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AppNavigatorAuthenticated />
      </BrowserRouter>
    </div>
  );
};

export default App;
