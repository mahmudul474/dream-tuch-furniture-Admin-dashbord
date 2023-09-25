import React, { useState } from "react";
import { Form, Input, Button, InputNumber, Row, Col, Select } from "antd";
import { Option } from "antd/es/mentions";

const Variyetions = ({ setVariyationImageLink, attributes }) => {
  

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
  const [selectedValue, setSelectedValue] = useState('');

  // Function to handle the change event
  const handleSelectChange = (value) => {
    // Update the state with the selected value
    setSelectedValue(value);
  };

  const foundItem = attributes.length >0 && attributes.find((item) => item.label === selectedValue);
   

  return (
    <>
      <div
        style={{
          margin: "10px 0px ",
          border: "1px solid black",
          padding: "20px 10px ",
          borderRadius: "10px",
        }}
      >
        <h4 style={{ margin: "10px auto ", textAlign: "center" }}>
          Product Variyations
        </h4>
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
                        labelCol={{ span: 24 }} // Span the entire width for the label
                        wrapperCol={{ span: 24 }} // Span the entire width for the input
                        style={{
                          marginBottom: "2px",

                          fontWeight: "500",
                        }}
                      >
                        <input type="file" onChange={handleSingleImageUpload} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        labelCol={{ span: 24 }} // Span the entire width for the label
                        wrapperCol={{ span: 24 }} // Span the entire width for the input
                        style={{
                          marginBottom: "2px",

                          fontWeight: "500",
                        }}
                        label="Price"
                        name={[name, "price"]}
                      >
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
                        labelCol={{ span: 24 }} // Span the entire width for the label
                        wrapperCol={{ span: 24 }} // Span the entire width for the input
                        style={{
                          marginBottom: "2px",

                          fontWeight: "500",
                        }}
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
                                labelCol={{ span: 24 }} // Span the entire width for the label
                                wrapperCol={{ span: 24 }} // Span the entire width for the input
                                style={{
                                  marginBottom: "2px",

                                  fontWeight: "500",
                                }}
                              >
                                <Select
                                  style={{
                                    width: "100%",
                                  }}
                                  onChange={handleSelectChange} // Attach the event handler to the Select component
                                  value={selectedValue} 
                                  
                                >
                                  {attributes.length >0  && attributes.map((attribute) => (
                                    <Option value={attribute?.label}>
                                      {attribute?.label}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>

                              <Form.Item
                                label="Value"
                                name={[attributeName, "value"]}
                                labelCol={{ span: 24 }} // Span the entire width for the label
                                wrapperCol={{ span: 24 }} // Span the entire width for the input
                                style={{
                                  marginBottom: "2px",

                                  fontWeight: "500",
                                }}
                              >
                                <Select
                                  style={{
                                    width: "100%",
                                  }}
                                  placeholder="Select a category"
                                >
                                  {foundItem && foundItem.values.map(value=>
                                    <Option value={value}>
                                     {value}
                                  </Option>)}
                                </Select>
                                
                              </Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => removeAttribute(attributeName)}
                                style={{
                                  background: "red",
                                  color: "white",
                                  border: "1px solid red",
                                  marginTop: "5px",
                                  marginBottom: "5px",
                                }}
                              >
                                Remove Attribute
                              </Button>
                            </div>
                          )
                        )}
                        <Form.Item>
                          <Button
                            style={{
                              border: "1px solid green ",
                              background: "green",
                              color: "white",
                              margin: "10px 0px",
                            }}
                            type="dashed"
                            onClick={() => addAttribute()}
                          >
                            Add Attribute
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>

                  <Button
                    type="dashed"
                    onClick={() => remove(name)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "1px solid red",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    Remove variyations
                  </Button>
                </div>
              ))}

              <Form.Item>
                <Button
                  style={{
                    background: "red",
                    color: "white",
                    border: "1px solid red",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                  type="dashed"
                  onClick={() => add()}
                >
                  Add variyations
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
    </>
  );
};

export default Variyetions;
