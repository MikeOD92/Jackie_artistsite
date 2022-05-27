import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { SiteData } from "../types/site_data";
import { Container } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import PageEdit from "../components/PageEdit";

const CV: FC = () => {
  const auth = useAuth();
  const [data, setData] = useState<SiteData>();

  useEffect(() => {
    if (data) return;
    const fetch = async () => {
      const fetchData = await axios.get("http://localhost:8000/api/site-data");
      const pageData = fetchData.data.filter(
        (item: SiteData) => item.name === "CV"
      );
      setData(pageData[0]);
    };
    fetch();
  });

  return (
    <Container style={{ marginTop: "20vh", minHeight: "100vh" }}>
      {auth && data ? (
        <PageEdit data={data} />
      ) : (
        <>
          {" "}
          <p style={{ whiteSpace: "pre-wrap" }}> {data ? data.text : ""}</p>
          {data?.links
            ? data.links.map((link) => {
                return <a href={link.url}>{link.text}</a>;
              })
            : ""}
        </>
      )}
    </Container>
  );
};

export default CV;
