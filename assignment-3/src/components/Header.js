import React from "react";
import { FormControl, Form, Navbar, Button } from "react-bootstrap";
function Header() {
  return (
    <Navbar
      className="justify-content-between"
      collapseOnSelect
      expand="md"
      bg="primary"
      variant="dark"
    >
      <Navbar.Brand href="#home">Assignment 3 - Team Details</Navbar.Brand>

      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-light">Search</Button>
      </Form>
    </Navbar>
  );
}

export default Header;
