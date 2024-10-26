import { ethers } from "ethers";
import CarContract from "../contracts/CarContract.json";
const getCarContract = async () => {
  if (typeof window.ethereum == "undefined") {
    throw new Error("Metamask not found");
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const carContractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || "";
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const carAbi = CarContract.abi;
  const carContract = new ethers.Contract(
    carContractAddress,
    carAbi,
    signer
  );
  return carContract
}

export default getCarContract;
