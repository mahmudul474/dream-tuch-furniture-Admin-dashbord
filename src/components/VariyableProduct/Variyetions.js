import React, { useState } from "react";
import { Form, Input, Button, InputNumber, Row, Col } from "antd";

const Variyetions = ({ setVariyationImageLink }) => {
  const handleSingleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=70fb97e516483d52ddf8b1cd4d5d1698",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setVariyationImageLink(data.data.url);
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  return (
    <>
      <Form.List
        name="variyations"
        initialValue={[
          {
            image: "", // Initialize with default values if needed
            price: "",
            stock: "",
            attributes: [
              {
                label: "",
                value: "",
              },
            ],
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div key={key}>
                {/* Your variation fields */}

                <Row gutter={16}>
                  {/* Single-column Form.Item */}
                  <Col span={24}>
                    <Form.Item
                      name={[name, "image"]}
                      label="Upload Image"
                      rules={[
                        {
                          required: true,
                          message: "Please Upload Thumbnail",
                        },
                      ]}
                    >
                      <input type="file" onChange={handleSingleImageUpload} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label="Price" name={[name, "price"]}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Stock"
                      name={[name, "stock"]}
                      rules={[
                        {
                          required: true,
                          message: "Please enter the stock quantity",
                        },
                      ]}
                    >
                      <InputNumber min={0} />
                    </Form.Item>
                  </Col>
                </Row>

                {/* Attribute fields */}
                <Form.List name={[name, "attributes"]}>
                  {(
                    attributeFields,
                    { add: addAttribute, remove: removeAttribute }
                  ) => (
                    <>
                      {attributeFields.map(
                        ({
                          key: attributeKey,
                          name: attributeName,
                          fieldKey: attributeFieldKey,
                          ...attributeRestField
                        }) => (
                          <div key={attributeKey}>
                            <Form.Item
                              label="Label"
                              name={[attributeName, "label"]}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              label="Value"
                              name={[attributeName, "value"]}
                            >
                              <Input />
                            </Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => removeAttribute(attributeName)}
                              style={{ marginLeft: "20px" }}
                            >
                              Remove Attribute
                            </Button>
                          </div>
                        )
                      )}
                      <Form.Item>
                        <Button type="dashed" onClick={() => addAttribute()}>
                          Add Attribute
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>

                <Button
                  type="dashed"
                  onClick={() => remove(name)}
                  style={{ marginLeft: "20px" }}
                >
                  Remove variyations
                </Button>
              </div>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()}>
                Add variyations
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default Variyetions;
