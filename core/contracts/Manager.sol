pragma solidity >=0.5.0 <0.6.0;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

import './Token.sol';

contract Manager is Ownable {
    using SafeMath for uint;

    Token token;
    uint instantCashAmount;
    uint savingsBonusAmount;
    uint public creationTime;

    mapping(address => bool) isLoader;
    mapping(address => bool) isUnLoader;
    mapping(bytes32 => uint) holdings;

    uint assetsHold = 0;

    event LoaderAdded(address indexed loader);
    event UnLoaderAdded(address indexed unLoader);

    event AssetLoaded(address indexed loader, bytes32 hash, uint value, uint256 time);
    event AssetUnLoaded(address indexed unloader, bytes32 hash, uint value, uint256 time);

    modifier onlyLoader() {
        require(checkIsLoader(msg.sender) == true, 'Can only be called by a registered loader');
        _;
    }

    modifier onlyUnLoader() {
        require(checkIsUnLoader(msg.sender), 'Can only be called by a registered unLoader');
        _;
    }


    constructor(Token _token) public {
        token = _token;
    }

    function addLoader(address _loader) public onlyOwner {
        isLoader[_loader] = true;
        emit LoaderAdded(_loader);
    }

    function addUnLoader(address _unLoader) public onlyOwner {
        isUnLoader[_unLoader] = true;
        emit UnLoaderAdded(_unLoader);
    }

    function load(bytes32 _hash, uint _amount) public onlyLoader {
        //require(holdings[_hash] == 0, "Card is already full");
        require(getAvailableAssets() >= _amount, "Not enough assets left");

        holdings[_hash] = _amount;
        assetsHold = assetsHold.add(_amount);
        emit AssetLoaded(msg.sender, _hash, _amount, now);
    }

    function unLoad(string memory _id, string memory _code) public onlyUnLoader {

        bytes32 hash = keccak256(abi.encode(_id, _code));
        uint amount = holdings[hash];
        require(amount > 0, "Card is empty");

        holdings[hash] = 0;
        assetsHold = assetsHold.sub(amount);

        token.transfer(msg.sender, amount);
        emit AssetUnLoaded(msg.sender, hash, amount, now);
    }

    function checkIsLoader(address _account) public view returns(bool) {
        return isLoader[_account];
    }

    function checkIsUnLoader(address _account) public view returns (bool) {
        return isUnLoader[_account];
    }

    function getAvailableAssets() public view returns (uint) {
        return token.balanceOf(address(this)).sub(assetsHold);
    }

}
