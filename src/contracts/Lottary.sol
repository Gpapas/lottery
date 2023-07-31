pragma solidity ^0.8.0;

contract PaymentContract {
    address payable public owner; // the address of the owner of the contract
    address payable[] public recipient;
    uint public fee = 0.1 ether; 

    constructor(){
        owner = payable (msg.sender);
    }

    function sendPayment() public payable {
        require (msg.value > fee);
        owner.transfer(msg.value);
        recipient.push(payable(msg.sender));
    }

        function getUsers() public view returns (address payable[] memory) {
        return recipient; // get the array of addresses of the players in the lottery
    }
}
