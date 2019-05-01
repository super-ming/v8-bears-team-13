import React from 'react';

// need connect function to be able to connect to store from Provider
import {connect} from 'react-redux';

import {getLatestEntries} from '../../actions/dashActions';

import moment from 'moment';

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
        const formData = new FormData(document.getElementById('form-add'));
        // this.props.setDashDefault();
        let obj = {};
        for(let data of formData.entries()) {
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
        const whatState = () => {
            console.log(this.props);
        }

        return(
            <div>
                {whatState()}
                <form onSubmit={this.submitForm} id='form-add'>
                    <select 
                        name='transaction'
                        defaultValue={'DEFAULT'}
                        value={this.state.transactionType}
                        onChange={this.handleTransactionTypeChange}
                    >
                        <option value='DEFAULT' disabled>Select Transaction Type</option>
                        <option value='0'>Income</option>
                        <option value='1'>Expense</option>
                    </select>
                    <select name='category' defaultValue={'DEFAULT'}>
                        <option value='DEFAULT' disabled>Select Category Type</option>
                        { this.getCategoryOptions() }
                    </select>
                    <div>
                        <label htmlFor='entry'>Entry:</label>
                        <input type='text' name='entry' id='entry'></input>  
                    </div>
                    <div>
                        <label htmlFor='amount'>Amount:</label>
                        <input type='number' name='amount' id='amount' min="0.00" step="0.01"></input>
                    </div>
                    <input type='date' name='full_date' defaultValue={moment().format('YYYY-MM-DD')}></input>
                    <div>
                        <input type='checkbox' name='recurring' id='recurring'></input>
                        <label htmlFor='recurring'>Recurring</label>
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
        setGetLatestEntries: () => {
            dispatch(getLatestEntries());
        }
    }
  }
  
const Add = connect(mapStateToProps, mapDispatchToProps)(Container);

export default Add;
