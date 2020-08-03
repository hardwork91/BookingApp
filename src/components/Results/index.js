/* Result components displays the posible booking list resulting from calling the API
 */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Typography, Icon, Collapse, Row } from "antd";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const Result = props => {
  const { results } = props;
  return (
    <Fragment>
      <div
        style={{
          background: "linear-gradient(135deg, #f1e2e2 0%, #c2ceec 100%)",
          width: "100%",
          padding: "20px",
          marginTop: "15px",
          borderRadius: "3px",
          boxShadow: "0px 3px 10px 0px rgba(0, 0, 0, 0.1)",
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
            header={
              <Text>
                Instead, you can see here the fake data returned by the mocked
                API
              </Text>
            }
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
};

// prop types validation
Result.propTypes = { results: PropTypes.array.isRequired };

export default Result;
