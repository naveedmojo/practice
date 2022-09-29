import React, { useEffect, useState } from 'react';
import {
  Table,
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Form,
  Navbar,
  ToastContainer,
} from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
const api = 'http://localhost:5000/users';
const initialstate = {
  name: '',
  email: '',
  contact: '',
  address: '',
};
const App = () => {
  const [state, setstate] = useState(initialstate);
  const [data, setdata] = useState([]);
  const { name, email, contact, address } = state;
  const loadusers = async () => {
    const response = await axios.get(api);
    setdata(response.data);
  };
  useEffect(() => {
    loadusers();
  }, []);
  const handlesubmit = (e) => {
    e.preventDefault();
    if (name || address || email || contact) {
      toast.error('please fill all the details');
    }
    console.log(name, address);
  };
  return (
    <>
      <ToastContainer />
      <Navbar bg='primary' variant='dark' className='justify-content-center'>
        <Navbar.Brand>Build and deploy json server on heroku</Navbar.Brand>
      </Navbar>
      <Container style={{ marginTop: '70px' }}>
        <Row>
          <Col md={4}>
            <Form onSubmit={handlesubmit}>
              <Form.Group>
                <Form.Label style={{ textAlign: 'left' }}>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Name'
                  name='name'
                  value={name}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ textAlign: 'left' }}>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter Email'
                  name='email'
                  value={email}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ textAlign: 'left' }}>Contact</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Contact'
                  name='contact'
                  value={contact}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ textAlign: 'left' }}>Address</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Address'
                  name='address'
                  value={address}
                ></Form.Control>
              </Form.Group>
              <div className='d-grid gap-2 mt-2'>
                <Button type='submit' variant='primary' size='lg'>
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
          <Col md={8}>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>

              {data &&
                data.map((item, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.contact}</td>
                        <td>{item.address}</td>
                        <td>
                          <ButtonGroup>
                            <Button
                              style={{ marginRight: '5px' }}
                              variant='secondary'
                            >
                              Update
                            </Button>
                            <Button
                              style={{ marginRight: '5px' }}
                              variant='danger'
                            >
                              Delete
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
