import React from 'react';

import Add from './Add.js';
// need connect function to be able to connect to store from Provider
import {connect} from 'react-redux';

import {addEntry, dashDefault} from '../../actions/dashActions';

import DashboardSummary from './DashboardSummary';
import EntryList from '../entries/EntryList';

// Dummy Data
import entries from '../../data/entries';

const initialState = {
  entries,
  monthlyAmountSaved: 999.99,
  monthlyIncome: 299.0,
  monthlyExpenses: 99.99
};

class Container extends React.Component {
  constructor(props) {
    super(props);
    // this.addNewEntry = this.addNewEntry.bind(this);
    // this.setDashDefault = this.setDashDefault.bind(this);
    // this.state = {
    //   status: 'dash'
    // };
    this.state = initialState;
  }
  componentDidMount() {
  }


  // statusAdd = () => {
  //   this.setState({status:'add'});
  //   console.log(this.state.status);
  // }

  render() {
    const index = () => {
      const status = this.props.status;
      if(status === 'add') {
        return (
          <div>
            <Add />
          </div>
        )
      } else if(status === 'dash') {
        return (
          <div>
            <div className='add-entry'>
              <button onClick={this.props.addNewEntry}>
                Add
              </button>
          </div>
          <div className="dash__saved">
            <p>
              You have saved <span className="dash__saved--big">${this.state.monthlyAmountSaved}</span> so far this month.
            </p>
          </div>
          <DashboardSummary
            income={this.state.monthlyIncome}
            expense={this.state.monthlyExpenses}
          />
          <button className="button dash__button" type="button">
            Add Entry
          </button>
          <h2 className="heading--sub">Recent Entries</h2>
          <EntryList entries={this.state.entries} />
          </div>
        )
      }
    }
    
    return (
      <div className="dash">
        <h1 className="heading--main">Dashboard</h1>
        <div className="content">
          {index()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.dash;
};

const mapDispatchToProps = (dispatch) => {
  return {
      addNewEntry: () => {
          dispatch(addEntry());
      },
      setDashDefault: () => {
          dispatch(dashDefault());
      }
  }
}


const Dashboard = connect(mapStateToProps, mapDispatchToProps)(Container);

export default Dashboard;
