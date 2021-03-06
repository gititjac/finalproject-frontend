import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";

class Expense extends Component {

  render() {
    return (
      <div>
        <TextField
          type="select-currency-native"
          className="goalamount"
          placeholder="$"
          id="select-currency-native"
          label={this.props.label}
          margin="normal"
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default Expense;
