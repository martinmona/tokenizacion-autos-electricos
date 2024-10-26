import React, { useState } from "react";
import { ethers } from "ethers";
import CarContract from "../../contracts/CarContract.json";
import { Button, Space, message, Form, Input, InputNumber } from "antd";
import getCarContract from "../../utils/getCarContract";

const CreateCarForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  async function createCar(brand, model, year, price) {
    setIsLoading(true);
    try {
      const carContract = await getCarContract();
      console.log(
        `Los parametros son brand: ${brand}, model: ${model}, year: ${year}, price: ${price}`
      );
      const gasEstimate = await carContract.createCar.estimateGas(
        brand,
        model,
        year,
        price
      );
      console.log(`Estimación de gas: ${gasEstimate.toString()}`);
      const tx = await carContract.createCar(brand, model, year, price);
      const receipt = await tx.wait();
      console.log("Auto creado correctamente:", receipt);
      messageApi.success("Auto creado correctamente");
    } catch (error) {
      console.error("Error al querer crear el auto:", error);
      messageApi.error("No se pudo crear el auto");
    } finally {
      setIsLoading(false);
    }
  }

  const handleFormSubmit = async (values) => {
    const { brand, model, year, price } = values;
    await createCar(brand, model, year, price);
  };
  return (
    <>
      {contextHolder}
      <Space direction="vertical">
        <Form
          name="CreateCar"
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
          onFinish={handleFormSubmit}
        >
          <Form.Item label="Marca" name="brand">
            <Input type="text" id="brand" required />
          </Form.Item>
          <Form.Item label="Modelo" name="model">
            <Input type="text" id="model" required />
          </Form.Item>
          <Form.Item label="Año" name="year">
            <InputNumber
              style={{
                width: "100%",
              }}
              id="year"
              required
            />
          </Form.Item>
          <Form.Item label="Precio" name="price">
            <InputNumber
              style={{
                width: "100%",
              }}
              id="price"
              required
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Crear Auto
          </Button>
        </Form>
      </Space>
    </>
  );
};

export default CreateCarForm;
