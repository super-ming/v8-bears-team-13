import React from 'react';

// need connect function to be able to connect to store from Provider
import { connect } from 'react-redux';

import { dashDefault } from '../../actions/dashActions';

import moment from 'moment';
import { checkServerIdentity } from 'tls';

class Container extends React.Component {
    state = {
        transaction: this.props.dash.entry.transact_id,
        entry: this.props.dash.entry.entry_desc,
        amount: this.props.dash.entry.amount
    }

    handleTransactionTypeChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    getCategoryOptions = () => {
        // Income
        if (this.state.transaction === "0" || this.state.transaction === false) {
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

    submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData(document.getElementById('form-edit'));
        let obj = {};
        for (let data of formData.entries()) {
            // data is in key-value pairs
            let key = data[0];
            let value = data[1];
            obj[key] = value;
        }

        obj.username = this.props.auth.username;
        obj.userId = this.props.auth.userId;
        obj.id = this.props.dash.entry.id;

        const url = 'http://localhost:5000/api/entries/edit-entry';
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers: { 'Content-type': 'application/json' },
            credentials: 'include'
        })
            .then((res) =>
                res.json()
            )
            .then((data) => {
                this.props.getLatestEntries();
            })
            .catch((err) => {
                throw err;
            });
    };

    getReccuringDefault = () => {
        if (this.props.dash.entry.recurring) {
            return <input type='checkbox' name='recurring' id='recurring' onClick={this.handleTransactionTypeChange} checked ></input>;
        }

        return (<input type='checkbox' name='recurring' id='recurring' onClick={this.handleTransactionTypeChange}></input>)
    }

    render() {
        const whatState = () => {
            console.log(this.props);
        }

        const { transact_id, category_id, entry_desc, amount } = this.props.dash.entry;

        return (
            <div>
                {whatState()}
                <form onSubmit={this.submitForm} id='form-edit'>
                    <h3>Entry Edit</h3>
                    <select name='transaction'
                        defaultValue={transact_id}
                        value={this.state.transactionType}
                        onChange={this.handleTransactionTypeChange}
                    >
                        <option value='DEFAULT' disabled>Select Transaction Type</option>
                        <option value='0'>Income</option>
                        <option value='1'>Expense</option>
                    </select>
                    <select name='category' defaultValue={category_id} onClick={this.handleTransactionTypeChange}>
                        <option value='DEFAULT' disabled>Select Category Type</option>
                        {this.getCategoryOptions()}
                    </select>
                    <div>
                        <label htmlFor='entry'>Entry:</label>
                        <input type='text' name='entry' id='entry' value={this.state.entry} onInput={this.handleTransactionTypeChange}></input>
                    </div>
                    <div>
                        <label htmlFor='amount'>Amount:</label>
                        <input type='number' name='amount' id='amount' min="0.00" step="0.01" value={this.state.amount} onInput={this.handleTransactionTypeChange}></input>
                    </div>
                    <input type='date' name='full_date' defaultValue={moment().format('YYYY-MM-DD')}></input>
                    <div>
                        <label htmlFor='recurring'>Recurring</label>
                        {this.getReccuringDefault()}
                    </div>
                    <button>Submit</button>
                </form>
                <button onClick={this.props.getLatestEntries}>Back</button>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        setDashDefault: () => {
            dispatch(dashDefault());
        }
    }
}

const Add = connect(mapStateToProps, mapDispatchToProps)(Container);

export default Add;

