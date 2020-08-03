import React, { Component } from "react";
import { Row, Typography } from "antd";
import BookingForm from "./Containers/BookingForm";
import { BrowserRouter as Router } from "react-router-dom";

const { Title } = Typography;

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Row type="flex" justify="center" style={{ marginTop: "100px" }}>
          <Title style={{ color: "#5d6ba0" }}>
            Search hundereds of travel sites at once.
          </Title>
          <BookingForm />
        </Row>
      </Router>
    );
  }
}
export default App;
