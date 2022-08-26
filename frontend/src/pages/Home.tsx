import { FC, useEffect, useState, useRef } from "react";
import axios from "axios";
import { ArtWork } from "../types/art_work";
import { Container, Col, Row } from "react-bootstrap";
import HomeImg from "../components/HomeImg";
import { BiCopyright } from "react-icons/bi";
import { Gi3DStairs } from "react-icons/gi";
import useAuth from "../hooks/useAuth";
import useCheckWidth from "../hooks/useCheckWidth";

const Home: FC = () => {
  const auth = useAuth();

  const [artworkList, setArtworkList] = useState<Array<ArtWork>>([]);
  const [bucket1, setBucket1] = useState<Array<ArtWork>>([]);
  const [bucket2, setBucket2] = useState<Array<ArtWork>>([]);
  const [bucket3, setBucket3] = useState<Array<ArtWork>>([]);

  const gridState = useCheckWidth();

  useEffect(() => {
    if (artworkList.length === 0) {
      const fetch = async () => {
        try {
          const { data } = await axios.get("/api/artwork");
          setArtworkList(data);
        } catch (err: any) {
          console.log(err);
        }
      };
      fetch();
    }
  }, []);

  useEffect(() => {
    if (artworkList.length > 1) {
      setBucket1([]);
      setBucket2([]);
      setBucket3([]);
      let counter = 1;
      for (let i = 0; i < artworkList.length; i++) {
        if (!artworkList[i].work_img[0]) {
          continue;
        }
        if (counter === 4) counter = 1;
        switch (counter) {
          case 1:
            setBucket1((bucket1) => [...bucket1, artworkList[i]]);
            counter++;
            break;
          case 2:
            setBucket2((bucket2) => [...bucket2, artworkList[i]]);
            counter++;
            break;
          case 3:
            setBucket3((bucket3) => [...bucket3, artworkList[i]]);
            counter++;
            break;
          default:
            return;
        }
      }
    } else {
      return;
    }
  }, [artworkList]);

  return (
    <div>
      <Container
        fluid
        style={{
          marginBottom: "45vh",
          marginTop: "11.5vh",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          minHeight: "100vh",
        }}
      >
        {!gridState ? (
          <>
            {artworkList
              ? artworkList.map((work, i) => {
                  return (
                    <HomeImg
                      work={work}
                      auth={auth}
                      key={`${work.title} ${i}`}
                    />
                  );
                })
              : ""}
          </>
        ) : gridState ? (
          <>
            <Col md={4} lg={4}>
              {bucket1
                ? bucket1.map((work, i) => {
                    return (
                      <HomeImg
                        work={work}
                        auth={auth}
                        key={`${work.title} ${i}`}
                      />
                    );
                  })
                : ""}
            </Col>
            <Col md={4} lg={4}>
              {bucket2
                ? bucket2.map((work, i) => {
                    return (
                      <HomeImg
                        work={work}
                        auth={auth}
                        key={`${work.title} ${i}`}
                      />
                    );
                  })
                : ""}
            </Col>
            <Col md={4} lg={4}>
              {bucket3
                ? bucket3.map((work, i) => {
                    return (
                      <HomeImg
                        work={work}
                        auth={auth}
                        key={`${work.title} ${i}`}
                      />
                    );
                  })
                : ""}
            </Col>
          </>
        ) : (
          ""
        )}
      </Container>

      <Row>
        {/* <Col md={12} style={{ textAlign: "right" }}> */}

        {/* </Col> */}
      </Row>
      <footer className="p-2" style={{ fontSize: "13px" }}>
        <Row>
          <Col md={4} style={{ display: "flex", alignItems: "flex-end" }}>
            <small>
              Website by{" "}
              <a style={{ color: "darkgray" }} href="https://www.m-odell.com">
                Michael O'Dell
              </a>
            </small>
          </Col>
          <Col
            md={4}
            className="text-center"
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            Copyright <BiCopyright /> Jackie Slanley
          </Col>
          <Col md={4} style={{ textAlign: "right" }}>
            <a
              href="/#"
              style={{
                color: "grey",
                textDecoration: "none",
                padding: "10px",
                fontSize: "34px",
              }}
            >
              <Gi3DStairs />
            </a>
          </Col>
        </Row>
      </footer>
    </div>
  );
};

export default Home;
