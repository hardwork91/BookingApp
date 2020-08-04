import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Select, Tooltip, Divider, Typography, Spin } from "antd";
import { MAX_AIRPORT_ALLOWED } from "./constants";
import { mergeData } from "./utils";
import { search, clear } from "./actions";
import { TOOLTIP_DELAY } from "../../Containers/BookingForm/constants";

const { Option } = Select;
const { Text } = Typography;

export class AirfieldSearcher extends Component {
  handleSearch = value => {
    if (value) {
      this.props.search(value);
    }
  };

  hanldeSelect = option => {
    const { setSelectedData, airfields } = this.props;
    const element = airfields.find(({ apicode }) => apicode === option);
    setSelectedData(element);
  };

  hanldeDeselect = option => {
    const { clearSelectedData } = this.props;
    clearSelectedData(option);
  };

  handleChange = selectedOptions => {
    const { onChange, handleClearResults } = this.props;
    onChange(selectedOptions);
    handleClearResults();
  };

  render() {
    const {
      value,
      placeholder,
      selectedData,
      airfields,
      isSearching,
      disabled,
      clear,
    } = this.props;

    const valueLength = value.length;

    const options = mergeData(selectedData, airfields).map(
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
        <div className="select-container" style={{ width: "100%" }}>
          <Select
            onBlur={clear}
            disabled={disabled}
            style={{ minWidth: 250 }}
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
            notFoundContent={isSearching ? <Spin size="small" /> : null}
            optionLabelProp={valueLength > 1 ? "ap" : "shortdisplayname"}
            dropdownRender={menu => (
              <div>
                {menu}
                {valueLength === MAX_AIRPORT_ALLOWED && (
                  <div style={{ marginBottom: 5 }}>
                    <Divider style={{ margin: "5px 0" }} />
                    <Text strong style={{ marginLeft: 10 }}>
                      {`Maximun ${MAX_AIRPORT_ALLOWED} airports`}
                    </Text>
                  </div>
                )}
              </div>
            )}
          >
            {options}
          </Select>
        </div>
      </Tooltip>
    );
  }
}

// exporting just for testing
export const mapStateToProps = ({ airfields: { airfields, isSearching } }) => ({
  airfields,
  isSearching,
});

// exporting just for testing
export const mapDispatchToProps = dispatch => {
  return {
    search: payload => {
      dispatch(search(payload));
    },
    clear: payload => {
      dispatch(clear(payload));
    },
  };
};

// prop types validation
AirfieldSearcher.propTypes = {
  value: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  selectedData: PropTypes.object.isRequired,
  isSearching: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  search: PropTypes.func.isRequired,
  setSelectedData: PropTypes.func.isRequired,
  airfields: PropTypes.array.isRequired,
  clear: PropTypes.func.isRequired,
  clearSelectedData: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  handleClearResults: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AirfieldSearcher);
