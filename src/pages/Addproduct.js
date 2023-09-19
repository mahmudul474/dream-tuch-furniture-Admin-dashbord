import React, { useState } from "react";
import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Select, Space } from "antd";
import "./Addproduct.css";
import { Option } from "antd/es/mentions";
import ProductImgUpload from "../components/Image-Upload/ProductImgUpload";

const Addproduct = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const [price, setPrice] = useState(null);
  const [discountType, setDiscountType] = useState("fixed");
  const [discountValue, setDiscountValue] = useState(null);

  const handlePriceChange = (value) => {
    // Ensure that the value is numeric
    if (!isNaN(value)) {
      setPrice(value);
    }
  };

  const handleDiscountValueChange = (value) => {
    if (!isNaN(value)) {
      setDiscountValue(value);
    }
  };

  const calculateDiscountedPrice = () => {
    if (discountType === "fixed") {
      return price - discountValue;
    } else if (discountType === "percentage") {
      const discountAmount = (price * discountValue) / 100;
      return price - discountAmount;
    }
    return price;
  };

  const [form] = Form.useForm();

  const [attributes, setAttributes] = useState([{ label: "", values: [] }]);

 

  const addAttribute = () => {
    const newAttributes = [...attributes, { label: "", values: [] }];
    setAttributes(newAttributes);
  };

  const handleLabelChange = (index, value) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index].label = value;
    setAttributes(updatedAttributes);
  };

  const handleValuesChange = (index, values) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index].values = values;
    setAttributes(updatedAttributes);
  };

  const onFinish = (values) => {
    console.log("Product Details:", values);
    // You can submit the form data to your backend API here
  };

  return (
    <>
      <div>
        <div style={{ margin: "auto", textAlign: "center" }}>
          <h4>Add Product</h4>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "30px",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <div>
            <label
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                paddingRight: "10px",
              }}
            >
              Product Type
            </label>
          </div>
          <div style={{ width: "50%" }}>
            {" "}
            <Select
              defaultValue="Simple Product"
              style={{
                width: "100%",
              }}
              onChange={handleChange}
              options={[
                {
                  value: "simple product",
                  label: "Simple Product",
                },
                {
                  value: "Variable Product",
                  label: "Variable Product",
                },
              ]}
            />
          </div>
        </div>
        <br></br>

        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please enter the product name" },
            ]}
          >
            <label>Product Name</label>
            <Input placeholder="Example: Door" size="large" />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter the product description",
              },
            ]}
          >
            <label>Description</label>
            <ReactQuill style={{ height: "150px" }} theme="snow" />
          </Form.Item>
          <br></br>
          <br></br>

          <Form.Item name="short_description">
            <label>Short Description</label>
            <ReactQuill style={{ height: "150px" }} theme="snow" />
          </Form.Item>

          <br />
          <br />
          <Form.Item
            label="Stock"
            name="stock"
            rules={[
              { required: true, message: "Please enter the stock quantity" },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item
            name="Price"
            rules={[
              {
                required: true,
                message: "Please  enter the price",
              },
            ]}
          >
            <lable>Price (৳)</lable>
            <div>
              <input
                type="number"
                placeholder={`Example: 10000  `}
                style={{ width: "30%", padding: "5px" }}
                defaultValue={price}
                onChange={(e) => handlePriceChange(parseFloat(e.target.value))}
              />
            </div>
          </Form.Item>

          <div style={{ display: "flex" }}>
            <div>
              <Form.Item
                name="discountType"
                rules={[
                  {
                    required: true,
                    message: "Please  Select discountType",
                  },
                ]}
              >
                <label>Discount Type</label>
                <Select
                name="discountType"
                  value={discountType}
                  onChange={(value) => setDiscountType(value)}
                  style={{ width: "100%" }}
                >
                  <Option value="fixed">Fixed Amount</Option>
                  <Option value="percentage">Percentage</Option>
                </Select>
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name="discountValue"
                rules={[
                  {
                    required: true,
                    message: "Please  enter the price",
                  },
                ]}
              >
                <label>Amount</label>
                <input
                  name="discountValue"
                  type="number"
                  style={{ width: "100%", padding: "5px" }}
                  defaultValue={discountValue}
                  onChange={(e) =>
                    handleDiscountValueChange(parseFloat(e.target.value))
                  }
                />
              </Form.Item>
            </div>
          </div>

          <ProductImgUpload></ProductImgUpload>

          {attributes.map((attribute, index) => (
            <Space key={index} style={{ marginBottom: 8 }}>
              <Form.Item
                label={`Attribute ${index + 1}`}
                name={["attributes", index, "label"]}
                rules={[
                  {
                    required: true,
                    message: "Please enter the attribute label",
                  },
                ]}
              >
                <Input
                  placeholder="Attribute Label"
                  onChange={(e) => handleLabelChange(index, e.target.value)}
                  value={attribute.label}
                />
              </Form.Item>

              <Form.Item
                name={["attributes", index, "values"]}
                label="Attribute Values"
                rules={[
                  {
                    required: true,
                    message: "Please enter at least one attribute value",
                    type: "array",
                  },
                ]}
              >
                <Select
                  mode="tags"
                  width="100%"
                  tokenSeparators={[","]}
                  placeholder="Attribute Values"
                  onChange={(values) => handleValuesChange(index, values)}
                  value={attribute.values}
                />
              </Form.Item>
            </Space>
          ))}

          {/* Add Attribute Button */}
          <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
            <Button type="dashed" onClick={addAttribute} block>
              + Add Attribute
            </Button>
          </Form.Item>

          <Form.Item
            label="Tags"
            name="tags"
            rules={[
              {
                required: true,
                message: "Please enter at least one tag",
                type: "array",
              },
            ]}
          >
            <Select
              mode="tags"
              tokenSeparators={[","]}
              placeholder="Select tags"
            >
              <Option value="black_friday">black_friday</Option>
            </Select>
          </Form.Item>

          <div
            style={{
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "10px",
              border: "1px solid grey",
            }}
          >
            <h6 style={{ textAlign: "center" }}>META DATA</h6>

            <Form.Item name="title">
              <label>Title</label>
              <Input placeholder="Enter the product title" />
            </Form.Item>

            <Form.Item name="description">
              <label>Description</label>
              <Input.TextArea
                style={{
                  height: "200px",
                }}
                placeholder="Enter the product description"
              />
            </Form.Item>
          </div>

          <div
            style={{
              margin: "auto ",
              marginTop: "20px",
              width: "full",
              textAlign: "center",
            }}
          >
            <Form.Item>
              <Button
                type="primary"
                style={{ margin: "auto" }}
                htmlType="submit"
              >
                Add Product
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Addproduct;
