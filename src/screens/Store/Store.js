import React, { useEffect, useState } from "react";
import "./Store.css";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { firestore, getStoreInventory } from "../../firebase";
import { useStateProviderValue } from "../../StateProvider";

const Store = () => {
  const [inventory, setInventory] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const [{ user }, dispatch] = useStateProviderValue();

  //   ------- figure out why this approach doesn't work -------------
  //   useEffect(() => {
  //     const loadInventory = async () => {
  //       const temp = await getStoreInventory(user.uid);
  //       console.log(temp);
  //     };

  //     if (user) {
  //       loadInventory();
  //     }
  //   }, [user]);

  useEffect(() => {
    if (user) {
      firestore
        .collection("listings")
        .where("vendorId", "==", user.uid)
        .onSnapshot((querySnapshot) => {
          setInventory(querySnapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [user]);

  const TableHeader = () => {
    return (
      <thead>
        <tr>
          <th>SKU</th>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Quantity Available</th>
          <th>Quantity Ordered</th>
          <th>Income</th>
        </tr>
      </thead>
    );
  };

  //   console.log("being built");
  console.log(inventory);

  const TableBody = ({ data }) => {
    // console.log(data.length);
    console.log(data);
    if (data.length) {
      return data.map((row) => {
        // console.log(row);
        return (
          <tr>
            <td>{row.skuId}</td>
            <td>
              <img
                src={row.imageUrl}
                alt=""
                className="store__inventoryImage"
              ></img>
            </td>
            <td>{row.name}</td>
            <td>{row.description}</td>
            <td>{row.quantity}</td>
            <td># ordered</td>
            <td>income</td>
          </tr>
        );
      });
    } else {
      return null;
    }
  };

  const handleShowForm = () => {
    setShowUploadForm(true);
  };

  const handleCloseForm = () => {
    setShowUploadForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //upload to firebase
    setShowUploadForm(false);
  };
  return (
    <div className="store">
      <div className="store__inventory">
        {/* implement pagination */}
        <Table>
          <TableHeader />
          <TableBody data={inventory} />
        </Table>
      </div>
      <div className="store__uploadItem">
        <Modal show={showUploadForm} onHide={handleCloseForm}>
          <Modal.Header closeButton>Upload New Item</Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text"></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text"></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number"></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control type="numer"></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>image</Form.Label>
                <Form.Control type="file"></Form.Control>
              </Form.Group>
              <Button type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <button onClick={handleShowForm}>Upload New Item</button>
      </div>
    </div>
  );
};

export default Store;
