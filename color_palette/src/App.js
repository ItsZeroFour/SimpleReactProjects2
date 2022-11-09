import React, { useState } from "react";
import { colors } from "./data";
import "./App.css";

function App() {
  const [changeBackground, setChangeBackground] = useState("");
  const [copyed, setCopyed] = useState(false);

  function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : null;
  }

  copyed &&
    setTimeout(() => {
      setCopyed(false);
    }, 3000);

  return (
    <div
      className="App"
      style={
        changeBackground === ""
          ? { background: "#fff" }
          : { background: `#${changeBackground}` }
      }
    >
      <div className="container">
        {copyed && <h1>Copyed!</h1>}

        {colors.map(({ color }) => (
          <div key={color} className="content">
            <div
              className="color-block"
              style={{ background: `#${color}` }}
              onClick={() => setChangeBackground(color)}
            ></div>
            <p
              style={
                changeBackground === ""
                  ? { color: `#${color}` }
                  : { color: "#fff" }
              }
              onClick={() => {
                navigator.clipboard.writeText(`#${color}`);
                setCopyed(true);
              }}
            >
              #{color}
            </p>

            <p
              className="rgb-color"
              style={
                changeBackground === ""
                  ? { color: `#${color}` }
                  : { color: "#fff" }
              }
              onClick={() => {
                navigator.clipboard.writeText(`(${hexToRgb(color).join(",")})`);
                setCopyed(true);
              }}
            >
              ({hexToRgb(color).join(",")})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
