import React, { useEffect, useState } from "react";
import Spinner from "../components/Shared/Spinner/Spinner";
import DeleteConfirmationModal from "../components/Shared/ConfirmationsModal/DeleteConfirmationModal";
import { Button, Table } from "antd";
import axios from "axios";

const Productlist = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setIsloading(true);
    fetch(`https://site-api.trelyt.store/api/v1/products`)
      .then((response) => response.json())
      .then((products) => {
        setProducts(products.data.data);
        setIsloading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };
  

  const handleConfirmDelete = () => {
    // Make an API call to delete the selected product by ID
    axios.delete(`https://site-api.trelyt.store/api/v1/api/products/${selectedProduct._id}`).then((response) => {
      // Update the state to remove the deleted product
      setProducts(products.filter((product) => product._id !== selectedProduct._id));
      setIsModalVisible(false);
    });
  };

  const handleCancelDelete = () => {
    setSelectedProduct(null);
    setIsModalVisible(false);
  };




  const columns = [
    {
      title: "Img",
      width: 100,
      dataIndex: "thumbnail",
      render: (thumbnail) => (
        <img
          style={{
            width: "50px",
            border: "1px solid grey ",
            borderRadius: "100%",
          }}
          src={thumbnail}
          alt="Thumbnail"
        />
      ),
    },
    {
      title: "Name",
      width: 100,
      dataIndex: "name",
      key: "name",
    },
  
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
    },
    {
      title: "Price",
      width: 100,
      dataIndex: "price",
      key: "price",
    },
  
    {
      title: "Product-Type",
      dataIndex: "productType",
      key: "productType",
      width: 150,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
    },
    {
      title: 'Edit',
      key: 'actions',
      render: (_, record) => (
        <Button style={{background:"green", color:"white"}} type="danger" onClick={() => handleDelete(record)}>
          Edit
        </Button>
      ),
    },
    {
      title: 'Delete',
      key: 'actions',
      render: (_, record) => (
        <Button style={{background:"red", color:"white"}} type="danger" onClick={() => handleDelete(record)}>
          Delete
        </Button>
      ),
    },
  ];



  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <Table dataSource={products} columns={columns} />
      <div>
      <DeleteConfirmationModal
  isVisible={isModalVisible}
  entity="Product"
  imageUrl={selectedProduct ? selectedProduct.thumbnail : ''} // Adjust the prop name as needed
  title={selectedProduct ? selectedProduct.name : ''} // Adjust the prop name as needed
  onCancel={handleCancelDelete}
  onConfirm={handleConfirmDelete}
/>
      </div>
    </div>
  );
};

export default Productlist;
