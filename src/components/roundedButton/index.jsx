import React from "react";
import "./rounded-btn.css";
export default function RoundedButton({ text, onPress, ...rest }) {
  return (
    <div className="RoundedBtnContainer" onClick={onPress} {...rest}>
      {text ?? "Button"}
    </div>
  );
}
