// src/App.jsx
import { useState } from 'react';
import { ethers } from 'ethers';
import CarContract from './contracts/CarContract';
import ConnectWallet from './components/ConnectWallet';
import CreateCarForm from './components/CreateCarForm';

function App() {
  const [account, setAccount] = useState(null);

  return (
    <div style={{ textAlign: 'center' }}>
      {account ? (
        <>
          <p>Billetera conectada: {account}</p>
          <CreateCarForm />
        </>
      ) : (
        <ConnectWallet setAccount={setAccount} />
      )}
    </div>
  );
}

export default App;
