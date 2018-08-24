import web3 from './web3';
import RentalFactory from './build/RentalFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(RentalFactory.interface),
    '0x210f4DFEF34F59f9a835cC02D45b792b5E753c1B'
);

export default instance;