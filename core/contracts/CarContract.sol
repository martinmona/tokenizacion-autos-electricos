// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarContract is ERC721, Ownable {
  uint16 public immutable MAX_SUPPLY;
  uint16 internal _numAvailableRemainingTokens;
  mapping(uint256 => Car) public cars;
  uint256 internal _tokenIdCounter = 0;


  struct Car {
    string brand;
    string model;
    uint16 year;
    uint16 price;
    uint64 kilometers;
    string state; // Fabricando, Disponible, Vendido
  }

  constructor(
      string memory _name,
      string memory _symbol
  ) ERC721(_name, _symbol) Ownable(msg.sender) {}

  function createCar(string memory brand, string memory model, uint16 year, uint16 price, address to) public onlyOwner returns (uint256) {
    Car memory car = Car(brand, model, year, price, 0, "Fabricando");
    uint256 carId = _tokenIdCounter;
    _tokenIdCounter++;
    cars[carId] = car;
    _safeMint(to, carId);
    return carId;
  }

  function getCar(uint256 carId) public view returns (Car memory) {
    return cars[carId];
  }
}