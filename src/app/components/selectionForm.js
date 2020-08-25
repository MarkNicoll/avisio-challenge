import React from "react";

class SelectionForm extends React.Component {
  constructor(props) {
    super(props);

    this.displayOptions = this.displayOptions.bind(this);
  }

  displayOptions() {
    const { data } = this.props;

    return data.map((item) => {
      return (
        <option key={item} value={item}>
          {item}
        </option>
      );
    });
  }

  render() {
    const {
      value,
      handleChange,
      type,
      label,
      shouldShowDefaultOption,
    } = this.props;
    return (
      <form className="selector" onSubmit={this.handleSubmit}>
        <label>
          {label}
          <select value={value} onChange={(e) => handleChange(e, type)}>
            {shouldShowDefaultOption && (
              <option value="">Select an option</option>
            )}
            {this.displayOptions()}
          </select>
        </label>
      </form>
    );
  }
}

export default SelectionForm;
