import React from "react";
import { Container } from "react-bootstrap";
import { Header } from "./Header";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Container>{children}</Container>
    </div>
  );
};

export default MainLayout;
