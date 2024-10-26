import React, { useState } from "react";
import { Button, Space, Input, Form, List } from "antd";
import getCarContract from "../../utils/getCarContract";
const mapState = ["Presale", "InSale", "Sold"];
const GetCar = () => {
  const [carId, setCarId] = useState(0);
  const [car, setCar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function getCar(values) {
    setIsLoading(true);
    const { carId } = values;
    try {
      const carContract = await getCarContract();
      const car = await carContract.getCar(carId);
      setCar([
        `Marca: ${car[0]}`,
        `Modelo: ${car[1]}`,
        `Año: ${car[2]}`,
        `Precio: ${car[3]}`,
        `Kilometros: ${car[4]}`,
        `Estado: ${mapState[car[5]]}`,
      ]);
      console.log("Auto obtenido:", car);
    } catch (error) {
      console.error("Error al querer obtener el auto:", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Space direction="vertical">
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
          year: 2024,
          price: 0,
        }}
        onFinish={getCar}
      >
        <Form.Item label="Car ID" name="carId">
          <Input onChange={(e) => setCarId(e.target.value)}></Input>
        </Form.Item>
        <Button htmlType="submit" loading={isLoading}>
          {" "}
          Obtener Auto{" "}
        </Button>
      </Form>
      <List
        dataSource={car}
        renderItem={(item) => (
          <List.Item>
            {item}
          </List.Item>
        )}
      ></List>
    </Space>
  );
};

export default GetCar;
