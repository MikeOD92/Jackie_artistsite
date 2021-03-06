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
    const fetch = async (pageName: string) => {
      try {
        const { data } = await axios.get("/api/site-data");
        const pageData = data.filter(
          (item: SiteData) => item.name === pageName
        );
        setData(pageData[0]);
      } catch (err: any) {
        console.error(err);
      }
    };
    fetch("CV");
  }, []);

  return (
    <Container
      style={{
        marginTop: "20vh",
        minHeight: "100vh",
      }}
    >
      {auth && data ? (
        <PageEdit data={data} setData={setData} />
      ) : auth && !data ? (
        <PageEdit
          data={{
            id: 0,
            name: "CV",
            text: "",
            links: [],
            splash: "",
          }}
          setData={setData}
        />
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
