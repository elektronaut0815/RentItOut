const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/RentalFactory.json');
const compiledRental = require('../ethereum/build/Rental.json');

let accounts;
let factory;
let rentalAddress;
let rental;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '2000000' });

  await factory.methods.createRental('Bike', '1000000000000000000', '500000000000000000', '10000000000000000', '10000000000000000').send({
    from: accounts[0],
    gas: '1000000'
  });

  [rentalAddress] = await factory.methods.getDeployedRentals().call();
  rental = await new web3.eth.Contract(
    JSON.parse(compiledRental.interface),
    rentalAddress
  );
});

describe('Rentals', () => {
  it('deploys a factory and a rental', () => {
    assert.ok(factory.options.address);
    assert.ok(rental.options.address);
  });

  it('marks caller as the item owner', async () => {
    const owner = await rental.methods.owner().call();
    assert.equal(accounts[0], owner);
  });

  it('allows to rent the item from the owner', async () => {
    await rental.methods.rentItemFromOwner().send({
      value: '1510000000000000000',
      from: accounts[1]
    });
    const tenant = await rental.methods.tenant().call();
    assert(tenant == accounts[1]);
  });

  xit('allows to rent the item from the last tenant', async () => {
    await rental.methods.rentItemFromOwner().send({
      value: '1510000000000000000',
      from: accounts[1]
    });
    const lastTenant = await rental.methods.tenant().call();
    assert(lastTenant == accounts[1]);

    await rental.methods.rentItemFromLastTenant().send({
      value: '1510000000000000000',
      from: accounts[2]
    });
    const tenant = await rental.methods.tenant().call();
    assert(tenant == accounts[2]);
  });
});