// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./IEns.sol";
import "./IPriceRule.sol";

contract ReEntrancyGuard {
    bool internal locked;
    modifier noReentrant() {
        require(!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
    }
}

contract EnsTitle is ReEntrancyGuard {
  //ens contract address, same for Mainnet, Testnet
	address private _ensRegistry = address(0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e);
  //admin, who receive ETH from users who add title
  address payable private _admin = payable(0x1F79544C06bd94c044Bd388ffeE03FeE72025052); 

  //contract address to control title price
  address private _priceRule = address(0x0);

  //data store
  mapping(string => string[]) _titles;
  mapping(bytes32 => string) _titlesOwner;

  event TitleCreated (
    string title,
    string ens,
    address owner,
    uint price
  );

  event PriceChanged (
    address oldRule,
    address newRule
  );

  // get price of title
  function queryPrice(string memory title) public view returns (uint ) {
    if (_priceRule == address(0x0)) {
      return 1e15; // 0.001ETH ,dummy rule
    } else {
      return IPriceRule(_priceRule).getPrice(title);
    }
  }

  // set price rule, only admin can do this
  function setPriceRule(address ruleContractAddress) public noReentrant {
    require(msg.sender == _admin, "not permitted");
    address oldRule = _priceRule;
    _priceRule = ruleContractAddress;
    emit PriceChanged(oldRule, ruleContractAddress);
  }

  //add title for a user, with ETH payed
  function addTitle(
    string memory domainPrefix, 
    string memory newTitle) 
   public noReentrant payable  {
      require(msg.sender != address(0));
      //check invalid args
      require(bytes(newTitle).length>0, "title should not be empty");
      require(bytes(newTitle).length<64, "title too long");

      uint price_need = queryPrice(newTitle);
      require(msg.value > 0, "invalid pay");
      require(msg.value >= price_need, "price payed not enough");
      require(msg.sender.balance >= msg.value, "balance not enough");
    
      //check ownership
      address owner = domainOwner(domainPrefix);
      require(owner == msg.sender, "only ENS owner can add title");
      
      //check duplication
      bytes32 thash = keccak256(abi.encodePacked(newTitle));
      require(bytes(_titlesOwner[thash]).length==0, "title already occupied");
      // save data
      _titles[domainPrefix].push(newTitle);
      _titlesOwner[thash] = domainPrefix;
      _admin.transfer(msg.value);
      emit TitleCreated(newTitle, domainPrefix, owner, msg.value);
  }

  //check if title already used
  function checkTitleUsed(string memory title) public view returns (bool) {
    bytes32 thash = keccak256(abi.encodePacked(title));
    return bytes(_titlesOwner[thash]).length != 0;
  }

  function 
  getTitles(
    string memory domainPrefix
  ) public view returns (string[] memory) {
    return _titles[domainPrefix];
  }

  function domainOwner(string memory domainPrefix) private view returns (address) {
     bytes32 namehash = 0x0000000000000000000000000000000000000000000000000000000000000000;
    namehash = keccak256(
    abi.encodePacked(namehash, keccak256(abi.encodePacked('eth')))
    );
    namehash = keccak256(
    abi.encodePacked(namehash, keccak256(abi.encodePacked(domainPrefix)))
    );
    return IENS(_ensRegistry).owner(namehash);
  }

}

