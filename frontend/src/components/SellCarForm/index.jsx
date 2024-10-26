import React, { useState } from "react";
import getCarContract from "../../utils/getCarContract";
import { Button, Space, message, Form, Input } from "antd";

const SellCarForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  async function sellCar(carId, address) {
    setIsLoading(true);
    try {
      const carContract = await getCarContract();
      const gasEstimate = await carContract.sellCar.estimateGas(carId, address);
      console.log(`Estimación de gas: ${gasEstimate.toString()}`);
      const tx = await carContract.sellCar(carId, address);
      const receipt = await tx.wait();
      console.log("Auto vendido", receipt);
      messageApi.success("Auto vendido!");
    } catch (error) {
      console.error("Error al querer vender auto:", error);
      messageApi.error("No se pudo vender el auto");
    } finally {
      setIsLoading(false);
    }
  }
  const handleFormSubmit = async (values) => {
    const { carId, address } = values;
    await sellCar(carId, address);
  };
  return (
    <>
      {contextHolder}
      <Space direction="vertical">
        <Form
          name="SellCar"
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
          <Form.Item name="carId" label="Car ID">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Vender Auto
          </Button>
        </Form>
      </Space>
    </>
  );
};

export default SellCarForm;
