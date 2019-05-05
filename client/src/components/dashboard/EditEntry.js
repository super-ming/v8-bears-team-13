import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

// need connect function to be able to connect to store from Provider
import { connect } from 'react-redux';

import { dashDefault } from '../../actions/dashActions';

class Container extends React.Component {
  state = {
    transaction: this.props.dash.entry.transact_id ? '1' : '0',
    category: this.props.dash.entry.category_id,
    entry: this.props.dash.entry.entry_desc,
    amount: this.props.dash.entry.amount,

    // Errors
    errors: {
      transaction: '',
      category: '',
      entry: '',
      amount: '',
      server: '',
      date: ''
    }
  };

  dateRef = React.createRef();

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getErrors = () => {
    const errors = {};

    if (this.state.transaction === 'DEFAULT') errors.transaction = 'Transaction type is required.';
    if (this.state.category === 'DEFAULT') errors.category = 'Category is required.';
    if (this.state.entry === '') errors.entry = 'Description is required.';
    if (this.state.amount === '' || this.state.amount == null) errors.amount = 'Amount is required.';
    if (this.dateRef.current.value === '') errors.date = 'Date is required';

    const dateRegex = /^\d{4}[-]\d{1,2}[-]\d{1,2}$/;
    console.log(typeof this.dateRef.current.value);
    if (!dateRegex.test(this.dateRef.current.value)) errors.date = 'Date Format: YYYY-MM-DD';

    return errors;
  };

  getCategoryOptions = () => {
    // Default
    if (this.state.transaction === 'DEFAULT') return null;

    // Income
    if (this.state.transaction === '0') {
      return <option value="1">Salary</option>;
    }

    // Expense
    return (
      <>
        <option value="2">Groceries</option>
        <option value="3">Transportation</option>
        <option value="4">Utilities</option>
      </>
    );
  };

  submitForm = (e) => {
    e.preventDefault();

    let errors = this.getErrors();

    // Errors present
    if (Object.keys(errors).length > 0) {
      errors = { ...errors, server: '' };
      this.setState({ errors });
      return;
    }

    const formData = new FormData(document.getElementById('form-edit'));
    const obj = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const data of formData.entries()) {
      // data is in key-value pairs
      const key = data[0];
      const value = data[1];
      obj[key] = value;
    }

    obj.username = this.props.auth.username;
    obj.userId = this.props.auth.userId;
    obj.id = this.props.dash.entry.id;

    const url = '/api/entries/edit-entry';
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: { 'Content-type': 'application/json' },
      credentials: 'include'
    })
      .then(res => res.json())
      .then((data) => {
        this.props.getEntries();
      })
      .catch((err) => {
        errors = { ...errors, server: err.message };
        this.setState({ errors }, () => {
          throw new Error(err);
        });
      });
  };

  getRecurringDefault = () => {
    if (this.props.dash.entry.recurring) {
      return (
        <input
          className="form__checkbox"
          type="checkbox"
          name="recurring"
          id="recurring"
          onClick={this.handleTransactionTypeChange}
          checked
        />
      );
    }

    return (
      <input
        className="form__checkbox"
        type="checkbox"
        name="recurring"
        id="recurring"
        onClick={this.handleTransactionTypeChange}
      />
    );
  };

  render() {
    const { errors } = this.state;
    const { transact_id, category_id } = this.props.dash.entry;

    return (
      <div className="edit-entry">
        <form onSubmit={this.submitForm} id="form-edit" className="form__edit">
          <fieldset>
            <legend>Entry Edit</legend>
            <div className="form__container">
              <div className="form__group">
                <label htmlFor="transaction" className="form__label">
                  Transaction Type:
                </label>
                <div className="form__input-container">
                  <select
                    className="form__input"
                    name="transaction"
                    id="transaction"
                    defaultValue={this.state.transaction}
                    value={this.state.transaction}
                    onChange={this.handleChange}
                  >
                    <option value="DEFAULT" disabled>
                      Select Transaction Type
                    </option>
                    <option value="0">Income</option>
                    <option value="1">Expense</option>
                  </select>
                  <div className="error">{errors.transaction}</div>
                </div>
              </div>
              <div className="form__group">
                <label htmlFor="category" className="form__label">
                  Category Type:
                </label>
                <div className="form__input-container">
                  <select
                    className="form__input"
                    name="category"
                    id="category"
                    defaultValue={this.state.category}
                    value={this.state.category}
                    onChange={this.handleChange}
                  >
                    <option value="DEFAULT" disabled>
                      Select Category Type
                    </option>
                    {this.getCategoryOptions()}
                  </select>
                  <div className="error">{errors.category}</div>
                </div>
              </div>
              <div className="form__group">
                <label htmlFor="entry" className="form__label">
                  Entry Description:
                </label>
                <div className="form__input-container">
                  <input
                    className="form__input"
                    type="text"
                    name="entry"
                    id="entry"
                    value={this.state.entry}
                    onInput={this.handleChange}
                  />
                  <div className="error">{errors.entry}</div>
                </div>
              </div>
              <div className="form__group">
                <label htmlFor="amount" className="form__label">
                  Amount:
                </label>
                <div className="form__input-container">
                  <input
                    className="form__input"
                    type="number"
                    name="amount"
                    id="amount"
                    min="0.00"
                    step="0.01"
                    value={this.state.amount}
                    onInput={this.handleChange}
                  />
                  <div className="error">{errors.amount}</div>
                </div>
              </div>
              <div className="form__group">
                <label htmlFor="date" className="form__label">
                  Date:
                </label>
                <div className="form__input-container">
                  <input
                    className="form__input"
                    type="date"
                    name="full_date"
                    id="date"
                    defaultValue={moment().format('YYYY-MM-DD')}
                    ref={this.dateRef}
                  />
                  <div className="error">{errors.date}</div>
                </div>
              </div>
              <div className="form__group">
                <label htmlFor="recurring" className="form__label">
                  Recurring:
                </label>
                <div className="form__input-container">{this.getRecurringDefault()}</div>
              </div>
              <button className="button" type="submit">
                Submit
              </button>
              <button className="button__back" type="button" onClick={this.props.getEntries}>
                Back
              </button>
            </div>
            <div className="error">{errors.server}</div>
          </fieldset>
        </form>
      </div>
    );
  }
}

Container.propTypes = {
  getEntries: PropTypes.func.isRequired
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  setDashDefault: () => {
    dispatch(dashDefault());
  }
});

const Add = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export default Add;
