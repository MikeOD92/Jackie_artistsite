import { FC, useEffect, useState, SyntheticEvent } from "react";
import axios from "axios";
import { ArtWork } from "../types/art_work";
import { Container, Image, Col, Row } from "react-bootstrap";
import ArtworkDetail from "../components/ArtworkDetail";

const Home: FC = () => {
  const [artworks, setArtworks] = useState<Array<ArtWork>>([]);
  const [detail, setDetail] = useState<ArtWork>();
  const [view, setView] = useState<Boolean>(false);

  const viewDetails = (data: ArtWork) => {
    return (event: React.MouseEvent) => {
      setDetail(data);
      setView(true);
      event.preventDefault();
    };
  };

  const closeView = () => {
    return (event: React.MouseEvent) => {
      setView(false);
      // event.preventDefault();
    };
  };
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
      {view && detail ? (
        <div
          style={{
            zIndex: "100",
            position: "fixed",
            minHeight: "100vh",
            width: "100vw",
          }}
        >
          <ArtworkDetail data={detail} close={closeView()} />
        </div>
      ) : (
        ""
      )}
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
            }}
          >
            {artworks.map((work) => {
              return (
                <Image
                  className="m-1"
                  src={`http://localhost:8000${work.work_img[0].img}`}
                  onClick={viewDetails(work)}
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
      </>
    </>
  );
};

export default Home;
