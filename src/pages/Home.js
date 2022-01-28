// Importing Required Libraries and Components

import React, { useRef, useState } from 'react'
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap'
import FooterSec from '../components/FooterSec';
import NavBar from '../components/NavBar';

// Storing all Expensex
var expend = [];

// Functional Component for Budgets
export function Home() {

    // Declaring States using hooks

    const [bud, setBud] = useState(0);
    const [state, setState] = useState({
        exp: 0,
        bal: 0
    });
    const [data, setData] = useState([]);

    // Declaring useRef to getting current values

    const budget = useRef(null);
    const expenses = useRef(null);
    const title = useRef(null);

    // Addign Total Budget

    const submitB = (e) => {
        e.preventDefault();
        setBud(budget.current.value)
        setState({
            exp: 0,
            bal: budget.current.value
        })
        e.target.reset();
    }

    // Adding Expenses with title and amount

    const submitE = (e) => {
        e.preventDefault();
        let info = { title: title.current.value, amount: expenses.current.value }
        setData([...data, info])
        expend.push(parseInt(expenses.current.value))
        console.log(expend)
        let add = expend.reduce((a, b) => a + b, 0)
        console.log(add);
        let bala = bud - add;
        setState({
            exp: add,
            bal: bala
        })
        e.target.reset();
    }

    // Deleting the Expenses from the list

    const del = (index) => {
        expend.splice(index, 1)
        let add = expend.reduce((a, b) => a + b, 0)
        console.log(add);
        let bala = bud - add;
        setState({
            exp: add,
            bal: bala
        })
        data.splice(index, 1)
    }

    // Updating the Expenses in the list

    const up = (index, item) => {
        document.getElementById("t").value = item.title;
        document.getElementById("a").value = item.amount;
        expend.splice(index, 1)
        let add = expend.reduce((a, b) => a + b, 0)
        console.log(add);
        let bala = bud - add;
        setState({
            exp: add,
            bal: bala
        })
        data.splice(index, 1)
        console.log(item)
    }

    // Returning Designing Part of Web Page

    return (
        <>
            <NavBar />
            <br />
            <Container style={{ padding: '20px', backgroundColor: "lightgrey" }}>
                <center><h1>BUDGET CALCULATOR</h1></center>
                <br />
                <Row>
                    <Col>
                        <Card style={{ padding: '30px', backgroundColor: "lightyellow" }}>
                            <Form onSubmit={submitB}>
                                <Row>
                                    <Form.Label><h4>Budget</h4></Form.Label>
                                    <Form.Control type="number" className="form-control-lg" placeholder="Enter Your Budget" ref={budget} required />
                                </Row>
                                <br />
                                <Row>
                                    <Button type="submit" variant="info" style={{ width: '100%' }} >Add Budget</Button>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="text-center" style={{ padding: '30px', backgroundColor: "lightyellow" }}>
                            <Row>
                                <Col>
                                    <Card style={{ backgroundColor: "lightgreen" }}>
                                        <Card.Body>
                                            <Card.Title>BUDGET</Card.Title>
                                            <Card.Title><i class="fa fa-money" style={{ fontSize: '42px' }}></i></Card.Title>
                                            <Card.Text>&#8377; {bud}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card style={{ backgroundColor: "lightpink" }}>
                                        <Card.Body>
                                            <Card.Title>EXPENSES</Card.Title>
                                            <Card.Title><i class="fa fa-credit-card" style={{ fontSize: '42px' }}></i></Card.Title>
                                            <Card.Text>&#8377; {state.exp}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card style={{ backgroundColor: "lightblue" }}>
                                        <Card.Body>
                                            <Card.Title>BALANCE</Card.Title>
                                            <Card.Title><i class="fa fa-inr" aria-hidden="true" style={{ fontSize: '42px' }}></i></Card.Title>
                                            <Card.Text>&#8377; {state.bal}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Card style={{ padding: '30px', backgroundColor: "lightyellow" }}>
                            <Form onSubmit={submitE}>
                                <Row>
                                    <Form.Label><h4>Expenses</h4></Form.Label>
                                    <Form.Control type="text" id="t" className="form-control-lg" placeholder="Enter Your Expense" ref={title} required />
                                </Row>
                                <br />
                                <Row>
                                    <Form.Control type="number" id="a" className="form-control-lg" placeholder="Enter Your Expense Amount" ref={expenses} required />
                                </Row>
                                <br />
                                <Row>
                                    <Button type="submit" variant="info" style={{ width: '100%' }}>Add Expenses</Button>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ padding: '30px', backgroundColor: "lightyellow" }}>
                            <Table striped hover className="text-center" variant="dark">
                                <thead>
                                    <tr>
                                        <th>Sr.No.</th>
                                        <th>Expenses Title</th>
                                        <th>Expenses Amount</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.title}</td>
                                                    <td>{item.amount}</td>
                                                    <td>
                                                        <Button variant="warning" onClick={() => up(index, item)}><i class="fa fa-pencil" ></i></Button>&nbsp;
                                                        <Button variant="danger" onClick={() => del(index)}><i class="fa fa-trash" ></i></Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <br />
            <FooterSec />
        </>
    )
}

// Exporting Functional Component

export default Home
