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
  const [bucket4, setBucket4] = useState<Array<ArtWork>>([]);

  useEffect(() => {
    if (artworks.length < 1) {
      const fetch = async () => {
        const fetchData = await axios.get("http://localhost:8000/api/artwork");
        const data = fetchData.data;
        setArtworks(data);
      };
      fetch();
    }
  }, []);

  /// this begins the experimental part
  useEffect(() => {
    if (artworks.length === 0) return;
    setBucket1([]);
    setBucket2([]);
    setBucket3([]);
    setBucket4([]);
    let counter = 1;
    for (let i = 0; i < artworks.length; i++) {
      if (counter === 5) counter = 1;
      switch (counter) {
        case 1:
          setBucket1((bucket1) => [...bucket1, artworks[i]]);
          counter++;
          break;
        case 2:
          setBucket2((bucket2) => [...bucket2, artworks[i]]);
          counter++;
          break;
        case 3:
          setBucket3((bucket3) => [...bucket3, artworks[i]]);
          counter++;
          break;
        case 4:
          setBucket4((bucket4) => [...bucket4, artworks[i]]);
          counter++;
          break;
        default:
          return;
      }
    }
  }, [artworks]);
  return (
    <>
      <Container className="py-0">
        <div
          className="mt-3 "
          style={{
            marginBottom: "40vh",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            margin: "0",
            // justifyContent: "center",
          }}
        >
          <Col lg={3} md={6} sm={6}>
            {bucket1
              ? Array.from(bucket1).map((work) => {
                  return (
                    <Link to={`/${work.id}`}>
                      <Image
                        style={{ margin: "1px" }}
                        fluid
                        src={`http://localhost:8000${work.work_img[0].img}`}
                        alt="art peice"
                      />
                    </Link>
                  );
                })
              : ""}
          </Col>
          <Col lg={3} md={6} sm={6}>
            {bucket2
              ? bucket2.map((work) => {
                  return (
                    <Link to={`/${work.id}`}>
                      <Image
                        style={{ margin: "1px" }}
                        fluid
                        src={`http://localhost:8000${work.work_img[0].img}`}
                        alt="art peice"
                      />
                    </Link>
                  );
                })
              : ""}
          </Col>
          <Col lg={3} md={6} sm={6}>
            {bucket3
              ? bucket3.map((work) => {
                  return (
                    <Link to={`/${work.id}`}>
                      <Image
                        style={{ margin: "1px" }}
                        fluid
                        src={`http://localhost:8000${work.work_img[0].img}`}
                        alt="art peice"
                      />
                    </Link>
                  );
                })
              : ""}
          </Col>
          <Col lg={3} md={6} sm={6}>
            {bucket4
              ? bucket4.map((work) => {
                  return (
                    <Link to={`/${work.id}`}>
                      <Image
                        style={{ margin: "1px" }}
                        fluid
                        src={`http://localhost:8000${work.work_img[0].img}`}
                        alt="art peice"
                      />
                    </Link>
                  );
                })
              : ""}
          </Col>
          {/* //////////////////////// */}
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
        </div>
      </Container>
    </>
  );
};

export default Home;
