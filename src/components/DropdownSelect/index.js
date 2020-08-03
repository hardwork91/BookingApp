import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Menu, Dropdown, Tooltip } from "antd";
import { TOOLTIP_DELAY } from "../../Containers/BookingForm/constants";

export default class DropdownSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  handleSelect = ({ key }) => {
    const { onChange, handleClearResults } = this.props;
    this.setState({ value: key }, () => {
      onChange(key);
      handleClearResults();
    });
  };

  renderMenu = () => (
    <Menu selectedKeys={this.state.value} onClick={this.handleSelect}>
      {this.props.options.map(option => (
        <Menu.Item key={option}>{option}</Menu.Item>
      ))}
    </Menu>
  );

  render() {
    const { disabled, title } = this.props;
    return (
      <Tooltip title={title} mouseEnterDelay={TOOLTIP_DELAY}>
        <Dropdown
          overlay={this.renderMenu()}
          trigger={["click"]}
          disabled={disabled}
        >
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {this.state.value} <Icon type="down" />
          </a>
        </Dropdown>
      </Tooltip>
    );
  }
}

DropdownSelect.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  handleClearResults: PropTypes.func.isRequired,
};
