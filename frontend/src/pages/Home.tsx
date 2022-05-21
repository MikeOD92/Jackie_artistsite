import { FC, useEffect, useState, SyntheticEvent } from "react";
import axios from "axios";
import { ArtWork } from "../types/art_work";
import { Container, Image, Col, Row } from "react-bootstrap";
import ArtworkDetail from "./ArtworkDetail";
import { Link } from "react-router-dom";

const Home: FC = () => {
  const [artworks, setArtworks] = useState<Array<ArtWork>>([]);
  const [detail, setDetail] = useState<ArtWork>();
  const [view, setView] = useState<Boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      const fetchData = await axios.get("http://localhost:8000/api/artwork");
      const data = fetchData.data;
      setArtworks(data);
    };
    fetch();
    console.log(artworks);
  }, []);

  return (
    <>
      <Container className="mt-3 py-3 " style={{ marginBottom: "40vh" }}>
        <Container
          className="padding-0"
          id="art-grid"
          fluid
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            margin: "0 auto",
            justifyContent: "center",
          }}
        >
          {artworks.map((work) => {
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
          })}
        </Container>
      </Container>
    </>
  );
};

export default Home;
