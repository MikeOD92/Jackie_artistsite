import { FC, useEffect, useState } from "react";
import axios from "axios";
import { ArtWork } from "../types/art_work";
import { Container, Col, Row } from "react-bootstrap";
import HomeImg from "../components/HomeImg";
import { BiCopyright } from "react-icons/bi";
const Home: FC = () => {
  const [artworks, setArtworks] = useState<Array<ArtWork>>([]);

  const [bucket1, setBucket1] = useState<Array<ArtWork>>([]);
  const [bucket2, setBucket2] = useState<Array<ArtWork>>([]);
  const [bucket3, setBucket3] = useState<Array<ArtWork>>([]);

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

  useEffect(() => {
    if (artworks.length === 0) return;
    setBucket1([]);
    setBucket2([]);
    setBucket3([]);
    let counter = 1;
    for (let i = 0; i < artworks.length; i++) {
      if (counter === 4) counter = 1;
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
        default:
          return;
      }
    }
  }, [artworks]);
  return (
    <>
      <Container
        fluid
        style={{
          marginBottom: "40vh",
          marginTop: "15vh",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          minHeight: "100vh",
        }}
      >
        <Col sm={6} md={6} lg={4}>
          {bucket1
            ? bucket1.map((work, i) => {
                return <HomeImg work={work} key={`${work.title} ${i}`} />;
              })
            : ""}
        </Col>
        <Col sm={6} md={6} lg={4}>
          {bucket2
            ? bucket2.map((work, i) => {
                return <HomeImg work={work} key={`${work.title} ${i}`} />;
              })
            : ""}
        </Col>
        <Col sm={6} md={6} lg={4}>
          {bucket3
            ? bucket3.map((work, i) => {
                return <HomeImg work={work} key={`${work.title} ${i}`} />;
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
                  maxHeight: "60vh",
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
        {/* </div> */}
      </Container>
      <footer className="p-2" style={{ fontSize: "13px" }}>
        <Row>
          <Col md={2}>
            <small>
              Website by{" "}
              <a style={{ color: "darkgray" }} href="https://www.m-odell.com">
                Michael O'Dell
              </a>
            </small>
          </Col>
          <Col className="text-center">
            Copyright <BiCopyright /> Jackie Slanley
          </Col>
        </Row>
      </footer>
    </>
  );
};

export default Home;
