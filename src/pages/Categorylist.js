import { Button, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import Spinner from "../components/Shared/Spinner/Spinner";
import axios from "axios";
import DeleteConfirmationModal from "../components/Shared/ConfirmationsModal/DeleteConfirmationModal";
import EditCategoryModal from "../components/EditCategoryModal/EditCategoryModal";
export default function Categorylist() {
  const [categorys, setCategory] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  //get category
  useEffect(() => {
    setIsloading(true);
    fetch("https://site-api.trelyt.store/api/v1/category")
      .then((res) => res.json())
      .then(data => {
        setCategory(data?.data.categories);
        setIsloading(false);
      });
  }, []);

  const handleDelete = (product) => {
    setSelectedCategory(product);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    // Make an API call to delete the selected product by ID
    axios
      .delete(
        `https://site-api.trelyt.store/api/v1/category/${selectedCategory._id}`
      )
      .then((response) => {
        // Update the state to remove the deleted product
        setCategory(
          categorys.filter((product) => product._id !== selectedCategory._id)
        );
        setIsModalVisible(false);
      });
  };

  const handleCancelDelete = () => {
    setSelectedCategory(null);
    setIsModalVisible(false);
  };


  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditModalVisible(true);
  };

  const handleUpdateCategory = (editedCategory, categoryId) => {
    // Make an API call to update the category
    axios
      .put(`/api/categories/${categoryId}`, editedCategory)
      .then((response) => {
        // Handle the updated category data if needed
        console.log('Category updated:', response.data);
        setIsEditModalVisible(false);
        // You can also refresh the category list if needed
        // Call a function to fetch the updated category list here
      })
      .catch((error) => {
        console.error('Error updating category:', error);
        setIsEditModalVisible(false);
      });
  };

  const handleCancelEdit = () => {
    setSelectedCategory(null);
    setIsEditModalVisible(false);
  };


  const columns = [
    {
      title: "Img",
      width: 100,
      dataIndex: "icon",
      render: (icon) => (
        <img
          style={{
            width: "30px",
            height: "30px",
            border: "1px solid grey ",
            borderRadius: "100%",
          }}
          src={icon}
          alt="icon"
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
      title: "slug",
      dataIndex: "slug",
      key: "slug",
      width: 150,
    },

    {
      title: "Edit",
      key: "actions",
      render: (_, record) => (
        <div style={{display:"flex", justifyContent:"space-between", justifyItems:"center"}}>
         
        <Button
          style={{ background: "green", color: "white" }}
          type="danger"
          onClick={() => handleDelete(record)}
        >
          Edit
        </Button>
        </div>
      ),
    },
    {
      title: "Delete",
      key: "actions",
      render: (_, record) => (
        <Button
          style={{ background: "red", color: "white" }}
          type="danger"
          onClick={() => handleDelete(record)}
        >
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
      <h2>Product Category</h2>
      <Table dataSource={categorys} columns={columns} />
      <div>
        <DeleteConfirmationModal
          isVisible={isModalVisible}
          entity="Category"
          imageUrl={selectedCategory ? selectedCategory.icon : ""} // Adjust the prop name as needed
          title={selectedCategory ? selectedCategory.name : ""} // Adjust the prop name as needed
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
         <EditCategoryModal
        isVisible={isEditModalVisible}
        category={selectedCategory}
        onCancel={handleCancelEdit}
        onEdit={handleUpdateCategory}
      />
      </div>
    </div>
  );
}
