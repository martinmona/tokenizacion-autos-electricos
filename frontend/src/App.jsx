// src/App.jsx

import ConnectWallet from "./components/ConnectWallet";
import CreateCarForm from "./components/CreateCarForm";
import SellCarForm from "./components/SellCarForm";
import GetCar from "./components/GetCar";
import PutOnSaleForm from "./components/PutOnSaleForm";
import { useState, useEffect } from "react";
import { Button, Space, Card } from "antd";

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
  const [account, setAccount] = usePersistedState("account", 0);
  const logOut = (event) => setAccount(0);

  return (
    <div style={{ textAlign: "center" }}>
      {account ? (
        <Space
          direction="vertical"
          size="middle"
          style={{
            display: "flex",
          }}
        >
          <p>
            Billetera conectada: {account} -{" "}
            <Button onClick={logOut}>Desconectar</Button>
          </p>
          <Card title="Obtener Auto" >
            <GetCar />
          </Card>
          <Card title="Crear Auto">
            <CreateCarForm />
          </Card>
          <Card title="Poner en venta">
            <PutOnSaleForm />
          </Card>
          <Card title="Vender Auto">
            <SellCarForm />
          </Card>
        </Space>
      ) : (
        <ConnectWallet setAccount={setAccount} />
      )}
    </div>
  );
}

export default App;
