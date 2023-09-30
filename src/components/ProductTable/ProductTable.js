import { Table } from 'antd';
const columns = [
  {
    title: 'Img',
    width: 100,
    dataIndex: 'thumbnail',
    render: (thumbnail) => <img style={{width:"50px", border:"1px solid grey " ,borderRadius:"100%" }} src={thumbnail} alt="Thumbnail" />,
  },
  {
    title: 'Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    
  },
  
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    width: 150,
  },
  {
    title: 'Price',
    width: 100,
    dataIndex: 'price',
    key: 'price',
 
  },
  
  {
    title: 'Product-Type',
    dataIndex: 'productType',
    key: 'productType',
    width: 150,
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
    width: 150,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 150,
  },
  {
    title: 'Action',
    key: 'operation',
  
    width: 100,
    render: () => <a>action</a>,
  },
];



const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: ` ${"hello "}`,
    price: 32,
    address: `London Park no. ${i}`,
  });
}
const ProductTable = ({data}) => (
  <Table
    columns={columns}
    dataSource={data}
    scroll={{
      x: 800,
      y: 1000,
    }}
  />
);

export default ProductTable;


