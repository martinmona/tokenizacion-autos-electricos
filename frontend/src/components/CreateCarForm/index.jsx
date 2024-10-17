
async function createCar() {
  if (typeof window.ethereum !== 'undefined') {
    throw new Error("Metamask not found");
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const carContractAddress = env.CONTRACT_ADDRESS || '';
  const carAbi = CarContract.abi;
  const carContract = new ethers.Contract(carContractAddress, carAbi, provider);
  const brand = 'Toyota';
  const model = 'Camry';
  const year = 2023;
  const price = 25000;

  const tx = await carContract.createCar(brand, model, year, price);
  await tx.wait();

  console.log('Car created successfully!');
} 