import React, { FC, useState, useEffect } from "react";
import { Image } from "react-bootstrap";
const DetailImage: FC<{ img: string }> = ({ img }) => {
  const [zoom, setZoom] = useState({
    background: `url('http://localhost:8000${img}')`,
    backgroundPosition: "0% 0%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    height: "85vh",
  });

  useEffect(() => {
    setZoom({
      background: `url('http://localhost:8000${img}')`,
      backgroundPosition: "0% 0%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      height: "85vh",
    });
  }, [img]);

  const handleMouseMovement = (
    event: React.MouseEvent<Element, MouseEvent>
  ) => {
    const node = event.target as HTMLElement;
    const { top, left, width, height } = node.getBoundingClientRect();
    const x = ((event.pageX - left) / width) * 100;
    const y = ((event.pageY - top) / height) * 100;

    setZoom({
      background: `url('http://localhost:8000${img}')`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      height: "85vh",
    });
  };
  return (
    <div style={zoom} onMouseMove={handleMouseMovement}>
      <Image
        fluid
        src={`http://localhost:8000${img}`}
        style={{ height: "85vh" }}
      />
    </div>
  );
};

export default DetailImage;
