pragma solidity ^0.8.11;
contract Lottery {
    address payable public owner; // the address of the owner of the contract
    address payable[] public players; // an array of addresses of the players in the lottery
    uint public lotteryId; // the ID of the current lottery
    mapping (uint => address payable) public lotteryHistory; // a mapping of lottery IDs to the address of the winner of each lottery
    uint public fee = 0.1 ether; // the fee required to enter the lottery
    constructor() {
        owner = payable (msg.sender);
        lotteryId = 1;
    }
    function getWinnerByLottery(uint lottery) public view returns (address payable) {
        return lotteryHistory[lottery]; // get the address of the winner of a specific lottery by its ID
    }
    function getBalance() public view returns (uint) {
        return address(this).balance; // get the current balance of the contract
    }
    function getPlayers() public view returns (address payable[] memory) {
        return players; // get the array of addresses of the players in the lottery
    }
    function enter() public payable {
        require(msg.value > fee); // require that the value sent with the transaction is greater than the fee
        // add the address of the player entering the lottery to the array of players
        players.push(payable(msg.sender));
    }
    function getRandomNumber() public view returns (uint) {
        return uint(keccak256(abi.encodePacked(owner, block.timestamp))); // generate a random number based on the current block timestamp and the address of the owner
    }
    function pickWinner() public onlyowner {
        uint index = getRandomNumber() % players.length; // get a random index within the bounds of the array of players
        uint totalPrize = address(this).balance; // get the current balance of the contract
        uint ownerFee = (totalPrize * fee) / (1 ether); // calculate the fee for the owner
        uint winnings = totalPrize - ownerFee; // calculate the total winnings for the winner
        owner.transfer(ownerFee); // transfer the fee to the owner
        players[index].transfer(winnings); // transfer the winnings to the winner
        lotteryHistory[lotteryId] = players[index]; // add the address of the winner to the lottery history mapping
        lotteryId++; // increment the ID of the current lottery
        // reset the state of the contract by setting the array of players to an empty array
        players = new address payable[](0);
    }
    modifier onlyowner() {
        require(msg.sender == owner); // require that the caller of the function is the owner of the contract
        _; // continue executing the function
    }
}
