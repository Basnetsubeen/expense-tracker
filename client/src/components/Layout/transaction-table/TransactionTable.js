import React from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataAction,
  handleOnDeleteAction,
} from "../../../pages/transaction/transactionAction";

const TransactionTable = () => {
  const dispatch = useDispatch();
  const { transaction } = useSelector((state) => state.transaction);
  console.log(transaction);
  useEffect(() => {
    dispatch(fetchDataAction());
  }, []);

  const total = transaction.reduce((acc, { type, amount }) => {
    return type === "Income" ? acc + amount : acc - amount;
  }, 0);
  return (
    <div className="mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Title</th>
            <th>Expenses</th>
            <th>Income</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transaction.length > 0 &&
            transaction.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.title} </td>
                <td className="text-danger">
                  {item.type === "Expenses" && "-" + item.amount}
                </td>
                <td className="text-success">
                  {item.type === "Income" && item.amount}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => dispatch(handleOnDeleteAction(item._id))}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="text-end fw-bold"> = ${total}</div>
    </div>
  );
};

export default TransactionTable;
