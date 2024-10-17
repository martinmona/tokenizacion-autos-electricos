import { ethers } from "hardhat";

async function main() {
  const CarContract = await ethers.getContractFactory("CarContract");
  console.log("Deploying Car...");
  const carContract = await CarContract.deploy("Car", "CAR");
  await carContract.waitForDeployment();
  console.log("carContract deployed to:", await carContract.getAddress());
}

main();
