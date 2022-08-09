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
  const [pageData, setPageData] = useState<SiteData>();

  const { data, error } = useTypedSelector((state) => state.siteData);

  useEffect(() => {
    const about = data.filter((item: SiteData) => item.name === "about");
    setPageData(about[0]);
  }, []);

  return (
    <Container
      style={{
        marginTop: "14vh",
        minHeight: "100vh",
      }}
    >
      {auth && pageData ? (
        <PageEdit data={pageData} setData={setPageData} />
      ) : auth && !data ? (
        <PageEdit
          data={{
            id: 0,
            name: "about",
            text: "",
            links: [],
            splash: "",
          }}
          setData={setPageData}
        />
      ) : error ? (
        <h1> Error </h1>
      ) : (
        <Row>
          <Col md={4}>
            {pageData ? (
              <Image src={`${pageData.splash}`} fluid className="invert" />
            ) : (
              ""
            )}
          </Col>
          <Col className="m-5 ">
            <p style={{ whiteSpace: "pre-wrap" }}>
              {" "}
              {pageData ? pageData.text : ""}
            </p>
            <ul className="mt-5" style={{ listStyle: "none" }}>
              {pageData?.links
                ? pageData.links.map((link, i) => {
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
