import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { SiteData } from "../types/site_data";
import { Container } from "react-bootstrap";
import { AiOutlineInstagram } from "react-icons/ai";
const About: FC = () => {
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
    <Container style={{ marginTop: "20vh" }}>
      <p style={{ whiteSpace: "pre-wrap" }}> {data ? data.text : ""}</p>
      <ul style={{ listStyle: "none" }}>
        {data?.links
          ? data.links.map((link) => {
              if (link.title === "instagram") {
                return (
                  <li>
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
                  <li>
                    <a href={link.url}>{link.text}</a>{" "}
                  </li>
                );
              }
            })
          : ""}
      </ul>
    </Container>
  );
};

export default About;
