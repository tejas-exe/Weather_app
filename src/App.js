import { useState } from "react";
import "./App.css";
import WeatherDisplay from "./Components/WeatherDisplay";

function App() {
  const [mode, setMode] = useState(false);
  const Dayurl = require("./Asset/pexels-donald-tong-139446.jpg"); // Assuming the image is in the correct path
  const Nighturl = require("./Asset/pexels-samer-daboul-746111.jpg");

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${mode ? Nighturl : Dayurl})`,
      }}
    >
      <WeatherDisplay
        setMode={() => {
          setMode((val) => !val);
        }}
      />
    </div>
  );
}

export default App;
