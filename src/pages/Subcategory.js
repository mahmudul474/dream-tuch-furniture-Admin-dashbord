import { React, useEffect, useState } from "react";
import { Input } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import useS3 from "../hooks/useS3";
const { Option } = Select;

const Subcategory = () => {
  const [categoryname, setCategoryname] = useState("");
  const [icon, setIcon] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState([]);
  const [parentId, setParentId] = useState("");
  const { uploadToS3 } = useS3();
  const navigate = useNavigate();
  const [singleFile, setSingleFile] = useState(null);

  const handleSingleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setSingleFile(selectedFile);

    // Use the uploadToS3 function to upload the single selected file immediately
    if (selectedFile) {
      const key = `path/to/single/${selectedFile.name}`;
      const url = await uploadToS3(selectedFile, key);

      if (url) {
        setIcon(url);
      }
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
    e.preventDefault();
    const category = {
      name:categoryname,
      slug,
      icon,
      parentId,
    };
    console.log(category,"catefory")


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
          navigate("/admin/list-category");
        }
      });
  };

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
              Icon
            </label>

            {icon && (
              <div>
                <img
                  style={{ width: "50px", height: "50px" }}
                  src={icon}
                  alt="Uploaded"
                />
              </div>
            )}
            <Input
              onChange={handleSingleFileChange}
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

          size={"large"}
            style={{ width: "100%", border: "1px solid black", color: "black" }}
            placeholder="Select  Parent  category"
            dropdownStyle={{ padding: "8px" }}
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

export default Subcategory;
