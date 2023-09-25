import { Table } from 'antd';
const columns = [
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
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 150,
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
    width: 150,
  },
  {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
    width: 150,
  },
  {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
    width: 150,
  },
  {
    title: 'Column 7',
    dataIndex: 'address',
    key: '7',
    width: 150,
  },
  {
    title: 'Column 8',
    dataIndex: 'address',
    key: '8',
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
      x: 1500,
      y: 1000,
    }}
  />
);
export default ProductTable;