import React from 'react';
import PropTypes from 'prop-types';

import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import pricing from '../../../data/pricing.json';
import Button from '../../common/Button/Button.js';
import settings from '../../../data/settings.js';
import {formatPrice} from '../../../utils/formatPrice.js';
import {calculateTotal} from '../../../utils/calculateTotal.js';


const sendOrder = (options, tripCost, tripId, countryCode, tripName) => {
  if(options.name!='' && options.contact!=''){
    const totalCost = formatPrice(calculateTotal(tripCost, options));

    const payload = {
      ...options,
      totalCost,
      tripId,
      countryCode,
      tripName,

    };

    const url = settings.db.url + '/' + settings.db.endpoint.orders;

    const fetchOptions = {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, fetchOptions)
      .then(function(response){
        return response.json();
      }).then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);
      });
  } else {
    alert('You should fill name and contact');
  }
};


const OrderForm = ({tripCost, options, setOrderOption, tripId, countryCode, tripName}) => (
  <Row>
    {pricing.map(option => (
      <Col md={4} key={option.id}>
        <OrderOption
          currentValue={options[option.id]}
          setOrderOption={setOrderOption}
          {...option}/>
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary tripCost={tripCost} options={options} />
    </Col>
    <Button onClick={() => sendOrder(options, tripCost, tripId, countryCode, tripName)}>Order now!</Button>
  </Row>

);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  tripId: PropTypes.string,
  countryCode: PropTypes.string,
  tripName: PropTypes.string,
};


export default OrderForm;
