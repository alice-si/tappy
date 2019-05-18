pragma solidity >=0.5.0 <0.6.0;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol';

contract Token is ERC20, ERC20Detailed, ERC20Mintable {
  constructor()
    ERC20Mintable()
    ERC20Detailed('Homelink Token', 'HLT', 0)
    ERC20()
    public
  { }
}
