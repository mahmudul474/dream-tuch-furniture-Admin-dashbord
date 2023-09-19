import React, { useState } from 'react';
import { Upload, Button, message, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ProductImgUpload = () => {
  const [fileList1, setFileList1] = useState([]);
  const [fileList2, setFileList2] = useState([]);

  const customRequest = ({ file, onSuccess, onError }) => {
    // Simulate an API request (replace with your actual API logic)
    setTimeout(() => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        onError('Only JPG/PNG files are supported');
      } else {
        onSuccess(file);
      }
    }, 1000);
  };

  const handleChange1 = ({ fileList }) => {
    setFileList1(fileList);
  };

  const handleChange2 = ({ fileList }) => {
    setFileList2(fileList);
  };

  const handleRemove1 = (file) => {
    const newFileList = fileList1.filter((item) => item.uid !== file.uid);
    setFileList1(newFileList);
  };

  const handleRemove2 = (file) => {
    const newFileList = fileList2.filter((item) => item.uid !== file.uid);
    setFileList2(newFileList);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Only JPG/PNG files are supported');
    }
    return isJpgOrPng;
  };

  return (
    <div>
<label>Upload  Thumbnail </label>
<Form.Item
           
            name="Thumbnail"
            rules={[
              {
                required: true,
                message: "Please  upload a thumbnail",
              },
            ]}
          >

      <Upload
        customRequest={customRequest}
        fileList={fileList1}
        onChange={handleChange1}
        beforeUpload={beforeUpload}
        onRemove={handleRemove1}
        maxCount={10} // Limit to 10 images for the first field
      >
        <Button icon={<UploadOutlined />}>Upload  Thumbnail</Button>
      </Upload>
      </Form.Item>


      <label>
                Upload Images 
              </label>
<Form.Item    
  name="images"
            rules={[
              {
                required: true,
                message: "Please  uploads Images",
              },
            ]}
            >
              
              <Upload
        customRequest={customRequest}
        fileList={fileList2}
        onChange={handleChange2}
        beforeUpload={beforeUpload}
        onRemove={handleRemove2}
        multiple
        maxCount={20} // Limit to 5 images for the second field
      >
        <Button icon={<UploadOutlined />}>Upload Images </Button>
      </Upload>
            </Form.Item>
      
    </div>
  );
};

export default ProductImgUpload
