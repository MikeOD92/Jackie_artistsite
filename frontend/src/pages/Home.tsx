import { FC, useEffect, useState } from "react";
import axios from "axios";
import { ArtWork } from "../types/art_work";
import { Container, Col, Row } from "react-bootstrap";
import HomeImg from "../components/HomeImg";
import { BiCopyright } from "react-icons/bi";
import { Gi3DStairs } from "react-icons/gi";

import useAuth from "../hooks/useAuth";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelect";
import { get } from "https";

const Home: FC = () => {
  const auth = useAuth();

  const [bucket1, setBucket1] = useState<Array<ArtWork>>([]);
  const [bucket2, setBucket2] = useState<Array<ArtWork>>([]);
  const [bucket3, setBucket3] = useState<Array<ArtWork>>([]);

  const { getArtWorks } = useActions();

  const { data, error, loading } = useTypedSelector(
    (state) => state.artworkList
  );

  // getArtWorks();
  useEffect(() => {
    if (data.length === 0) {
      getArtWorks();
    }
  }, []);

  useEffect(() => {
    if (data.length > 1) {
      setBucket1([]);
      setBucket2([]);
      setBucket3([]);
      let counter = 1;
      for (let i = 0; i < data.length; i++) {
        if (!data[i].work_img[0]) {
          continue;
        }
        if (counter === 4) counter = 1;
        switch (counter) {
          case 1:
            setBucket1((bucket1) => [...bucket1, data[i]]);
            counter++;
            break;
          case 2:
            setBucket2((bucket2) => [...bucket2, data[i]]);
            counter++;
            break;
          case 3:
            setBucket3((bucket3) => [...bucket3, data[i]]);
            counter++;
            break;
          default:
            return;
        }
      }
    } else {
      return;
    }
  }, [data]);

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
        <Col sm={6} md={6} lg={4}>
          {bucket1
            ? bucket1.map((work, i) => {
                return (
                  <HomeImg work={work} auth={auth} key={`${work.title} ${i}`} />
                );
              })
            : ""}
        </Col>
        <Col sm={6} md={6} lg={4}>
          {bucket2
            ? bucket2.map((work, i) => {
                return (
                  <HomeImg work={work} auth={auth} key={`${work.title} ${i}`} />
                );
              })
            : ""}
        </Col>
        <Col sm={12} md={12} lg={4}>
          {bucket3
            ? bucket3.map((work, i) => {
                return (
                  <HomeImg work={work} auth={auth} key={`${work.title} ${i}`} />
                );
              })
            : ""}
        </Col>
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
