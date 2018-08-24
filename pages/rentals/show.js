import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Rental from '../../ethereum/rental';

class RentalOfferShow extends Component {
  static async getInitialProps(props) {
    const rental = Rental(props.query.address);
    const summary = await rental.methods.getSummary().call();
    
    return {
      owner: summary[0],
      itemDescription: summary[1],
      itemValue: summary[2],
      extraDeposit: summary[3],
      rentalFee: summary[4],
      returnFee: summary[5],
      tenant: summary[6],
      availableForRent: summary[7]
    };
  }

  renderCards() {
    const {
      owner, itemDescription, itemValue, extraDeposit, rentalFee, returnFee, tenant, availableForRent
    } = this.props;

    const items = [
      {
        header: owner,
        meta: 'Owner\'s address',
        description: 'The item is offered for rental by this address',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: itemDescription,
        meta: 'Description',
        description: 'The item description'
      },
      {
        header: itemValue,
        meta: 'Value',
        description: 'The item value (needs to be deposited)'
      },
      {
        header: extraDeposit,
        meta: 'The extra deposit',
        description: 'Additional deposit (on top of the item value) asked for'
      },
      {
        header: rentalFee,
        meta: 'Rental Fee',
        description: 'The rental fee'
      },
      {
        header: returnFee,
        meta: 'Return Fee',
        description: 'The return fee'
      },
      {
        header: availableForRent ? <Icon name='checkmark' /> : <Icon name='cancel' />,
        meta: 'Available for rent',
        description: 'Signals if the owner wants to lease the item currently'
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Rental Offer Show</h3>
        {this.renderCards()}
      </Layout>
    );
  }
}

export default RentalOfferShow;
