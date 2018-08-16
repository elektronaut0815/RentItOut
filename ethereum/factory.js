import web3 from './web3';
import RentalFactory from './build/RentalFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(RentalFactory.interface),
    '0x5b49024bF96Dd2916544329A7C28F61850452c2E'
);

export default instance;