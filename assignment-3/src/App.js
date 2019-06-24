/*********************************************************************************
*  WEB422 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  
*  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.*
*  Name:  _Saihong Xiao__ Student ID: _140777178__ Date: __2019/06/17____
* ********************************************************************************/ 


import React from "react";
import { Row } from "react-bootstrap";
import "./App.css";
import TeamCards from "./components/TeamCards.js";
import Header from "./components/Header.js";

function App() {
  return (
    <div className="App">
      <nav>
        <Header />
      </nav>
      <div id="teams-cards">
        <Row>
          <TeamCards />
        </Row>
      </div>
    </div>
  );
}

export default App;
