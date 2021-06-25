import React from "react";
import { BrowserRouter, Route} from "react-router-dom";
import Home from "../pages/home";


const Router = () => {
    return (
      <BrowserRouter>
        <Route exact={true} path="/" component={Home} />
      </BrowserRouter>
    );
  };
  
  export default Router;