pragma solidity >=0.5.0 <0.6.0;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol';
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract Token is ERC20, ERC20Detailed, ERC20Mintable, Ownable  {

  constructor()
    ERC20Mintable()
    ERC20Detailed('Tappy Token', 'TPT', 0)
    ERC20()
    Ownable()
    public
  { }


  function burn(address _account, uint256 _value) public onlyOwner {
    _burn(_account, _value);
  }
}
