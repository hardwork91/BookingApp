import React, { Component } from "react";
import { Row, Typography } from "antd";
import BookingForm from "./Containers/BookingForm";
import { BrowserRouter as Router } from "react-router-dom";

const { Title } = Typography;

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <Row type="flex" justify="center" style={{ marginTop: 100 }}>
            <Title style={{ color: "#0c8bd0", fontWeight: "lighter" }}>
              Search hundreds of flight sites at once.
            </Title>
          </Row>
          <Row type="flex" justify="center">
            <BookingForm />
          </Row>
        </div>
      </Router>
    );
  }
}
export default App;
