import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  attachImages,
  deleteImage,
  getImages,
} from "../../redux/features/fileSlice";
import { Button, Modal } from "react-bootstrap";

const Attachment = ({ module, id }) => {
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { loading, data, error } = useSelector((state) => state.attachments);

  const handleAttachmentButton = () => {
    if (isAttachmentOpen) {
      setIsAttachmentOpen(false);
    } else {
      setIsAttachmentOpen(true);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      dispatch(attachImages({ module, id, files }))
        .unwrap()
        .then(() => dispatch(getImages({ module, id })));
      e.target.value = "";
    }
  };

  const truncateFileName = (name, maxLength = 10) => {
    if (!name) return "";
    return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
  };

  useEffect(() => {
    dispatch(getImages({ module, id }));
  }, [dispatch, module, id]);

  return (
    <>
      <div className="d-flex align-items-center">
        <div onClick={handleAttachmentButton} style={{ cursor: "pointer" }}>
          <i
            className={`bi ${
              isAttachmentOpen ? "bi-chevron-down" : "bi-chevron-right"
            } me-2 small`}
          ></i>
          <strong>Attachments</strong>
        </div>
        <div className="ms-auto">
          <input
            type="file"
            multiple
            ref={fileInputRef}
            className="d-none"
            onChange={handleFileChange}
          />
          <div
            className="text-primary"
            onClick={handleClick}
            style={{ cursor: "pointer", userSelect: "none" }}
          >
            + Add
          </div>
        </div>
      </div>
      {isAttachmentOpen && (
        <>
          <div className="d-flex flex-wrap gap-2">
            {loading && <p>Uploading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {Array.isArray(data) &&
              data.map((file) => (
                <div
                  key={file.id}
                  className="d-flex align-items-center justify-content-between bg-secondary-subtle rounded-3 p-2 mt-2 w-100"
                >
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded me-3 d-flex align-items-center justify-content-center bg-secondary-subtle"
                      style={{
                        width: "50px",
                        height: "50px",
                        cursor: "pointer",
                      }}
                      onClick={() => setPreviewImage(file)}
                    >
                      <img
                        src={file.image}
                        alt={file.name}
                        className="img-fluid object-fit-contain rounded"
                        style={{ maxHeight: "40px" }}
                      />
                    </div>
                    <div>
                      <div className="fw-semibold small">
                        {truncateFileName(file.name, 15)}
                      </div>
                      <div className="text-muted small">
                        {new Date(file.upload_time).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {Array.isArray(data) && data.length === 0 && (
              <p className="text-muted small">
                See the files attached to your activities or uploaded to this
                record.
              </p>
            )}
          </div>
        </>
      )}
      <Modal
        show={!!previewImage}
        onHide={() => {
          setPreviewImage(null);
          setConfirmDelete(false);
        }}
        centered
        size="lg"
      >
        <Modal.Body className="d-flex justify-content-center">
          <img
            src={previewImage?.image}
            alt="preview"
            className="img-fluid rounded"
            style={{
              maxHeight: "80vh",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            variant="outline-danger"
            onClick={() => setConfirmDelete(true)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={confirmDelete}
        onHide={() => setConfirmDelete(false)}
        centered
        size="sm"
        backdrop={false}
        className="bg-dark bg-opacity-75"
      >
        <Modal.Body className="text-center">
          <h6>Are you sure you want to delete this image?</h6>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            variant="danger"
            onClick={() => {
              dispatch(deleteImage({ id: previewImage.id }))
                .unwrap()
                .then(() => dispatch(getImages({ module, id })));
              setConfirmDelete(false);
              setPreviewImage(null);
            }}
          >
            Delete
          </Button>
          <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Attachment;
