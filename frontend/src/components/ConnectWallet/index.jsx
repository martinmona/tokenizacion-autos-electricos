import { Button } from 'antd';
import { ethers } from 'ethers';

const connectWallet = async (setAccount) => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
      console.log('Billetera conectada:', accounts[0]);
    } catch (error) {
      console.error('Error al conectar la billetera:', error);
    }
  } else {
    alert('Por favor, instala MetaMask.');
  }
};

const ConnectWallet = ({setAccount}) => {

  return <>
    <h1>Conecta tu Wallet</h1>
    <Button onClick={() => connectWallet(setAccount)}>Conectar Wallet</Button>
  </>
}

export default ConnectWallet