import React from 'react';
import { ethers } from 'ethers';
import CarContract from '../../contracts/CarContract';
async function createCar() {
  if (typeof window.ethereum == 'undefined') {
    throw new Error("Metamask not found");
  }
  const brand = 'Toyota';
  const model = 'Camry';
  const year = 2023;
  const price = 25000;

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const carContractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || '';
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  console.log(`carContractAddress: ${carContractAddress}`);
  const carAbi = CarContract.abi;
  const carContract = new ethers.Contract(carContractAddress, carAbi, signer);
  console.log(carContract);
  const gasEstimate = await carContract.estimateGas.createCar(brand, model, year, price);
  console.log(`Estimación de gas: ${gasEstimate.toString()}`);

  const tx = await carContract.createCar(brand, model, year, price, {
    gasLimit: gasEstimate,
  });
  const receipt = await tx.wait();
  console.log('Transacción confirmada:', receipt);


  console.log('Car created successfully!');
}

const CreateCarForm = () => {
  return (
    <div className="create-car-form">
      <h2>Create Car</h2>
      <form>
        <div className="form-group">
          <label htmlFor="brand">Brand:</label>
          <input type="text" id="brand" name="brand" />
        </div>
        <div className="form-group">
          <label htmlFor="model">Model:</label>
          <input type="text" id="model" name="model" />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <input type="number" id="year" name="year" />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" />
        </div>
        <button type="button" onClick={createCar}>Create Car</button>
      </form>
    </div>
  );
};

export default CreateCarForm;