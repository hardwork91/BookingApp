import React, { Component } from "react";
import axios from "axios";
import { Select, Icon, Tooltip } from "antd";

const { Option } = Select;

let timeout;
let currentValue;

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    console.log("value", value);
    axios
      .get(
        `https://www.kayak.com/mv/marvel?f=j&where=${value}&s=13&lc_cc=SP&lc=en&v=v1&cv=5`
      )
      .then(result => {
        console.log(result);
        if (currentValue === value) {
          const data = [];
          const mockedData = [
            { apicode: 1, displayname: "A" },
            { apicode: 2, displayname: "B" },
            { apicode: 3, displayname: "C" },
          ];
          mockedData.forEach(({ apicode, displayname }) => {
            // result.data.forEach(({ apicode, displayname }) => {
            data.push({
              value: apicode,
              text: displayname,
            });
          });
          callback(data);
        }
      });
    // const str = querystring.encode({
    //   code: "utf-8",
    //   q: value,
    // });
    // jsonp(`https://suggest.taobao.com/sug?${str}`)
    //   .then(response => response.json())
    //   .then(d => {
    //     if (currentValue === value) {
    //       const { result } = d;
    //       const data = [];
    //       result.forEach(r => {
    //         data.push({
    //           value: r[0],
    //           text: r[0],
    //         });
    //       });
    //       callback(data);
    //     }
    //   });

    // remove after
    callback([
      { value: 1, text: "A" },
      { value: 2, text: "B" },
      { value: 3, text: "C" },
    ]);
  }

  timeout = setTimeout(fake, 300);
}

export default class AirfieldSearcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: props.value,
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

  handleChange = value => {
    this.setState(
      { value },
      this.props.onChange([{ value: 1, text: "aaaaaaaaa" }])
    );
  };

  render() {
    const { value: initialValue } = this.props;
    const { data, value, noMatchingAirfield } = this.state;

    const options = data.map(d => <Option key={d.value}>{d.text}</Option>);

    return (
      <Tooltip title="Search for an airfield" mouseEnterDelay={1}>
        <Select
          style={{ minWidth: "250px" }}
          showSearch
          value={value}
          mode="multiple"
          placeholder={this.props.placeholder}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={this.handleSearch}
          onChange={this.handleChange}
          notFoundContent={
            noMatchingAirfield ? "Please enter a valid airfild name!" : null
          }
        >
          {options}
        </Select>
      </Tooltip>
    );
  }
}
