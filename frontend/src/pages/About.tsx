import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { SiteData } from "../types/site_data";
import { Container } from "react-bootstrap";

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
      <p> {data ? data.text : ""}</p>
      {data?.links
        ? data.links.map((link) => {
            return <a href={link.url}>{link.text}</a>;
          })
        : ""}
    </Container>
  );
};

export default About;
