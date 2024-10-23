// src/App.jsx

import ConnectWallet from './components/ConnectWallet';
import CreateCarForm from './components/CreateCarForm';
import { useState, useEffect } from 'react';

function App() {
  function usePersistedState(key, initialValue) {
    const [state, setState] = useState(() => {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    });
  
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
  
    return [state, setState];
  }
  const [account, setAccount] = usePersistedState('count', 0);

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
