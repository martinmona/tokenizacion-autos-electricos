import React, { useState } from "react";
import getCarContract from "../../utils/getCarContract";
import { Button, Space, message, Form, Input, InputNumber } from "antd";

const PutOnSaleForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  async function putCarOnSale(carId, price, kilometers) {
    setIsLoading(true);
    try {
      const carContract = await getCarContract();
      const gasEstimate = await carContract.putCarOnSale.estimateGas(
        carId,
        price,
        kilometers
      );
      console.log(`Estimación de gas: ${gasEstimate.toString()}`);
      const tx = await carContract.putCarOnSale(carId, price, kilometers);
      const receipt = await tx.wait();
      console.log("Auto en venta!", receipt);
      messageApi.success("El auto está ahora en venta");
    } catch (error) {
      console.error("error al querer poner auto en venta:", error);
      messageApi.error("No se pudo poner el auto en venta");
    } finally {
      setIsLoading(false);
    }
  }
  const handleFormSubmit = async (values) => {
    const { carId, price, kilometers } = values;
    await putCarOnSale(carId, price, kilometers);
  };
  return (
    <>
      {contextHolder}
      <Space direction="vertical">
        <Form
          name="putCarOnSaleForm"
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
            kilometers: 0,
            price: 0,
          }}
          onFinish={handleFormSubmit}
        >
          <Form.Item name="carId" label="Car ID">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="price">
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item name="kilometers" label="kilometers">
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Poner Auto en Venta
          </Button>
        </Form>
      </Space>
    </>
  );
};

export default PutOnSaleForm;
