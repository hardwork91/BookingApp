import React, { Component } from "react";
import { Row } from "antd";
import BookingForm from "./Containers/BookingForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Row type="flex" justify="center" style={{ marginTop: "100px" }}>
          <BookingForm />
        </Row>
      </Router>
    );
  }
}
export default App;
