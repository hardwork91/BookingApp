/* Result components displays the posible booking list resulting from calling the API
 */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Typography, Icon, Collapse, Row, Skeleton } from "antd";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const Result = props => {
  const { results, isLoading } = props;

  const containerStyle = {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    marginTop: 10,
    borderRadius: 5,
    boxShadow: "0px 3px 10px 0px rgba(0, 0, 0, 0.1)",
  };

  return (
    <Fragment>
      {/* render the results of the booking search when is not loading */}
      {!isLoading && results && results.length > 0 && (
        <div style={containerStyle}>
          <Title level={3} style={{ color: "#0c8bd0", fontWeight: "lighter" }}>
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
      )}
       {/* render an skeleton while loading */}
      {isLoading && (
        <div style={containerStyle}>
          <Skeleton active />
        </div>
      )}
    </Fragment>
  );
};

// prop types validation
Result.propTypes = {
  results: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
};

export default Result;
