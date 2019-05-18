pragma solidity >=0.5.0 <0.6.0;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

import './Token.sol';

contract Building is Ownable {
  using SafeMath for uint;

  enum Perk {
    INSTANT_CASH,
    SAVINGS_BONUS
  }

  uint public SECONDS_IN_PERIOD = 172800; // for demo purposes we use 2 days instead of 1 month

  Token token;
  uint instantCashAmount;
  uint savingsBonusAmount;
  uint public creationTime;

  mapping(address => bool) isTenant;
  mapping(address => uint) tenantSavings;
  mapping(address => mapping(uint => bool)) wasOutcomeCompleted;

  event TenantEnrolled(address indexed tenant,
                       uint period);

  event OutcomeAchieved(address indexed tenant,
                        uint period,
                        uint instantCash,
                        uint savingsBonus);

  event TenantGraduated(address indexed tenant,
                        uint period);

  constructor(Token _token,
              uint _instantCashAmount,
              uint _savingsBonusAmount) public {
    token = _token;
    instantCashAmount = _instantCashAmount;
    savingsBonusAmount = _savingsBonusAmount;
    creationTime = block.timestamp;
  }

  function payIn(uint amount) public {
    bool success = token.transferFrom(msg.sender, address(this), amount);
    require(success);
  }

  function onboardTenant(address tenant) public onlyOwner {
    isTenant[tenant] = true;
    emit TenantEnrolled(tenant, currentPeriod());
  }

  function claimOutcome(uint period, Perk perk) public onlyTenant {
    address tenant = msg.sender;
    require(
      period == currentPeriod(),
      'Period is not the current period');
    require(
      !wasOutcomeCompleted[tenant][period],
      'Outcome was already completed');

    wasOutcomeCompleted[tenant][period] = true;

    if (perk == Perk.INSTANT_CASH) {
      require(
        token.balanceOf(address(this)) >= instantCashAmount,
        'Not enough building funds');

      token.transfer(tenant, instantCashAmount);
      emit OutcomeAchieved(tenant, period, instantCashAmount, 0);
    } else {
      tenantSavings[tenant] += savingsBonusAmount;
      emit OutcomeAchieved(tenant, period, 0, savingsBonusAmount);
    }
  }

  function cashOut() public onlyTenant {
    address tenant = msg.sender;
    require(
      token.balanceOf(address(this)) >= tenantSavings[tenant],
      'Not enough building funds');

    token.transfer(tenant, tenantSavings[tenant]);
    tenantSavings[tenant] = 0;
    isTenant[tenant] = false;
    emit TenantGraduated(tenant, currentPeriod());
  }

  function isActiveTenant(address addr) public view returns (bool) {
    return isTenant[addr];
  }

  function getSavings(address tenant) public view returns (uint) {
    return tenantSavings[tenant];
  }

  function currentPeriod() private view returns (uint) {
    return timestampToPeriod(block.timestamp);
  }

  function timestampToPeriod(uint timestamp) private view returns (uint) {
    return timestamp.sub(creationTime).div(SECONDS_IN_PERIOD);
  }

  modifier onlyTenant() {
    require(isTenant[msg.sender], 'Can only be called by a tenant');
    _;
  }
}
