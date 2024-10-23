import React, { useState } from 'react';
import { ethers } from 'ethers';
import CarContract from '../../contracts/CarContract.json';
import { Button, Space, Typography, Form, Input } from 'antd';

async function createCar(brand, model, year, price) {
  if (typeof window.ethereum == 'undefined') {
    throw new Error("Metamask not found");
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const carContractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || '';
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  console.log(`carContractAddress: ${carContractAddress}`);
  const carAbi = CarContract.abi;
  const carContract = new ethers.Contract(carContractAddress, carAbi, signer);
  console.log(carContract);
  console.log(`Los parametros son brand: ${brand}, model: ${model}, year: ${year}, price: ${price}`);
  const gasEstimate = await carContract.createCar.estimateGas(brand, model, year, price);
  console.log(`Estimación de gas: ${gasEstimate.toString()}`);
  const tx = await carContract.createCar(brand, model, year, price);
  const receipt = await tx.wait();
  console.log('Transacción confirmada:', receipt);
  console.log('Car created successfully!');
}

const CreateCarForm = () => {
  const [newCarBrand, setNewCarBrand] = useState('');
  const [newCarModel, setNewCarModel] = useState('');
  const [newCarYear, setNewCarYear] = useState(0);
  const [newCarPrice, setNewCaPriced] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const handleFormSubmit = async (e) => {
    setIsLoading(true);
    await createCar(newCarBrand, newCarModel, newCarYear, newCarPrice);
    setIsLoading(false);
    e.preventDefault();
  }
  return (
    <Space direction="vertical">
      <Typography  >Create Car</Typography>
      <Form>
        <div className="form-group" display="flex" alignItems="center">
          <label htmlFor="brand">Brand:</label>
          <Input type="text" id="brand" name="brand" value={newCarBrand} onChange={e => setNewCarBrand(e.target.value)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="model">Model:</label>
          <Input type="text" id="model" name="model" value={newCarModel} onChange={e => setNewCarModel(e.target.value)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <Input type="number" id="year" name="year" value={newCarYear} onChange={e => setNewCarYear(parseInt(e.target.value))} required/>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <Input type="number" id="price" name="price" value={newCarPrice} onChange={e => setNewCaPriced(parseInt(e.target.value))} required/>
        </div>
        <Button type="primary" loading={isLoading} primary onClick={handleFormSubmit}>Create Car</Button>
      </Form>
    </Space>
  );
};

export default CreateCarForm;