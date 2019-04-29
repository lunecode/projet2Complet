import React, { Component } from "react";
import "./CardCTA.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CardCTA = ({ dataCopy }) => {
  return (
    <div>
      <CopyToClipboard text={dataCopy}>
        <button className="sendButton">Copy</button>
      </CopyToClipboard>
    </div>
  );
};

export default CardCTA;
