// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarContract is ERC721, Ownable {
    uint256 public immutable MAX_SUPPLY;
    uint256 internal _numAvailableRemainingTokens;
    mapping(uint256 => Car) private cars;
    uint256 private _tokenIdCounter = 0;
    enum CarState {
        Presale,
        InSale,
        Sold
    }

    struct Car {
        string brand;
        string model;
        uint256 year;
        uint256 price;
        uint256 kilometers;
        CarState state;
    }

    event CarStateChanged(uint256 carId, CarState newCarState);
    event CarCreated(Car newCar);

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 maxSupply
    ) ERC721(_name, _symbol) Ownable(msg.sender) {
        MAX_SUPPLY = maxSupply;
    }

    receive() external payable {
        revert("This contract does not accept Ether");
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        require(cars[tokenId].state == CarState.InSale, "Car not for sale");
        super.transferFrom(from, to, tokenId);
    }

    function createCar(
        string memory brand,
        string memory model,
        uint256 year,
        uint256 price
    ) public onlyOwner returns (uint256) {
        require(year >= 1900, "Year must be greater than 1900");
        require(_tokenIdCounter < MAX_SUPPLY, "Max supply reached");
        Car memory car = Car(
            brand,
            model,
            year,
            price,
            0,
            CarState.Presale
        );
        uint256 carId = _tokenIdCounter;
        cars[carId] = car;
        _tokenIdCounter += 1;
        _safeMint(msg.sender, carId);
        emit CarCreated(car);
        return carId;
    }

    function getCar(uint256 carId) public view returns (Car memory) {
        return cars[carId];
    }

    function putCarOnSale(
        uint256 carId,
        uint256 price,
        uint256 kilometers
    ) public {
        require(
            ownerOf(carId) == msg.sender,
            "You are not the owner of this car"
        );
        require(cars[carId].state == CarState.Presale, "Car is already on sale");
        require(cars[carId].kilometers <= kilometers, "The car can't have less kilometers");
        cars[carId].price = price;
        cars[carId].kilometers = kilometers;
        cars[carId].state = CarState.InSale;
        emit CarStateChanged(carId, CarState.InSale);
    }

    function sellCar(uint256 carId, address newOwner) public {
        require(
            ownerOf(carId) == msg.sender,
            "You are not the owner of this car"
        );
        require(cars[carId].state == CarState.InSale, "Car is not on sale");
        safeTransferFrom(msg.sender, newOwner, carId);
        cars[carId].state = CarState.Sold;
        emit CarStateChanged(carId, CarState.Sold);
    }
}
