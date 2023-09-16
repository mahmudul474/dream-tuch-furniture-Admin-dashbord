import React, { useState } from "react";
import { Col, Input, Row } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Select, Space } from "antd";
import "./Addproduct.css"
import { Option } from "antd/es/mentions";


const Addproduct = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const [price, setPrice] = useState(null);
  const [discountType, setDiscountType] = useState('fixed');
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
    if (discountType === 'fixed') {
      return price - discountValue;
    } else if (discountType === 'percentage') {
      const discountAmount = (price * discountValue) / 100;
      return price - discountAmount;
    }
    return price;
  };

  return (
    <>
      <div>
        <div style={{ margin: "auto", textAlign: "center" }}>
          <h1>Add Product</h1>
        </div>

        <div style={{ display: "flex", marginTop: "30px", justifyContent:"flex-start", alignItems:"center" }}>
         <div>
         <label style={{ fontSize: "20px", fontWeight:"bold",paddingRight:"10px" }}>Product Type</label>
         </div>
          <div style={{ width: '50%' }}>
            {" "}
            <Select
              defaultValue="Simple Product"
               
              style={{
                width: '100%', 
              
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

        <form style={{ marginTop: "30px" }}>
          <label className="">
            <h6>Product Name</h6>
          </label>
          <Input placeholder="Example: Door " size="large" />
          <br />
          <br />
          <label className="">
            <h6>Sort descriptions</h6>
          </label>
          <ReactQuill style={{ height: "150px" }} theme="snow" />
          <br />
          <br />
          <br />

          <label className="">
            <h6>Descriptions</h6>
          </label>
          <ReactQuill style={{ height: "150px" }} theme="snow" />
          <br />
          <br />
          <br />

          <div>
      
          <div>
      
      <div>
        <label>
          
          <h6> Price <span style={{fontSize:"", color:"black", fontWeight:"bold"}}>(৳)</span> : </h6></label>
        <input
          type="number"
          placeholder={`Example: 10000  `}
          style={{ width: '30%', padding:"5px", marginLeft:"10px" }}
          defaultValue={price}
          onChange={(e) => handlePriceChange(parseFloat(e.target.value))}
        />
      </div>
<br></br>

      <div>
      <Row gutter={16}>
        <Col xs={24} lg={12}>
        <div>
        <label>
          <h6>Discount Type:</h6></label>
        <Select
          value={discountType}
          onChange={(value) => setDiscountType(value)}
          style={{ width: '100%' }}
        >
          <Option value="fixed">Fixed Amount</Option>
          <Option value="percentage">Percentage</Option>
        </Select>
      </div>
        </Col>
        <Col xs={24} lg={12}>
        <div>
        <label>
          <h6>Discount Value:</h6></label>
        <input
          type="number"
          style={{ width: '100%',   padding:"5px" }}
          defaultValue={discountValue}
          onChange={(e) => handleDiscountValueChange(parseFloat(e.target.value))}
        />
      </div>
        </Col>
      </Row>
    </div>


      
      
       
    </div>




      <br /><br />
    </div>




          <Input placeholder="" size="large" />
          <br />
          <br />
          <Input placeholder="" size="large" />
          <br />
          <br />
        </form>
      </div>
    </>
  );
};

export default Addproduct;
