import React, { useEffect, useState } from "react";
import ProductTable from "../components/ProductTable/ProductTable";
import Spinner from "../components/Shared/Spinner/Spinner";
import DeleteConfirmationModal from "../components/Shared/ConfirmationsModal/DeleteConfirmationModal";
import { Button, Table } from "antd";

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

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    // Handle product deletion logic here
    setIsModalVisible(false);
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
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="danger" onClick={() => handleDelete(record)}>
          Delete
        </Button>
      ),
    },
  ];
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <Table dataSource={products} columns={columns} />
      <div>
        <DeleteConfirmationModal
          isVisible={isModalVisible}
          entity="Product"
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
};

export default Productlist;
