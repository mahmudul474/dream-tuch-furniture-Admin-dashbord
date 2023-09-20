import React, { useState } from 'react';
import { Form, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const  ProductImgUpload= ({setThumbnailUrl,setImageUrls}) => {
  const [fileList1, setFileList1] = useState([]);
  const [fileList2, setFileList2] = useState([]);


  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
        params: {
          key: '70fb97e516483d52ddf8b1cd4d5d1698', // Replace with your ImgBB API key
        },
      });

      if (response.data.status === 200) {
        const imageUrl = response.data.data.url;
        if (fileList1.includes(file)) {
          setThumbnailUrl(imageUrl);
        } else if (fileList2.includes(file)) {
          setImageUrls((prevImageUrls) => [...prevImageUrls, imageUrl]);
        }
        console.log('Image uploaded successfully. URL:', imageUrl);
        onSuccess(response, file);
      } else {
        message.error('Image upload failed');
        onError(response);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      onError(error);
    }
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    return isImage;
  };

  const handleChange1 = ({ fileList }) => {
    setFileList1(fileList);
  };

  const handleRemove1 = (file) => {
    const newFileList = fileList1.filter((item) => item.uid !== file.uid);
    setFileList1(newFileList);
  };

  const handleChange2 = ({ fileList }) => {
    setFileList2(fileList);
  };

  const handleRemove2 = (file) => {
    const newFileList = fileList2.filter((item) => item.uid !== file.uid);
    setFileList2(newFileList);
  };

  

  return (
    <>
      <Form.Item
        label="Upload Thumbnail"
        name="Thumbnail"
        rules={[
          {
            required: true,
            message: 'Please upload a thumbnail',
          },
        ]}
      >
        <Upload
          customRequest={customRequest}
          fileList={fileList1}
          onChange={handleChange1}
          beforeUpload={beforeUpload}
          onRemove={handleRemove1}
          maxCount={10}
          accept="image/*"
        >
          <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Upload Images"
        name="images"
        rules={[
          {
            required: true,
            message: 'Please upload images',
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
          maxCount={20}
          accept="image/*"
        >
          <Button icon={<UploadOutlined />}>Upload Images</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </>
  );
};

export default ProductImgUpload;
