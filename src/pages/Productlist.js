import React, { useEffect, useState } from "react";
import ProductTable from "../components/ProductTable/ProductTable";
 
const Productlist = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://site-api.trelyt.store/api/v1/products`)
      .then((response) => response.json())
      .then((products) => {
        setProducts(products.data.data);
   console.log(products)
         
      });
  },[]);

  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
  <ProductTable data={products}></ProductTable>

      </div>
    </div>
  );
};

export default Productlist;
