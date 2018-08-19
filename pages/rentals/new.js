import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

class RentalNew extends Component {
  state = {
    description: '',
    value: '',
    extra_deposit: '',
    rental_fee: '',
    return_fee: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({loading: true, errorMessage: ''});

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
      .createRental(this.state.description, this.state.value, this.state.extra_deposit, this.state.rental_fee, this.state.return_fee)
      .send({
        from: accounts[0]
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({loading: false});

  };

  render() {
    return (
      <Layout>
        <h3>Create a rental!</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={event => this.setState({ description: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Value</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Extra Deposit</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.extra_deposit}
              onChange={event => this.setState({ extra_deposit: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Rental Fee</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.rental_fee}
              onChange={event => this.setState({ rental_fee: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Return Fee</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.return_fee}
              onChange={event => this.setState({ return_fee: event.target.value })}
            />
          </Form.Field>

          <Message error header="An error occurred!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default RentalNew;
