import React, { useEffect, useState } from "react";
import ProductTable from "../components/ProductTable/ProductTable";
import Spinner from "../components/Spinner/Spinner";
 
const Productlist = () => {
  const [products, setProducts] = useState([]);
  const [isLoading,setIsloading]=useState(false);

  useEffect(() => {
    setIsloading(true)
    fetch(`https://site-api.trelyt.store/api/v1/products`)
      .then((response) => response.json())
      .then((products) => {
        setProducts(products.data.data);
     setIsloading(false);
      });
  },[]);


  if(isLoading){
    return <Spinner></Spinner>
  }


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
