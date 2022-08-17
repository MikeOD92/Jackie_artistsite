import { FC, useEffect, useState } from "react";
import { ArtWork } from "../types/art_work";
import { Container, Col, Row } from "react-bootstrap";
import HomeImg from "../components/HomeImg";
import { BiCopyright } from "react-icons/bi";
import { Gi3DStairs } from "react-icons/gi";
import { useActions } from "../hooks/useActions";
import useAuth from "../hooks/useAuth";
import { useTypedSelector } from "../hooks/useTypedSelect";

const Home: FC = () => {
  const auth = useAuth();
  const { fetchData, getArtworkList } = useActions();

  const { data } = useTypedSelector((state) => state.siteData);
  const artworkList = useTypedSelector((state) => state.artworkList);

  useEffect(() => {
    getArtworkList();
    if (data.length <= 0) {
      fetchData();
    }
  }, []);
  // so becasue i moved this out of the header it should run every time we vist the Home page.
  // this makes more calls but allows be to remove the extra call to pull the list in the edit and delete action creators.

  const [bucket1, setBucket1] = useState<Array<ArtWork>>([]);
  const [bucket2, setBucket2] = useState<Array<ArtWork>>([]);
  const [bucket3, setBucket3] = useState<Array<ArtWork>>([]);

  useEffect(() => {
    if (artworkList.list.length > 1) {
      setBucket1([]);
      setBucket2([]);
      setBucket3([]);
      let counter = 1;
      for (let i = 0; i < artworkList.list.length; i++) {
        if (!artworkList.list[i].work_img[0]) {
          continue;
        }
        if (counter === 4) counter = 1;
        switch (counter) {
          case 1:
            setBucket1((bucket1) => [...bucket1, artworkList.list[i]]);
            counter++;
            break;
          case 2:
            setBucket2((bucket2) => [...bucket2, artworkList.list[i]]);
            counter++;
            break;
          case 3:
            setBucket3((bucket3) => [...bucket3, artworkList.list[i]]);
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
