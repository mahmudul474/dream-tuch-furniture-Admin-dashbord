import React, { useState } from "react";
import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Select, Space } from "antd";
import "./Addproduct.css";
import { CloseOutlined } from "@ant-design/icons";

import { Option } from "antd/es/mentions";
import ProductImgUpload from "../components/Image-Upload/ProductImgUpload";

import axios from "axios";
import Variyetions from "../components/VariyableProduct/Variyetions";

const Addproduct = () => {
  const [form] = Form.useForm();
  const [discountType, setDiscountType] = useState("fixed");
  const [discountValue, setDiscountValue] = useState(null);
  const [productType, setProductType] = useState("simple_product");
  const handleChange = (value) => {
    setProductType(value);
    setShowAdditionalFields(value === "variable_product");
  };

  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const handleDiscountValueChange = (value) => {
    if (!isNaN(value)) {
      setDiscountValue(value);
    }
  };
  // const calculateDiscountedPrice = () => {
  //   if (discountType === "fixed") {
  //     return price - discountValue;
  //   } else if (discountType === "percentage") {
  //     const discountAmount = (price * discountValue) / 100;
  //     return price - discountAmount;
  //   }
  //   return price;
  // };

  const [multipleImageLinks, setMultipleImageLinks] = useState([]);
  const [singleImageLink, setSingleImageLink] = useState(null);
  const [variyationImageLink, setVariyationImageLink] = useState(null);

  const [attributes, setAttributes] = useState([{ label: "", values: [] }]);
  const addAttribute = () => {
    const newAttributes = [...attributes, { label: "", values: [] }];
    setAttributes(newAttributes);
  };

  const removeAttribute = (indexToRemove) => {
    // Implement your remove attribute logic here
    const updatedAttributes = [...attributes];
    updatedAttributes.splice(indexToRemove, 1);
    setAttributes(updatedAttributes);
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

  const [selectedCategory, setSelectedCategory] = useState("All-Door"); // Initialize with an empty string or any default value

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const category = [
    {
      _id: 0,
      title: "All-Door",
    },
    {
      _id: 1,
      title: "Sofa",
    },
    {
      _id: 2,
      title: "Center-Table",
    },
    {
      _id: 3,
      title: "Diven",
    },
    {
      _id: 4,
      title: "Tv Cabinet",
    },
    {
      _id: 5,
      title: "Open Shelves",
    },
    {
      _id: 6,
      title: "Dinning",
    },
    {
      _id: 7,
      title: "Dinning-Chair",
    },
    {
      _id: 8,
      title: "Dinner Wagon",
    },
    {
      _id: 9,
      title: "Bed",
    },
    {
      _id: 10,
      title: "Dressing Table",
    },
    {
      _id: 11,
      title: "Wardrope",
    },
    {
      _id: 12,
      title: "Mattres",
    },
    {
      _id: 13,
      title: "Chest Of Table",
    },
    {
      _id: 14,
      title: "Reading Table",
    },
    {
      _id: 15,
      title: "SmartFit",
    },
    {
      _id: 16,
      title: "Kitchen",
    },
    {
      _id: 17,
      title: "Door",
    },
    {
      _id: 18,
      title: "Executive Table",
    },
  ];

  const onFinish = (values) => {
    // let variableProducts = [];
    // const variyetionfo = values?.variyations.map((variyable) => {
    //   const product = {
    //     price: variyable.price,
    //     stock: variyable.stock,
    //     attributes: variyable.attributes,
    //     image: variyationImageLink,
    //   };
    //   variableProducts.push(product);
    // });

    const product = {
      name: values?.name,
      category: selectedCategory,
      productType: productType,
      price: values?.price,
      discount: {
        type: values.discountType,
        value: values?.Discountamout,
      },
      images: multipleImageLinks,
      thumbnail: singleImageLink,
      stock: values.stock,
      description: values.description,
      short_description: values.short_description,
      attributes: values.attributes,
      tags: values.tags,
      metadata: {
        title: values?.MetaTitle,
        description: values?.MetaDescription,
      },
      variableProducts:
        productType === "variable_product" ? values?.variyations : [],
    };

    axios
      .post(`https://site-api.trelyt.store/api/v1/products`, product)
      .then((response) => {
        // Handle the response data here
        console.log("Response:", response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error:", error);
      });
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
                fontWeight: "500",
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
                  value: "simple_product",
                  label: "Simple Product",
                },
                {
                  value: "variable_product",
                  label: "Variable Product",
                },
              ]}
            />
          </div>
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
                fontWeight: "500",
                paddingRight: "10px",
              }}
            >
              Category Type
            </label>
          </div>
          <div style={{ width: "50%" }}>
            {" "}
            <Select
              style={{
                width: "100%",
              }}
              placeholder="Select a category"
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              {category.map((cat) => (
                <Option key={cat._id} value={cat.title}>
                  {cat.title}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <br></br>

        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label="Product Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the product name" },
            ]}
            labelCol={{ span: 24 }} // Span the entire width for the label
            wrapperCol={{ span: 24 }} // Span the entire width for the input
            style={{
              marginBottom: "2px",
             
              fontWeight: "500",
            }}
          >
            <Input placeholder="Example: Door" size="large" />
          </Form.Item>

          <Form.Item
            label="Sort  Description"
            name="short_description"
            rules={[
              {
                message: "Please enter the product description",
              },
            ]}
            labelCol={{ span: 24 }} // Span the entire width for the label
            wrapperCol={{ span: 24 }} // Span the entire width for the input
            style={{
              marginBottom: "2px",
             
              fontWeight: "500",
            }}
          >
            <ReactQuill
              name="short_description"
              style={{ height: "150px" }}
              theme="snow"
            />
          </Form.Item>
          <br></br>
          <br></br>

          <Form.Item
            class="label-above-input"
            label="description"
            name="description"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{
              marginBottom: "2px",
             
              fontWeight: "500",
            }}
          >
            <ReactQuill style={{ height: "150px" }} theme="snow" />
          </Form.Item>

          <br />
          <br />

          <Row style={{ margin: "20px 0px" }} gutter={16}>
            <Col span={12}>
              <Form.Item
                labelAlign="top"
                label="Price (৳)"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please enter the price",
                  },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{
                 
                  fontWeight: "500",
                }}
              >
                <Input className="inputfield" placeholder="Example: 2000" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelAlign="top"
                label="Stock"
                name="stock"
                rules={[
                  {
                    required: true,
                    message: "Please enter the stock quantity",
                  },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{
                 
                  fontWeight: "500",
                }}
              >
                <InputNumber
                  placeholder="Example: 20"
                  style={{
                    padding: "8px  4px",
                    width: "100%",
                    border: "1px solid black ",
                  }}
                  min={0}
                />
              </Form.Item>
            </Col>
          </Row>

          <div style={{ display: "flex" }}>
            <div>
              <Form.Item
                label="Discount Type"
                class="label-above-input"
                name="discountType"
                rules={[
                  {
                    message: "Please  enter the price",
                  },
                ]}
                labelCol={{ span: 24 }} // Span the entire width for the label
                wrapperCol={{ span: 24 }} // Span the entire width for the input
                style={{
                  marginBottom: "2px",
                 
                  fontWeight: "500",
                }}
              
              
              
              >
                <Select

                
                  value={discountType}
                  onChange={(value) => setDiscountType(value)}
                  style={{border: "2px  solid black ", width:"full" ,   }}
                
                
                
                >
                  <Option     value="fixed">Fixed Amount</Option>
                  <Option value="percentage">Percentage</Option>
                </Select>
              </Form.Item>
            </div>
            <div>
              <Form.Item
                class="label-above-input"
                label="Amount"
                name="Discountamout"
                rules={[
                  {
                    type: Number,
                    message: "Please  enter the  Amount or  Parcents",
                  },
                ]}
                labelCol={{ span: 24 }} // Span the entire width for the label
                wrapperCol={{ span: 24 }} // Span the entire width for the input
                style={{
                  marginBottom: "2px",
                 
                  fontWeight: "500",
                }}
              >
                <InputNumber  placeholder="Example: 23"   style={{  padding:"3px" , margin:"0px 10px" ,width:"100%", border:"2px solid black "}}   min={0} />
              </Form.Item>
            </div>
          </div>
<div  style={{ margin:"10px 0px " , border:"1px solid black",  padding:"20px 10px ", borderRadius:"10px" }}>
  <h4  style={{margin:"10px auto ", textAlign:"center"}}>Image Upload </h4>
          <ProductImgUpload
            setMultipleImageLinks={setMultipleImageLinks}
            setSingleImageLink={setSingleImageLink}
          ></ProductImgUpload>

</div>

          {attributes.map((attribute, index) => (
            <Space key={index} style={{ marginBottom: 8 }}>
              <Form.Item
                label={`Attribute ${index + 1}`}
                name={["attributes", index, "label"]}
                rules={[
                  {
                    message: "Please enter the attribute label",
                  },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{
                  marginBottom: "2px",
                 
                  fontWeight: "500",
                }}
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
                    message: "Please enter at least one attribute value",
                    type: "array",
                  },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{
                  marginBottom: "2px",
                 
                  fontWeight: "500",
                }}
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

              <Form.Item
                wrapperCol={{ span: 24 }}
                style={{ textAlign: "right" }} // Align the button to the right
              >
                <span
                  onClick={() => removeAttribute(index)}
                  style={{ cursor: "pointer", color: "red" }}
                >
                  <CloseOutlined />
                </span>
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
            class="label-above-input"
            label="Tags"
            name="tags"
            rules={[
              {
                message: "Please enter at least one tag",
                type: "array",
              },
            ]}
            labelCol={{ span: 24 }} // Span the entire width for the label
            wrapperCol={{ span: 24 }} // Span the entire width for the input
            style={{
              marginBottom: "2px",
             
              fontWeight: "500",
            }}
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

            <Form.Item
              labelAlign="top"
              label="Meta Title"
              name="MetaTitle"
              labelCol={{ span: 24 }} // Span the entire width for the label
              wrapperCol={{ span: 24 }} // Span the entire width for the input
              style={{
                marginBottom: "2px",
               
                fontWeight: "500",
              }}
            >
              <Input placeholder="Enter the product title" />
            </Form.Item>

            <Form.Item
              labelAlign="top"
              name="MetaDescription"
              label="Meta Description"
              labelCol={{ span: 24 }} // Span the entire width for the label
              wrapperCol={{ span: 24 }} // Span the entire width for the input
              style={{
                marginBottom: "2px",
               
                fontWeight: "500",
              }}
            >
              <Input.TextArea placeholder="Enter the product description" />
            </Form.Item>
          </div>

          {showAdditionalFields && (
            <Variyetions
              setVariyationImageLink={setVariyationImageLink}
            ></Variyetions>
          )}

          <div style={{ margin: "auto " }}> </div>
          <Form.Item>
            <Button
              style={{
                margin: "auto",
                width: "120px",
                border: "1px solid  green",
                background: "",
              }}
              htmlType="submit"
            >
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Addproduct;
