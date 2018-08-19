import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class RentalIndex extends Component {
  static async getInitialProps() {
    const rentals = await factory.methods.getDeployedRentals().call();

    return { rentals };
  }

  renderRentals() {
    const items = this.props.rentals.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/rentals/${address}`}>
            <a>View Rental Offer</a>
          </Link>
        ),
        fluid: true
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Items to rent</h3>

          <Link route="/rentals/new">
            <a>
              <Button
                floated="right"
                content="Create Rental Offer"
                icon="add circle"
                primary
              />
            </a>
          </Link>
          {this.renderRentals()}
        </div>
      </Layout>
    );
  }
}

export default RentalIndex;
