import { FC, useEffect, useState } from "react";
import axios from "axios";
import { ArtWork } from "../types/art_work";
import { Container, Image, Col, Row } from "react-bootstrap";
const Home: FC = () => {
  const [artworks, setArtworks] = useState<Array<ArtWork>>([]);

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
    <Container className="mt-3 py-3" style={{ background: "aliceblue" }}>
      <Container
        className="padding-0"
        id="art-grid"
        fluid
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {artworks.map((work) => {
          return (
            <Image
              className="m-1"
              src={`http://localhost:8000${work.work_img[0].img}`}
              onClick={() => console.log(work.title)}
              style={{
                maxHeight: "40vh",
                objectFit: "contain",
                verticalAlign: "bottom",
                display: "inline",
              }}
              alt="art peice"
            />
          );
        })}
        {/* </Row> */}
      </Container>
    </Container>
  );
};

export default Home;
