pragma solidity ^0.5.0;

import "../tokens/ERC20.sol";


contract ERC20Mock is ERC20 {

  string public name;
  string public symbol;
  uint256 public decimals;

  constructor (string memory _name, string memory _symbol, uint256 _decimals, uint256 _supply) public {
    address _sender = msg.sender;
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
    _balances[_sender] = _supply;
    _totalSupply = _supply;
    emit Transfer(address(0), _sender, _supply);
  }

}