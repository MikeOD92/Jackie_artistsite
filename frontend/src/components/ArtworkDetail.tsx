import React, { useState } from "react";
import { Container, Col, Row, Image } from "react-bootstrap";
import { ArtWork } from "../types/art_work";

const ArtworkDetail = ({ data, close }: { data: ArtWork; close: Function }) => {
  const [current, setCurrent] = useState(data.work_img[0].img);

  const handleClick = (img: string) => {
    return (event: React.MouseEvent) => {
      setCurrent(img);
      event.preventDefault();
    };
  };
  const closeView = () => {
    return (event: React.MouseEvent) => {
      close();
    };
  };
  return (
    <Container
      style={{
        background: "white",
      }}
    >
      <Row>
        <Col md={6}>
          <Image
            fluid
            src={`http://localhost:8000${current}`}
            style={{ height: "75vh" }}
          />
        </Col>
        <Col md={6}>
          <p
            onClick={closeView()}
            style={{
              position: "absolute",
              right: "20px",
              width: "25px",
              height: "25px",
            }}
          >
            X {/* this should proably be replaced with an icon */}
          </p>
          <h1> {data.title}</h1>
          <h3> {data.dimensions}</h3>
          <h3> {data.medium} </h3>
        </Col>
      </Row>

      <Row
        className="mt-3 flex-d"
        style={{ width: "50%", justifyContent: "space-evenly" }}
      >
        {data.work_img.map((img) => {
          return (
            <Col md={3}>
              <Image
                src={`http://localhost:8000${img.img}`}
                fluid
                style={{ height: "15vh" }}
                onClick={handleClick(img.img)}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ArtworkDetail;
