import React, { Component } from 'react';
import { Button, Dropdown, Form, Popup } from 'semantic-ui-react';

class RentItForm extends Component {
  state = {
    chosenPeriod: 1,
  }

  handleValueChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  calculateTotal = () => {
    let total = this.state.chosenPeriod * this.props.rentalFee + parseInt(this.props.itemValue) + parseInt(this.props.extraDeposit) + parseInt(this.props.returnFee);
    return 'You\'ll need to transfer ' + total + ' wei';
  }

  render() {
    const periods = [
      {
        value: '1',
        text: '1'
      },
      {
        value: '2',
        text: '2'
      },
      {
        value: '3',
        text: '3'
      },
      {
        value: '4',
        text: '4'
      },
      {
        value: '5',
        text: '5'
      },
      {
        value: '6',
        text: '6'
      },
      {
        value: '7',
        text: '7'
      },
      {
        value: '8',
        text: '8'
      },
      {
        value: '9',
        text: '9'
      },
      {
        value: '10',
        text: '10'
      }
    ];

    

    return (
      <Form>
        <span>
          Rent this item for{' '}
          <Dropdown
            inline
            name='chosenPeriod'
            options={periods}
            defaultValue={periods[0].value}
            onChange={this.handleValueChange}
          />
          rental periods{' '}
        </span>
        <Popup trigger={<Button primary>Rent it!</Button>} content={this.calculateTotal} />
      </Form>
    );
  }
}
export default RentItForm;
