import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { SiteData } from "../types/site_data";
import { Container, Col, Row, Image } from "react-bootstrap";
import { AiOutlineInstagram } from "react-icons/ai";
import useAuth from "../hooks/useAuth";

import PageEdit from "../components/PageEdit";

const About: FC = () => {
  const auth = useAuth();
  const [data, setData] = useState<SiteData>();

  useEffect(() => {
    if (data) return;
    const fetch = async () => {
      const fetchData = await axios.get("http://localhost:8000/api/site-data");
      const pageData = fetchData.data.filter(
        (item: SiteData) => item.name === "about"
      );
      setData(pageData[0]);
    };
    fetch();
  });

  return (
    <Container style={{ marginTop: "14vh", minHeight: "100vh" }}>
      {auth && data ? (
        <PageEdit data={data} setData={setData} />
      ) : (
        <Row>
          <Col md={4}>
            <Image src="http://localhost:8000/media/Ceram%2B1.jpg" fluid />
          </Col>
          <Col className="mt-5">
            <p style={{ whiteSpace: "pre-wrap" }}> {data ? data.text : ""}</p>
            <ul style={{ listStyle: "none" }}>
              {data?.links
                ? data.links.map((link, i) => {
                    if (link.title === "instagram") {
                      return (
                        <li className="py-3" key={`${link.title} ${i}`}>
                          <a href={link.url}>
                            {" "}
                            <AiOutlineInstagram
                              style={{ fontSize: "32px", color: "black" }}
                            />{" "}
                          </a>
                        </li>
                      );
                    } else {
                      return (
                        <li className="mt-5" key={`${link.title} ${i}`}>
                          <a href={link.url}>{link.text}</a>{" "}
                        </li>
                      );
                    }
                  })
                : ""}
            </ul>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default About;
