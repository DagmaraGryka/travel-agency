import React from 'react';
import DatePicker from 'react-datepicker';
import styles from './OrderOption.scss';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import PropTypes from 'prop-types';

const OrderOptionDate = ({currentValue, setOptionValue}) => (

  <div className={styles.component}>
    <DatePicker
      type="date"
      className={styles.input}
      selected={currentValue}
      onChange={date => setOptionValue(date)}
      placeholderText={'Start date'}
    />
  </div>
);

OrderOptionDate.propTypes = {
  currentValue: PropTypes.instanceOf(Date),
  setOptionValue: PropTypes.func,
  startDate: PropTypes.string,
};


export default OrderOptionDate;
