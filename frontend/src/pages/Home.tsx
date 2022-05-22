import { FC, useEffect, useState, SyntheticEvent } from "react";
import axios from "axios";
import { ArtWork } from "../types/art_work";
import { Container, Image, Col, Row } from "react-bootstrap";
import ArtworkDetail from "./ArtworkDetail";
import { Link } from "react-router-dom";
import { ArtWorkMedia } from "../types/artwork_media";

const Home: FC = () => {
  const [artworks, setArtworks] = useState<Array<ArtWork>>([]);

  const [bucket1, setBucket1] = useState<Array<ArtWork>>([]);
  const [bucket2, setBucket2] = useState<Array<ArtWork>>([]);
  const [bucket3, setBucket3] = useState<Array<ArtWork>>([]);

  useEffect(() => {
    const fetch = async () => {
      const fetchData = await axios.get("http://localhost:8000/api/artwork");
      const data = fetchData.data;
      setArtworks(data);
    };
    fetch();
  }, []);

  /// this begins the experimental part
  useEffect(() => {
    if (artworks.length === 0) return;
    let counter = 1;
    for (let i = 0; i < artworks.length; i++) {
      if (counter === 4) counter = 1;
      if (counter === 1) {
        if (bucket1.length === 0) {
          setBucket1((bucket1) => [...bucket1, artworks[i]]);
        } else {
          setBucket1(bucket1.concat(artworks[i]));
        }
        counter++;
      } else if (counter === 2) {
        if (bucket2.length === 0) {
          setBucket2((bucket2) => [...bucket2, artworks[i]]);
        } else {
          setBucket2(bucket2.concat(artworks[i]));
        }
        counter++;
      } else if (counter === 3) {
        if (bucket3.length === 0) {
          setBucket3((bucket3) => [...bucket3, artworks[i]]);
        } else {
          setBucket3(bucket3.concat(artworks[i]));
        }
        counter++;
      }
    }
  }, [artworks]);

  return (
    <>
      <Container
        className="mt-3 "
        style={{
          marginBottom: "40vh",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          margin: "0 auto",
          justifyContent: "center",
        }}
      >
        <Col className="m-1" md={3}>
          {bucket1
            ? bucket1.map((work) => {
                return (
                  <Link to={`/${work.id}`}>
                    <Image
                      className="m-1"
                      fluid
                      src={`http://localhost:8000${work.work_img[0].img}`}
                      alt="art peice"
                    />
                  </Link>
                );
              })
            : ""}
        </Col>
        <Col className="m-1" md={3}>
          {bucket2
            ? bucket2.map((work) => {
                return (
                  <Link to={`/${work.id}`}>
                    <Image
                      className="m-1"
                      fluid
                      src={`http://localhost:8000${work.work_img[0].img}`}
                      alt="art peice"
                    />
                  </Link>
                );
              })
            : ""}
        </Col>
        <Col className="m-1" md={3}>
          {bucket3
            ? bucket3.map((work) => {
                return (
                  <Link to={`/${work.id}`}>
                    <Image
                      className="m-1"
                      fluid
                      src={`http://localhost:8000${work.work_img[0].img}`}
                      alt="art peice"
                    />
                  </Link>
                );
              })
            : ""}
        </Col>
        {/* {artworks.map((work) => {
            return (
              <Link to={`/${work.id}`}>
                <Image
                  className="m-1"
                  src={`http://localhost:8000${work.work_img[0].img}`}
                  style={{
                    maxHeight: "40vh",
                    objectFit: "contain",
                    verticalAlign: "bottom",
                    display: "inline",
                  }}
                  alt="art peice"
                />
              </Link>
            );
          })} */}
        {/* </Container> */}
      </Container>
    </>
  );
};

export default Home;
