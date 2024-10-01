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
    address owner;
    string state; // Presale, In sale, Sold
  }

  event CarStateChanged(uint256 carId, string value);
  event CarCreated(Car newCar);

  constructor(
      string memory _name,
      string memory _symbol
  ) ERC721(_name, _symbol) Ownable(msg.sender) {}

  function createCar(string memory brand, string memory model, uint16 year, uint16 price) public onlyOwner returns (uint256) {
    Car memory car = Car(brand, model, year, price, 0, msg.sender, "Presale");
    uint256 carId = _tokenIdCounter;
    _tokenIdCounter++;
    cars[carId] = car;
    _safeMint(msg.sender, carId);
    emit CarCreated(car);
    return carId;
  }

  function getCar(uint256 carId) public view returns (Car memory) {
    return cars[carId];
  }

  function putCarOnSale(uint256 carId, uint16 price, uint64 kilometers) public {
    require(cars[carId].owner == msg.sender, "You are not the owner of this car");
    cars[carId].price = price;
    cars[carId].kilometers = kilometers;
    cars[carId].state = "In sale";
    emit CarStateChanged(carId, "In sale");
  }

  function sellCar(uint256 carId, address newOwner) public {
    require(cars[carId].owner == msg.sender, "You are not the owner of this car");
    cars[carId].state = "Sold";
    emit CarStateChanged(carId ,"Sold");
    cars[carId].owner = newOwner;
  }
}