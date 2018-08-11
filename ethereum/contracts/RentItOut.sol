pragma solidity ^0.4.24;

contract RentalFactory{
    address[] public deployedRentals;
    
    function createRental(string description, uint value, uint extraDeposit, uint rentalFee, uint returnFee) public {
        address newRental = new Rental(description, value, extraDeposit, rentalFee, returnFee, msg.sender);
        deployedRentals.push(newRental);
    }
    
    function getDeployedRentals() public view returns (address[]) {
        return deployedRentals;
    }
}

contract Rental {

    address public owner;
    string public itemDescription;
    uint public itemValue;
    uint constant depreciationDivisor = 2;
    uint public extraDeposit;
    uint public rentalFee;
    //uint public rentalPeriod;
    uint public returnFee;
    address public tenant;
    bool public availableForRent;
    uint public rentStarted;
    uint constant totalRentPeriods = 1000;
    uint public contractBalance;
    
    constructor(string _itemDescription, uint _itemValue, uint _extraDeposit, uint _rentalFee, uint _returnFee, address _owner) public {
        owner = _owner;
        itemDescription = _itemDescription;
        itemValue = _itemValue;
        extraDeposit = _extraDeposit;
        rentalFee = _rentalFee;
        returnFee = _returnFee;
        availableForRent = true;
        contractBalance = 0;
    }
    
    function rentItemFromOwner() public onlyIfAvailable notRented enoughDeposit payable {
        tenant = msg.sender;
        rentStarted = now;
        contractBalance = address(this).balance;
    }
    
    //another tenant takes over
    function rentItemFromLastTenant() public onlyIfAvailable enoughDeposit payable {
        require(tenant != address(0));
        updateItemValueAndRentalFee();
        uint rentAmount = calculateRent();
        owner.transfer(rentAmount);
        tenant.transfer(contractBalance - rentAmount);
        contractBalance = address(this).balance;
        tenant = msg.sender;
        rentStarted = now;
    }
    
    function returnItem() public onlyOwner {
        uint rentAmount = calculateRent();
        owner.transfer(rentAmount);
        tenant.transfer(address(this).balance);
        updateItemValueAndRentalFee();
        tenant = 0;
        rentStarted = 0;
        contractBalance = 0;
    }
    
    function updateItemValueAndRentalFee() public onlyOwner returns(uint[]) {
        require(tenant != 0);
        uint passedTime = secondsToDays(now - rentStarted);
        if(passedTime > 0) {
            itemValue = itemValue - (passedTime * (rentalFee / depreciationDivisor));
            if(itemValue <= 0) {
                itemValue = 0;
                availableForRent = false;
            }
            rentalFee = rentalFee - rentalFee * passedTime / totalRentPeriods / depreciationDivisor;
        }
    }
    
    function calculateRent() public view returns (uint) {
        uint rentAmount = secondsToDays(now - rentStarted) * rentalFee + returnFee;
        rentAmount = rentAmount > contractBalance ? contractBalance : rentAmount;
        return rentAmount;
    }
    
    function secondsToDays(uint _seconds) public pure returns (uint) {
        return 2; //just for testing
        //return _seconds / 60 / 60 / 24 + 1; //adding one so first period counts
    }
    
    function declareUnavailable() public onlyOwner {
        availableForRent = false; //delisting also needed?
    }
        
    function declareAvailable() public onlyOwner {
        availableForRent = true;
    }
    
    //Owner diminishes return fee in order to incentivize returning the item
    function diminishReturnFee(uint newFee) public onlyOwner {
        require(newFee < returnFee);
        returnFee = newFee;
    }
    
    function setReturnFee(uint newFee) public onlyOwner notRented {
        returnFee = newFee;
    }
    
    function withdrawEther() external onlyOwner {
        owner.transfer(address(this).balance);
    }
      
    modifier enoughDeposit() {
        require(msg.value >= itemValue + returnFee + extraDeposit);
        _;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    modifier onlyIfAvailable() {
        require(availableForRent && itemValue > 0);
        _;
    }
    
    modifier notRented() {
        require(tenant == 0);
        _;
    }
    
}