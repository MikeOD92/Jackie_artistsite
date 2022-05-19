import { FC, useEffect, useState } from "react";
import axios from "axios";
import { ArtWork } from "../types/art_work";
import { Container, Image } from "react-bootstrap";
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
    <Container style={{ background: "red" }}>
      <h1> HOME PAGE</h1>
      <Container id="artgrid">
        {artworks.map((work) => {
          return (
            <Image
              fluid
              src={`http://localhost:8000${work.work_img[0].img}`}
              onClick={() => console.log("helloworld")}
            />
          );
        })}
      </Container>
    </Container>
  );
};

export default Home;
