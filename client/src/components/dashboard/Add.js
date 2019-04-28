import React from 'react';

// need connect function to be able to connect to store from Provider
import {connect} from 'react-redux';

import {dashDefault} from '../../actions/dashActions';

import moment from 'moment';

class Container extends React.Component {
    constructor(props) {
        super(props);
        // this.setDashDefault = this.setDashDefault.bind(this);
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

        obj.username = this.props.auth.username;
        
        const url = 'http://localhost:5000/api/auth/add-entry';
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
        })
        .catch((err) => {
            throw err;
        });

    }

    render() {
        const whatState = () => {
            console.log(this.props);
        }
        return(
            <div>
                {whatState()}
                <form onSubmit={this.submitForm} id='form-add'>
                    <select name='transaction' defaultValue={'DEFAULT'}>
                        <option value='DEFAULT' disabled>Select Transaction Type</option>
                        <option value='0'>Income</option>
                        <option value='1'>Expense</option>
                    </select>
                    <select name='category' defaultValue={'DEFAULT'}>
                        <option value='DEFAULT' disabled>Select Category Type</option>
                        <option value='1'>Salary</option>
                        <option value='2'>Groceries</option>
                        <option value='3'>Transportation</option>
                        <option value='4'>Utilities</option>
                    </select>
                    <div>
                        <label htmlFor='entry'>Entry:</label>
                        <input type='text' name='entry' id='entry'></input>  
                    </div>
                    <div>
                        <label htmlFor='amount'>Amount:</label>
                        <input type='number' name='amount' id='amount'></input>
                    </div>
                    <input type='date' name='full_date' defaultValue={moment().format('YYYY-MM-DD')}></input>
                    <div>
                        <input type='checkbox' name='recurring' id='recurring'></input>
                        <label htmlFor='recurring'>Recurring</label>
                    </div>
                    <button>Submit</button>
                </form>
                <button onClick={this.props.setDashDefault}>Back</button>
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

