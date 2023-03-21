import { useState } from 'react';
import './App.css';
import { Button, Table, Modal, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function App() {
  const [isEditing, setIsEditing] = useState(false);

  const [editStudent, setEditStudent] = useState(null)


  const [dataSource, setDataSource] = useState([

    {


      id: 1,
      name: 'Jhone',
      email: 'jhone@gmail.com',
      address: 'john Address'

    },

    {


      id: 2,
      name: 'Jhone',
      email: 'jhone@gmail.com',
      address: 'john Address'

    },


    {


      id: 3,
      name: 'Jhone',
      email: 'jhone@gmail.com',
      address: 'john Address'

    },


    {


      id: 4,
      name: 'Jhone',
      email: 'jhone@gmail.com',
      address: 'john Address'

    },



  ]);




  //--------------- table heading------------------


  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'id'
    },
    {
      key: '2',
      title: 'Name',
      dataIndex: 'name'
    },
    {
      key: '3',
      title: 'Email',
      dataIndex: 'email'
    },
    {
      key: '4',
      title: 'Address',
      dataIndex: 'address'
    },

    {
      key: '5',
      title: 'Action',
      render: (record) => {
        return (
          <>


            <EditOutlined onClick={() => {
              onEditStudent(record)
            }
            } />
            <DeleteOutlined style={{ color: 'red', marginLeft: 12 }} onClick={() => {
              onDeleteStudent(record)
            }} />

          </>
        )
      }
    }

  ];



  // -----------------Add New ROW Function----------------------

  const onAddStudent = () => {
    const randomNumber = parseInt(Math.random() * 1000);





    const newStudent = {


      id: randomNumber,
      name: 'Jhone' + randomNumber,
      email: randomNumber + 'jhone@gmail.com',
      address: 'john Address' + randomNumber,

    };



    setDataSource(pre => {
      return [...pre, newStudent]
    })
  }




  // -------deteteStudent---------------------



  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this student?',
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });

      }
    })


  }





  // ------ -------------edit  Student ------------------------


  const onEditStudent = (record) => {

    setIsEditing(true)

    setEditStudent({ ...record })
    console.log(editStudent)
  }

  const resetEditing = () => {
    setIsEditing(false)
    setEditStudent(null)

  }



  return (
    <div className='App'>
      <header className='App-header'>


        <Button onClick={onAddStudent} style={{ marginBottom: 10 }}>ADD NEW BUTTON</Button>


        <Table columns={columns} dataSource={dataSource} ></Table>

        <Modal
          title="Edit Student"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing()
          }}

          onOk={() => {

            setDataSource(pre => {
              return pre.map(student => {
                if (student.id === editStudent.id) {
                 
                  return editStudent;

                } else{
                  return student;
                 
                }

              })
            })
            resetEditing()
          }}
        >
         <Input
            value={editStudent?.name}
            onChange={(e) => {
              setEditStudent((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
          <Input
            value={editStudent?.email}
            onChange={(e) => {
              setEditStudent((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          <Input
            value={editStudent?.address}
            onChange={(e) => {
              setEditStudent((pre) => {
                return { ...pre, address: e.target.value };
              });
            }}
          />


        </Modal>



      </header>

    </div>
  )
}

export default App;