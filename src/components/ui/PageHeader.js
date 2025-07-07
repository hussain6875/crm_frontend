import React from "react";
import ButtonGroup from "./ButtonGroup";

export default function PageHeader({ title }) {
  return (
    <div
      className="bg-white rounded-top d-flex flex-nowrap align-items-center"
      style={{
        width: "95%",
        margin: "auto",
        height: "10%",
        marginLeft: "20px",
        marginRight: "10px",
        justifyContent: "space-between",
      }}
    >
      <h5 style={{ paddingLeft: "20px" }} className="m-0">
        {title}
      </h5>

      <ButtonGroup />
    </div>
  );
}
