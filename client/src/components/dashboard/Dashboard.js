import React from 'react';
import Add from './Add.js';
// need connect function to be able to connect to store from Provider
import {connect} from 'react-redux';

import {addEntry, dashDefault} from '../../actions/dashActions';

class Container extends React.Component {
  constructor(props) {
    super(props);
    // this.addNewEntry = this.addNewEntry.bind(this);
    // this.setDashDefault = this.setDashDefault.bind(this);
    // this.state = {
    //   status: 'dash'
    // };
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
            <p className="body-text">This is what logged in users will see</p>
          </div>
        )
      }
    }
    
    return (
      <div className="dashboard">
        <h1 className="heading__main">Dashboard</h1>
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
