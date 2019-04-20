import React from 'react';
import PropTypes from 'prop-types';

const DashboardSummary = props => (
  <div className="dash__summary">
    <div className="dash__summary__column">
      <h4 className="dash__summary__heading">Income</h4>
      <p className="dash__summary__amount">${props.income}</p>
    </div>
    <div className="dash__summary__column">
      <h4 className="dash__summary__heading">Expense</h4>
      <p className="dash__summary__amount">${props.expense}</p>
    </div>
  </div>
);

DashboardSummary.propTypes = {
  income: PropTypes.number.isRequired,
  expense: PropTypes.number.isRequired
};

export default DashboardSummary;
