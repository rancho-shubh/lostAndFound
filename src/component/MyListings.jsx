


import React, { useEffect, useState } from "react";
import { setConstraint } from "../constraints";
import Navbar from "../component/Navbar";
import "../css/item_card.css";
import "../css/mylisting.css";
import Axios from "axios";
import { Card, Col, Container, Row, Badge } from "react-bootstrap";
import { API } from "./config";

export default function Feed() {
  setConstraint(true);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

//   const timestamp = 1695932616371; // Replace this with your timestamp
//   const date = new Date(timestamp);

  // Format the date and time
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // second: "numeric",
    // timeZoneName: "short",
  };
//   const formattedDate = date.toLocaleDateString(undefined, options);

//   console.log(formattedDate); // Output will be something like "October 28, 2023, 14:36:56 UTC"
  const id = localStorage.getItem('lfsuserid');
  useEffect(() => {
    Axios.get(`${API}/mylistings/`+id)
      .then((response) => {
        setLoading(false);
        const data = response.data;
        const itemsData = data.map((item) => ({
          _id: item._id,
          name: item.name,
          description: item.description,
          type: item.type,
          status: item.status,
          createdAt: new Date(item.createdAt).toLocaleDateString(undefined, options), // Format date and time
          image:item.image
          //   itemPictures: item.itemPictures,
        }));
        setItems(itemsData);
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error:", err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="listing-title">
        <h2>My Listings</h2>
        <div className="title-border"></div>
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Container fluid>
            <Row>
              {items.map((item) => (
                <Col key={item._id} style={{ marginTop: "2%" }} md={3}>
                  <Card bsPrefix="item-card" style={{ maxHeight: "465px" }}>
                    {/* <Card.Img
                      variant="top"
                      src={`https://lost-and-found-system.s3.amazonaws.com/${item.itemPictures[0].img}`}
                    /> */}
                    <Card.Img
                      variant="top"
                      height="200px"
                      // src={`https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg`}
                      src={item.image}
                    />
                    <Card.Body bsPrefix="card-body">
                      {item.status ? (
                        <>
                          {" "}
                          <Badge pill variant="success">
                            Active
                          </Badge>
                        </>
                      ) : (
                        <>
                          <Badge pill variant="secondary">
                            Inactive
                          </Badge>
                        </>
                      )}
                      
                      <Card.Title> <a href={`/itempage/${item._id}?name=${item.name}&type=${item.type}/true`}>Item:{item.name}</a></Card.Title>
                      {item.description ? (
                        <Card.Text>Description: {item.description}</Card.Text>
                      ) : (
                        ""
                      )}
                      <Card.Text>Type: {item.type}</Card.Text>
                      <Card.Text>Created at: {item.createdAt}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
}
