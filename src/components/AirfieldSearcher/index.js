import React, { Component } from "react";
import { Select, Icon, Tooltip, Divider, Typography } from "antd";
import airfields from "../../lib/api/airfields";
import { MAX_AIRPORT_ALLOWED } from "./constants";
import { mergeData } from "./utils";
import { TOOLTIP_DELAY } from "../../Containers/BookingForm/constants";

const { Option } = Select;
const { Text } = Typography;

let timeout;
let currentValue;

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    airfields.search(value).then(result => {
      if (currentValue === value) {
        const data = [];
        result.data &&
          result.data.length &&
          result.data.forEach(
            ({ ap, apicode, shortdisplayname, displayname }) => {
              data.push({
                ap,
                apicode,
                shortdisplayname,
                displayname,
              });
            }
          );
        callback(data);
      }
    });
  }

  timeout = setTimeout(fake, 300);
}

export default class AirfieldSearcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      noMatchingAirfield: false,
    };
  }

  handleSearch = value => {
    if (value) {
      fetch(value, data => this.setState({ data }));
    } else {
      this.setState({ data: [] });
    }
  };

  hanldeSelect = option => {
    const { setSelectedData } = this.props;
    const element = this.state.data.find(({ apicode }) => apicode === option);
    this.setState({ data: [] }, setSelectedData(element));
  };

  hanldeDeselect = option => {
    const { clearSelectedData } = this.props;
    this.setState({ data: [] }, clearSelectedData(option));
  };

  handleChange = selectedOptions => {
    this.props.onChange(selectedOptions);
  };

  render() {
    const { value, placeholder, selectedData } = this.props;
    const { data, noMatchingAirfield } = this.state;

    const valueLength = value.length;

    const options = mergeData(selectedData, data).map(
      ({ ap, apicode, shortdisplayname, displayname }) => {
        return (
          <Option
            key={apicode}
            value={apicode}
            shortdisplayname={shortdisplayname}
            ap={ap}
            disabled={
              valueLength === MAX_AIRPORT_ALLOWED && !value.includes(apicode)
            }
          >
            {displayname}
          </Option>
        );
      }
    );

    return (
      <Tooltip title="Search for an airfield" mouseEnterDelay={TOOLTIP_DELAY}>
        <Select
          style={{ minWidth: "250px" }}
          showSearch
          value={value}
          mode="multiple"
          placeholder={placeholder}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={this.handleSearch}
          onChange={this.handleChange}
          onSelect={this.hanldeSelect}
          onDeselect={this.hanldeDeselect}
          notFoundContent={
            noMatchingAirfield ? "Please enter a valid airfild name!" : null
          }
          optionLabelProp={valueLength > 1 ? "ap" : "shortdisplayname"}
          dropdownRender={menu => (
            <div>
              {menu}
              {valueLength === MAX_AIRPORT_ALLOWED && (
                <div style={{ marginBottom: "5px" }}>
                  <Divider style={{ margin: "5px 0" }} />
                  <Text strong style={{ marginLeft: "10px" }}>
                    {`Maximun ${MAX_AIRPORT_ALLOWED} airports`}
                  </Text>
                </div>
              )}
            </div>
          )}
        >
          {options}
        </Select>
      </Tooltip>
    );
  }
}
