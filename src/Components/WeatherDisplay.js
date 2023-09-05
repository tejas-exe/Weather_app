import React, { useState } from "react";
import { fechApi } from "../Api/Api";
import Card from "./Card";
import style from "./WeatherDisplay.module.css";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import styled from "@emotion/styled";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";

const WeatherDisplay = ({ setMode }) => {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [dipCity, setdispCity] = useState("");
  const [logo, setLogo] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [discription, setDiscription] = useState("");
  const [hi, setHI] = useState("");
  const [windSpeed, setwindSpeed] = useState("");
  const [timings, setTimings] = useState({});
  const [favoureCity, setFavouratecity] = useState([]);
  const [modeText, setModeText] = useState(false);

  return (
    <div className={style.container}>
      <Card>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (city) {
              let res = await fechApi.fechWeather(city);
              if (res.cod === 200) {
                setTemp(Math.floor(res.main.temp * 1));
                setdispCity(res.name);
                setLogo(res.weather[0].icon);
                setFeelsLike(Math.floor(res.main.feels_like * 1));
                setDiscription(res.weather[0].description);
                setHI(res.main.humidity);
                setwindSpeed(res.wind.speed);
                setTimings({
                  sunrise: res.sys.sunrise,
                  sunset: res.sys.sunset,
                });
              } else {
                alert("Something went wrong");
              }
            }
          }}
        >
          <input
            type="text"
            name=""
            id=""
            value={city}
            placeholder="Enter city name"
            className={style.ipt}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <button type="submit" className={style.btn}>
            Get Weather
          </button>
          <button
            style={{ borderRadius: "10px", border: "none", marginLeft: "5px" }}
            onClick={() => {
              if (!favoureCity.includes(city)) {
                setFavouratecity((item) => [...item, city]);
              } else {
                alert("allready favourate hai bro, Marna hai kya vaha jake");
              }
            }}
          >
            <StarBorderIcon /> Add to Favourate
          </button>
          <MaterialUISwitch
            sx={{ m: 1 }}
            onClick={(e) => {
              setMode();
              setModeText((val) => !val);
            }}
          />
          <FormControl sx={{ m: 1, width: "83%" }} size="small">
            <InputLabel id="demo-select-small-label">
              Select favourite city
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Select your facoutrate city"
              onChange={async (e) => {
                setCity(e.target.value);
                if (city) {
                  let res = await fechApi.fechWeather(e.target.value);
                  if (res.cod === 200) {
                    setTemp(Math.floor(res.main.temp * 1));
                    setdispCity(res.name);
                    setLogo(res.weather[0].icon);
                    setFeelsLike(Math.floor(res.main.feels_like * 1));
                    setDiscription(res.weather[0].description);
                    setHI(res.main.humidity);
                    setwindSpeed(res.wind.speed);
                    setTimings({
                      sunrise: res.sys.sunrise,
                      sunset: res.sys.sunset,
                    });
                  } else {
                    alert("Something went wrong");
                  }
                }
              }}
            >
              {favoureCity.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
        {console.log("===<>", favoureCity)}
        {temp && (
          <p
            className={`${modeText ? style.textcity : style.textcityDark}`}
          >{`${dipCity}`}</p>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {temp && (
            <p
              className={modeText ? style.textTemp : style.textTempDark}
            >{`${temp}°C / ${Math.ceil(temp * 1.8 + 32)}°F`}</p>
          )}
          {logo && (
            <img
              src={`http://openweathermap.org/img/w/${logo}.png`}
              alt="icon"
              className={style.icon}
            />
          )}
        </div>
        {temp && (
          <p className={modeText ? style.text : style.textDark}>
            {discription}
          </p>
        )}

        {temp && (
          <p
            className={modeText ? style.text : style.textDark}
          >{`Humidity Index: ${hi}`}</p>
        )}
        {temp && (
          <p
            className={modeText ? style.text : style.textDark}
          >{`Wind speed: ${windSpeed}`}</p>
        )}
        {temp && (
          <p
            className={modeText ? style.text : style.textDark}
          >{`Feels like: ${feelsLike}°C`}</p>
        )}
        {temp && (
          <p className={modeText ? style.text : style.textDark}>
            <WbSunnyIcon />
            {`Sunrise: ${ampm(timings.sunrise)}`}
          </p>
        )}
        {temp && (
          <p className={modeText ? style.text : style.textDark}>
            <WbTwilightIcon />
            {`Sunset :${ampm(timings.sunset)}`}
          </p>
        )}
      </Card>
    </div>
  );
};

export default WeatherDisplay;

const ampm = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const formattedHours = (date.getHours() % 12 || 12)
    .toString()
    .padStart(2, "0");
  const formattedMinutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,

  height: 34,

  padding: 7,

  "& .MuiSwitch-switchBase": {
    margin: 1,

    padding: 0,

    transform: "translateX(6px)",

    "&.Mui-checked": {
      color: "#fff",

      transform: "translateX(22px)",

      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },

      "& + .MuiSwitch-track": {
        opacity: 1,

        backgroundColor: theme.palette?.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },

  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette?.mode === "dark" ? "#003892" : "#001e3c",

    width: 32,

    height: 32,

    "&:before": {
      content: "''",

      position: "absolute",

      width: "100%",

      height: "100%",

      left: 0,

      top: 0,

      backgroundRepeat: "no-repeat",

      backgroundPosition: "center",

      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },

  "& .MuiSwitch-track": {
    opacity: 1,

    backgroundColor: theme.palette?.mode === "dark" ? "#8796A5" : "#aab4be",

    borderRadius: 20 / 2,
  },
}));
