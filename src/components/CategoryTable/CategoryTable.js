import { Table } from 'antd';
const columns = [
  {
    title: 'Img',
    width: 100,
    dataIndex: 'icon',
    render: (icon) => <img style={{ width:"30px", height:"30px", border:"1px solid grey " ,borderRadius:"100%" }} src={icon} alt="Thumbnail" />,
  },
  {
    title: 'Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    
  },
  {
    title: 'slug',
    dataIndex: 'slug',
    key: 'slug',
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
const CategoryTable = ({data}) => (


 
  <Table
    columns={columns}
    dataSource={data}
    scroll={{
      x: 500,
      y: 1000, 
    }}
  />
);

export default CategoryTable;


