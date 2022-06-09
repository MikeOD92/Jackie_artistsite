import React, { FC, useState, useEffect } from "react";
import { Image } from "react-bootstrap";
const DetailImage: FC<{ img: string; zoomable: boolean }> = ({
  img,
  zoomable,
}) => {
  const [zoom, setZoom] = useState({
    backgroundImage: `url('${img}')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    height: "80vh",
  });

  useEffect(() => {
    if (zoomable === false) {
      setZoom({
        backgroundImage: `url('${img}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        height: "80vh",
      });
    } else {
      setZoom({
        backgroundImage: `url('${img}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "160%",
        height: "80vh",
      });
    }
  }, [img, zoomable]);

  const handleMouseMovement = (
    event: React.MouseEvent<Element, MouseEvent>
  ) => {
    const node = event.target as HTMLElement;
    const { top, left, width, height } = node.getBoundingClientRect();
    const x = ((event.pageX - left) / width) * 100;
    const y = ((event.pageY - top) / height) * 100;
    setZoom({
      backgroundImage: `url('${img}')`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "160%",
      height: "80vh",
    });
  };
  const handleMouseExit = (event: React.MouseEvent<Element, MouseEvent>) => {
    setZoom({
      backgroundImage: `url('${img}')`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      height: "80vh",
    });
  };
  if (zoomable) {
    return (
      <div
        className="invert"
        style={zoom}
        onMouseMove={handleMouseMovement}
        onMouseOut={handleMouseExit}
      ></div>
    );
  } else {
    return (
      <div className="d-flex" style={{ justifyContent: "center" }}>
        {/* <div className="invert" style={zoom}></div> */}
        <Image fluid style={{ height: "80vh" }} src={img} className="invert" />
      </div>
    );
  }
};

export default DetailImage;
