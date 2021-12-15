// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./IEns.sol";

contract EnsTitle {
  //ens contract address, same for Mainnet, Testnet
	address private _ensRegistry = address(0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e);

  mapping(string => string[]) _titles;
  mapping(bytes32 => string) _titlesOwner;

  function addTitle(
    string memory domainPrefix, 
    string memory newTitle) 
   public returns (bool) {
      require(msg.sender != address(0));
      //check invalid args
      require(bytes(newTitle).length>0, "title should not be empty");
      require(bytes(newTitle).length<64, "title too long");
     
      //check ownership
      address owner = domainOwner(domainPrefix);
      require(owner == msg.sender, "only ENS owner can add title");
      
      //check duplication
      bytes32 thash = keccak256(abi.encodePacked(newTitle));
      require(bytes(_titlesOwner[thash]).length==0, "title already occupied");
      // save data
      _titles[domainPrefix].push(newTitle);
      _titlesOwner[thash] = domainPrefix;
      return true;
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

