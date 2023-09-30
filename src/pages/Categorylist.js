import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import CategoryTable from '../components/CategoryTable/CategoryTable'

export default function Categorylist() {
const [categorys,setCategory]=useState([])
const [isLoading, setIsloading]=useState(false)



  useEffect(()=>{
  fetch("https://site-api.trelyt.store/api/v1/category")
  .then(res=>res.json())
  .then(data=>{
    setCategory(data?.data)
  })

  },[])



   if(isLoading){
    return <>
     <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    
    </>
   }

  return (
    <div>
      <h2>Product Category</h2>

 <CategoryTable data={categorys}></CategoryTable>
    
    </div>
  )
}
