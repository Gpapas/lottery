pragma solidity ^0.8.21;
contract SMSSender {
    address public owner;
    address[] public players;
    // Set minimum ether required to enter the game as a constant
    uint constant MIN_ETHER_REQUIRED_TO_ENTER = 0.1 ether;
    constructor() {
        owner = msg.sender;
    }
    function getPlayers() public view returns (address[] memory) {
        return players;
    }
    function enter() public payable {
        require(msg.value >= MIN_ETHER_REQUIRED_TO_ENTER,
        “Payment amount must be greater than or equal to 0.1 ether”);
        players.push(msg.sender);
    }
}
