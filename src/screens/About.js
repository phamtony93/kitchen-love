import Axios from "axios";
import React from "react";
import { Table } from "react-bootstrap";
import { getStoreInventory } from "../firebase";

const not_available = "../assets/not_available";
const About = () => {
  return (
    <div>
      We are on a mission to connect passionate chefs with hungry customers.
      <button
        onClick={async () => {
          console.log(await getStoreInventory("fjZEyrTZL0dvZJvBh6nJe6s6o593"));
        }}
      >
        test
      </button>
    </div>
  );
};

export default About;
