import Axios from "axios";
import React from "react";
import { Table } from "react-bootstrap";
import { getStoreInventory } from "../firebase";

const not_available = "../assets/not_available";
const About = () => {
  return (
    <div>
      We are on a mission to connect passionate chefs with hungry customers.
    </div>
  );
};

export default About;
