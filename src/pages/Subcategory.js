import { React, useEffect, useState } from "react";
import { Input } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Select } from 'antd';
const { Option } = Select;

const Subcategory = () => {
  const [categoryname, setCategoryname] = useState("");
  const [icon, setIcon] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState([])
  const [parentId, setParentId] = useState("")

  const navigate = useNavigate()
  ///slug  img  upload
  const handleIconImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch(
        `${process.env.imggBB_URL}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIcon(data.data.url);
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  //fetch all parent category
  useEffect(() => {

    fetch("https://site-api.trelyt.store/api/v1/category")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data?.data);

      });
  }, []);


  const handleCategoryChange = (value) => {
    // Find the selected item based on the value (name)
    const selectedCategory = category.find((item) => item.name === value);

    // Set the selected item's ID in the state
    if (selectedCategory) {
      setParentId(selectedCategory._id);
    } else {
      // Handle the case where the selected item is not found
      setCategory(null);
    }
  };








  const handleSubmit = (e) => {
    e.preventDefault()
    const category = {
      categoryname,
      slug,
      icon,
      parentId
    }

    fetch("https://site-api.trelyt.store/api/v1/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          toast.success(data.message);
          navigate("/admin/list-category")
        }
      });


  }




  return (
    <div>
      <h3 className="mb-4  title">Sub Category</h3>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              for="name"
              style={{
                fontSize: "16px",
                textTransform: "capitalize",
                fontFamily: "bold",
              }}
            >
              Category Name
            </label>
            <Input
              type="name"
              onChange={(e) => setCategoryname(e.target.value)}
              label="Enter Product Category"
              id="name"
              name="name"
              placeholder="Example:  All Door"
              style={{ width: "100%", padding: "15px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              for="icon"
              style={{
                fontSize: "16px",
                textTransform: "capitalize",
                fontFamily: "bold",
              }}
            >
              Icon link
            </label>
            <Input
              onChange={handleIconImageUpload}
              type="file"
              label="Enter Category icon"
              id="icon"
              name="icon"
              style={{ width: "100%", padding: "15px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              for="slug"
              style={{
                fontSize: "16px",
                textTransform: "capitalize",
                fontFamily: "bold",
              }}
            >
              slug name
            </label>
            <Input
              onChange={(e) => setSlug(e.target.value)}
              type="slug"
              label="Enter Product slug"
              id="slug"
              name="slug"
              placeholder=" Example: service "
              style={{ width: "100%", padding: "15px" }}
            />
          </div>
          <Select
            style={{ width: '100%', border: "1px solid black", color: "black", }}
            placeholder="Select  Parent  category"
            dropdownStyle={{ padding: '8px' }}
            onChange={handleCategoryChange}
          >
            {category.map((item) => (
              <Option key={item._id} value={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>


          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add-Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subcategory