import React, { FC, SyntheticEvent } from "react";
import { Row, Col, Image } from "react-bootstrap";

const MediaEdit: FC<{ images: string[]; setImages: Function }> = ({
  images,
  setImages,
}) => {
  const removeUpload = (e: SyntheticEvent, idx: number) => {
    e.preventDefault();
    if (images.length === 1) {
      setImages([]);
    } else {
      let newset = images;
      newset.splice(idx, 1);
      setImages([...newset]);
    }
  };
  return (
    <Row>
      {images.length > 0 ? (
        <>
          <p>
            <small>* click on image to remove</small>
          </p>
          {images.map((img, i) => {
            return (
              <Col md={4} key={i}>
                <Image
                  src={`http://localhost:8000${img}`}
                  fluid
                  className="mb-3"
                  onClick={(e) => removeUpload(e, i)}
                />
              </Col>
            );
          })}
        </>
      ) : (
        ""
      )}
    </Row>
  );
};

export default MediaEdit;
