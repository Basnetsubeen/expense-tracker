import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postDataAction } from "../../../pages/transaction/transactionAction";

const TransactionForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { _id } = JSON.parse(window.localStorage.getItem("user"));
    dispatch(postDataAction({ ...form, userID: _id }));
  };
  return (
    <div className="">
      <Form onSubmit={handleOnSubmit}>
        <h4>Add Transaction</h4>
        <Row className="g-2">
          <Col md="2">
            <Form.Select
              defaultValue="Choose..."
              name="type"
              onChange={handleOnChange}
              required
            >
              <option>Choose...</option>
              <option>Income</option>
              <option>Expenses</option>
            </Form.Select>
          </Col>
          <Col md="3">
            <Form.Control
              name="date"
              type="date"
              onChange={handleOnChange}
              required
            />
          </Col>
          <Col md="3">
            <Form.Control
              name="title"
              placeholder="Tansaction name"
              onChange={handleOnChange}
              required
            />
          </Col>

          <Col md="2">
            <Form.Control
              name="amount"
              type="number"
              placeholder="amount"
              onChange={handleOnChange}
              required
            />
          </Col>
          <Col md="2">
            <Form.Control type="submit" className="btn btn-primary" />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TransactionForm;
