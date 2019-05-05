import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

// need connect function to be able to connect to store from Provider
import { connect } from 'react-redux';

import { dashDefault, getLatestEntries } from '../../actions/dashActions';

class Container extends React.Component {
  state = {
    transaction: 'DEFAULT',
    category: 'DEFAULT',
    entry: '', // description
    amount: null,

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

  submitForm = (e) => {
    e.preventDefault();

    let errors = this.getErrors();

    // Errors present
    if (Object.keys(errors).length > 0) {
      errors = { ...errors, server: '' };
      this.setState({ errors });
      return;
    }

    const formData = new FormData(document.getElementById('form__add'));
    const obj = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const data of formData.entries()) {
      // data is in key-value pairs
      const key = data[0];
      const value = data[1];
      obj[key] = value;
    }

    obj.userId = this.props.auth.userId;

    const url = 'http://localhost:5000/api/entries/add-entry';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: { 'Content-type': 'application/json' },
      credentials: 'include'
    })
      .then(res => res.json())
      .then((data) => {
        this.props.getLatestEntries();
      })
      .catch((err) => {
        errors = { ...errors, server: err.message };
        this.setState({ errors }, () => {
          throw new Error(err);
        });
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

  render() {
    const { errors } = this.state;

    return (
      <div className="add-entry">
        <form onSubmit={this.submitForm} id="form__add" className="form__add">
          <fieldset>
            <legend>Add Entry</legend>
            <div className="form__container">
              <div className="form__group">
                <label htmlFor="transaction" className="form__label">
                  Transaction Type:
                </label>
                <div className="form__input-container">
                  <select
                    className="form__input"
                    id="transaction"
                    name="transaction"
                    defaultValue="DEFAULT"
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
                    id="category"
                    name="category"
                    defaultValue="DEFAULT"
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
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
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
                <div className="form__input-container">
                  <input
                    className="form__checkbox"
                    type="checkbox"
                    name="recurring"
                    id="recurring"
                  />
                </div>
              </div>
              <button className="button" type="submit">
                Submit
              </button>
              <button className="button__back" type="button" onClick={this.props.getLatestEntries}>
                Back
              </button>
              <div className="error">{this.state.serverError}</div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

Container.propTypes = {
  auth: PropTypes.object.isRequired,
  getLatestEntries: PropTypes.func.isRequired
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  setGetLatestEntries: () => {
    dispatch(getLatestEntries());
  },
  setDashDefault: () => {
    dispatch(dashDefault());
  }
});

const Add = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export default Add;
