import React, { useEffect, useState } from "react";
import "./Store.css";
import { Table, Modal, Form, Button } from "react-bootstrap";
import {
  firestore,
  getStoreInventory,
  getStoreInventory2,
} from "../../firebase";
import { useStateProviderValue } from "../../StateProvider";
import firebase from "firebase";

const NO_IMAGE = "";

const Store = () => {
  const [{ user }, dispatch] = useStateProviderValue();
  const [inventory, setInventory] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    type: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    if (user) {
      const unsubscribe = getStoreInventory2(user?.uid, setInventory);
      //   const getInventory = async () => {
      //     const data = await getStoreInventory(user?.uid);
      //     console.log("2");
      //     console.log(data);
      //     setInventory(data);
      //   };

      //   getInventory();
      return unsubscribe;
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
          <th>Type</th>
          <th>Quantity Available</th>
          <th>Quantity Ordered</th>
          <th>Income</th>
        </tr>
      </thead>
    );
  };

  const TableBody = ({ data }) => {
    console.log("1");
    console.log(data);
    if (data.length) {
      return (
        <tbody>
          {data.map((row) => {
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
                <td>{row.type}</td>
                <td>{row.quantity}</td>
                <td># ordered</td>
                <td>income</td>
              </tr>
            );
          })}
        </tbody>
      );
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    //upload to firebase, console.log for now
    console.log(formData);
    //attempt to load image to firebase storage and retrieve url
    const storageRef = firebase.storage().ref();
    // use unique key of image name-uid-timestamp
    const imageRef = storageRef.child(
      `${formData?.image?.name}-${user?.uid}-${Date.now()}`
    );

    await imageRef.put(formData.image).then(() => {
      imageRef.getDownloadURL().then((url) => {
        firestore.collection("listings").add({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          quantity: parseFloat(formData.quantity),
          type: formData.type,
          category: formData.category,
          imageUrl: url,
          vendorId: user?.uid,
        });
      });
    });

    //clear form state
    setFormData({
      name: "",
      description: "",
      price: "",
      quantity: "",
      image: null,
    });

    setShowUploadForm(false);
  };

  const handleChange = (e) => {
    console.log(e.target);
    if (e.target.files) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
      console.log(e.target.files[0]);
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
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
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Control
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  //   value={formData.image}
                  onChange={handleChange}
                ></Form.Control>
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
