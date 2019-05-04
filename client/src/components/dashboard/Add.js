import React from 'react';
import moment from 'moment';

// need connect function to be able to connect to store from Provider
import { connect } from 'react-redux';

import { dashDefault, getLatestEntries } from '../../actions/dashActions';


class Container extends React.Component {
    state = {
        transaction: 0
    }

    handleTransactionTypeChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData(document.getElementById('form__add'));
        // this.props.setDashDefault();
        let obj = {};
        for (let data of formData.entries()) {
            // data is in key-value pairs
            let key = data[0];
            let value = data[1];
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
            .then((res) =>
                res.json()
            )
            .then((data) => {
                console.log(data);
                this.props.getLatestEntries();
            })
            .catch((err) => {
                throw err;
            });
    }

    getCategoryOptions = () => {
        // Income
        if (this.state.transaction === "0") {
            return <option value='1'>Salary</option>;
        }

        // Expense
        return (
            <>
                <option value='2'>Groceries</option>
                <option value='3'>Transportation</option>
                <option value='4'>Utilities</option>
            </>
        );
    }

    render() {
        return(
            <div className="add-entry">
                <form onSubmit={this.submitForm} id='form__add' className="form__add">
                    <fieldset>
                        <legend>Add a new entry</legend>
                        <div className="form__container">
                            <div className="form__group">
                                <label htmlFor="transaction" className="form__label">Transaction Type: </label>
                                <div className="form__input-container">
                                    <select 
                                        id='transaction'
                                        name='transaction'
                                        defaultValue={'DEFAULT'}
                                        value={this.state.transactionType}
                                        onChange={this.handleTransactionTypeChange}
                                    >
                                        <option value='DEFAULT' disabled>Select Transaction Type</option>
                                        <option value='0'>Income</option>
                                        <option value='1'>Expense</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form__group">
                                <label htmlFor="category" className="form__label">Category Type: </label>
                                <div className="form__input-container">
                                    <select id="category" name='category' defaultValue={'DEFAULT'}>
                                        <option value='DEFAULT' disabled>Select Category Type</option>
                                        { this.getCategoryOptions() }
                                    </select>
                                </div>
                            </div>
                            <div className="form__group">
                                <label htmlFor="entry" className="form__label">Entry Description: </label>
                                <div className="form__input-container">
                                    <input type='text' name='entry' id='entry'></input>
                                </div>
                            </div>
                            <div className="form__group">
                                <label htmlFor="amount" className="form__label">Amount: </label>
                                <div className="form__input-container">
                                    <input type='number' name='amount' id='amount' min="0.00" step="0.01"></input>
                                </div>
                            </div>
                            <div className="form__group">
                                <label htmlFor="date" className="form__label">Date: </label>
                                <div className="form__input-container">
                                    <input type='date' name='full_date' id="date" defaultValue={moment().format('YYYY-MM-DD')}></input>
                                </div>
                            </div>
                            <div className="form__group">
                                <label htmlFor="recurring" className="form__label">Recurring: </label>
                                <div className="form__input-container">
                                    <input type='checkbox' name='recurring' id='recurring'></input>
                                </div>
                            </div>
                            <button className="button">Submit</button>
                        </div>
                    </fieldset>
                </form>
                <button className="button__back" onClick={this.props.setDashDefault}>Back</button>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        setGetLatestEntries: () => {
            dispatch(getLatestEntries());
        },
        setDashDefault: () => {
            dispatch(dashDefault());
        }
    }
};

const Add = connect(mapStateToProps, mapDispatchToProps)(Container);

export default Add;
