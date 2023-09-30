import { React, useEffect, useState } from "react";

import { Input } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Addcat = () => {
  const [categoryname, setCategoryname] = useState("");
  const [icon, setIcon] = useState("");
  const [slug, setSlug] = useState("");
  const  navigate=useNavigate()
  ///slug  img  upload
  const handleIconImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=70fb97e516483d52ddf8b1cd4d5d1698",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const category = {
      name: categoryname,
      slug: slug,
      icon: icon,
    };
    fetch("https://site-api.trelyt.store/api/v1/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    })
      .then((res) => res.json())
      .then((data) => {
         if(data.success===true){
          toast.success(data.message);
          navigate("/admin/list-category")
         }
      });
  };

  return (
    <div>
      <h3 className="mb-4  title">Category</h3>
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

export default Addcat;
