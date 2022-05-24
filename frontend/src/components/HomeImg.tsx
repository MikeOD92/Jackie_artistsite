import React, { FC, useRef } from "react";
import { ArtWork } from "../types/art_work";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import useInView from "../hooks/useInView";
import { isNull } from "util";

const HomeImg: FC<{ work: ArtWork }> = ({ work }) => {
  const element = useRef<HTMLImageElement>(null);
  const visable = useInView(element);

  const style = (visable: Boolean) => ({
    transition: "1s ease-in",
    opacity: visable ? "0" : "1",
  });

  return (
    <Link to={`/${work.id}`}>
      <Image
        ref={element}
        style={style(visable)}
        fluid
        src={`http://localhost:8000${work.work_img[0].img}`}
        alt="art peice"
      />
    </Link>
  );
};
export default HomeImg;
