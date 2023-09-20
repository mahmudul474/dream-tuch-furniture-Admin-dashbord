import React, { useState } from "react";
import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Select, Space } from "antd";
import "./Addproduct.css";
import { Option } from "antd/es/mentions";
import ProductImgUpload from "../components/Image-Upload/ProductImgUpload";
import "./Addproduct.css";
import axios from "axios";

const Addproduct = () => {
  const [productType, setProductType] = useState("");

  const handleChange = (value) => {
    setProductType(value);
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

  const [selectedCategory, setSelectedCategory] = useState(''); // Initialize with an empty string or any default value

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
 


  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);


  

  const onFinish = (values) => {



  
    const product = {
      name: values?.name,
      category: "",
      productType: productType,
      price: values?.price,
      discount: {
        type: values.discountType,
        value: values?.Discountamout,
      },
      images: [imageUrls &imageUrls],
      thumbnail: thumbnailUrl && thumbnailUrl,
      stock: values.stock,
      description: values.description,
      short_description: values.short_description,
      attributes: [
        {
          label: values?.attribute?.label,
          values: values?.attribute?.values,
        },
      ],
      tags: values.tags,
      metadata: {
        title: values?.MetaTitle,
        description: values?.MetaDescription,
      },
    };

 console.log(product)

    // axios.post(process.env.REACT_APP_API_URL,product)
    // .then(response => {
    //   // Handle the response data here
    //   console.log('Response:', response.data);
    // })
    // .catch(error => {
    //   // Handle any errors that occurred during the request
    //   console.error('Error:', error);
    // });



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
              Category Type
            </label>
          </div>
          <div style={{ width: "50%" }}>
            {" "}
            <Select
        style={{
          width: '100%',
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
            class="label-above-input"
            name="name"
            rules={[
              { required: true, message: "Please enter the product name" },
            ]}
          >
            <Input placeholder="Example: Door" size="large" />
          </Form.Item>

          <Form.Item
            label="Sort  Description"
            class="label-above-input"
            name="short_description"
            rules={[
              {
                required: true,
                message: "Please enter the product description",
              },
            ]}
          >
            <ReactQuill  name="short_description"   style={{ height: "150px" }} theme="snow" />
          </Form.Item>
          <br></br>
          <br></br>

          <Form.Item
            class="label-above-input"
            label="description"
            name="description"
          >
            <ReactQuill style={{ height: "150px" }} theme="snow" />
          </Form.Item>

          <br />
          <br />
          <Form.Item
            class="label-above-input"
            label="Stock"
            name="stock"
            rules={[
              { required: true, message: "Please enter the stock quantity" },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item
            label="Price (৳)"
            class="label-above-input"
            type="number"
            name="price"
            rules={[
              {
                required: true,
                message: "Please  enter the price",
              },
            ]}
          >
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
                label="Discount Type"
                style={{ width: "100%" }}
                name="discountType"
                rules={[
                  {
                    required: true,
                    message: "Please  enter the price",
                  },
                ]}
              >
                <Select
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
                label="Amount"
                name="Discountamout"
                rules={[
                  {
                    required: true,
                    message: "Please  enter the  Amount or  Parcents",
                  },
                ]}
              >
                <input
                  type="number"
                  style={{ width: "100%", padding: "5px" }}
                  value={discountValue}
                  onChange={(e) =>
                    handleDiscountValueChange(parseFloat(e.target.value))
                  }
                />
              </Form.Item>
            </div>
          </div>

          <ProductImgUpload
            setThumbnailUrl={setThumbnailUrl}
            setImageUrls={setImageUrls}
          ></ProductImgUpload>

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

            <Form.Item label="Meta Title" name="MetaTitle">
              <Input placeholder="Enter the product title" />
            </Form.Item>

            <Form.Item name="MetaDescription" label="Meta Description">
              <Input.TextArea placeholder="Enter the product description" />
            </Form.Item>
          </div>

          <div style={{ margin: "auto " }}> </div>
          <Form.Item>
            <Button type="primary" style={{ margin: "auto" }} htmlType="submit">
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Addproduct;
