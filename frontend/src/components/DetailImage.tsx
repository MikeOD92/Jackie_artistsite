import React, { FC, useState, useEffect } from "react";

const DetailImage: FC<{ img: string; zoomable: boolean }> = ({
  img,
  zoomable,
}) => {
  const [zoom, setZoom] = useState({
    backgroundImage: `url('http://localhost:8000${img}')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    height: "85vh",
  });

  useEffect(() => {
    setZoom({
      backgroundImage: `url('http://localhost:8000${img}')`,
      backgroundPosition: "center",
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
      backgroundImage: `url('http://localhost:8000${img}')`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "160%",
      height: "85vh",
    });
  };
  const handleMouseExit = (event: React.MouseEvent<Element, MouseEvent>) => {
    setZoom({
      backgroundImage: `url('http://localhost:8000${img}')`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      height: "85vh",
    });
  };
  if (zoomable) {
    return (
      <div
        style={zoom}
        onMouseMove={handleMouseMovement}
        onMouseOut={handleMouseExit}
      ></div>
    );
  } else {
    return <div style={zoom}></div>;
  }
};

export default DetailImage;
