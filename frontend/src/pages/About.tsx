import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { SiteData } from "../types/site_data";
import { Container, Col, Row, Image } from "react-bootstrap";
import { AiOutlineInstagram } from "react-icons/ai";
import useAuth from "../hooks/useAuth";

import PageEdit from "../components/PageEdit";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelect";

const About: FC = () => {
  const auth = useAuth();
  // const [data, setData] = useState<SiteData>();

  const { getPageData } = useActions();

  const { data, error, loading } = useTypedSelector((state) => state.siteData);

  useEffect(() => {
    getPageData("about");
  }, []);

  return (
    <Container
      style={{
        marginTop: "14vh",
        minHeight: "100vh",
      }}
    >
      {auth && data ? (
        <PageEdit data={data} />
      ) : auth && !data ? (
        <PageEdit
          data={{
            id: 0,
            name: "about",
            text: "",
            links: [],
            splash: "",
          }}
        />
      ) : (
        <Row>
          <Col md={4}>
            {data ? (
              <Image src={`${data.splash}`} fluid className="invert" />
            ) : (
              ""
            )}
          </Col>
          <Col className="m-5 ">
            <p style={{ whiteSpace: "pre-wrap" }}> {data ? data.text : ""}</p>
            <ul className="mt-5" style={{ listStyle: "none" }}>
              {data?.links
                ? data.links.map((link, i) => {
                    if (link.title === "instagram") {
                      return (
                        <li className="py-3" key={`${link.title} ${i}`}>
                          <a href={link.url}>
                            {" "}
                            <AiOutlineInstagram
                              style={{ fontSize: "32px", color: "white" }}
                            />{" "}
                          </a>
                        </li>
                      );
                    } else {
                      return (
                        <li
                          key={`${link.title} ${i}`}
                          style={{ color: "white" }}
                        >
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
