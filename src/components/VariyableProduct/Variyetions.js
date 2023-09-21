import React from "react";
import { Form, Input, InputNumber, Button } from "antd";

const Variyetions = () => {
  return (
    <>
      <Form.Item
        name="_id"
        label="_id"
        rules={[{ required: true, message: "Please enter _id" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="image"
        label="Image"
        rules={[{ required: true, message: "Please enter image" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: "Please enter price" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="stock"
        label="Stock"
        rules={[{ required: true, message: "Please enter stock" }]}
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.List name="attribute">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div key={key}>
                <Form.Item
                  label="Label"
                  name={[name, "label"]}
                  fieldKey={[fieldKey, "label"]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Value"
                  name={[name, "value"]}
                  fieldKey={[fieldKey, "value"]}
                >
                  <Input />
                </Form.Item>
                <Button
                  type="dashed"
                  onClick={() => remove(name)}
                  style={{ marginLeft: "20px" }}
                >
                  Remove Attribute
                </Button>
              </div>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()}>
                Add Attribute
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default Variyetions;
