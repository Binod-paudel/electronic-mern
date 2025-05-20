import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  let currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <p className="text-center py-3">Broadway &copy; {currentYear}</p>
      </Container>
    </footer>
  );
};

export default Footer;
