import React from "react";
import MainLayout from "../components/Layout/MainLayout";
import { Row } from "react-bootstrap";
import TransactionForm from "../components/Layout/form/TransactionForm";
import TransactionTable from "../components/Layout/transaction-table/TransactionTable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    !user._id && navigate("/");
  }, [user]);
  return (
    <MainLayout>
      <Row>
        <h3 className="mt-5 text-danger">Dashboard</h3>
        <hr />
        {/* Form Section */}
        <TransactionForm />
        <hr className="mt-3" />
        {/* Table section */}
        <TransactionTable />
      </Row>
    </MainLayout>
  );
};

export default Dashboard;
