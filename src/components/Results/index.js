import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Typography, Icon, Collapse, Row } from "antd";

const { Title, Text } = Typography;
const { Panel } = Collapse;

export default class Result extends Component {
  render() {
    const { results } = this.props;
    return (
      <Fragment>
        <div
          style={{
            background: "linear-gradient(135deg, #f1e2e2 0%, #c2ceec 100%)",
            width: "100%",
            padding: "20px",
            marginTop: "15px",
            borderRadius: "3px",
          }}
        >
          <Title level={3} style={{ color: "#5d6ba0" }}>
            Results goes here
          </Title>
          <Text>
            The results should be provided by a real API
            <Icon type="api" />
          </Text>
          <Collapse bordered={false} style={{ backgroundColor: " #f0f8ff00" }}>
            <Panel
              style={{ border: "none" }}
              header="Instead, you can see here the fake data returned by the mocked API"
              key="1"
            >
              {results.map(({ id, label }) => (
                <Row key={id}>
                  <Text>{label}</Text>
                </Row>
              ))}
            </Panel>
          </Collapse>
        </div>
      </Fragment>
    );
  }
}

Result.propTypes = { results: PropTypes.array.isRequired };
