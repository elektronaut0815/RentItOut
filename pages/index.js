import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import factory from '../ethereum/factory';

class RentalIndex extends Component {
  static async getInitialProps() {
    const rentals = await factory.methods.getDeployedRentals().call();

    return { rentals };
  }

  renderRentals() {
    const items = this.props.rentals.map(address => {
      return {
        header: address,
        description: <a>View Rental Offer</a>,
        fluid: true
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"
        />
        {this.renderRentals()}
      </div>
    );
  }
}

export default RentalIndex;
