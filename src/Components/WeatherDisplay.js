import React, { useState } from "react";
import { fechApi } from "../Api/Api";
import Card from "./Card";
import style from "./WeatherDisplay.module.css";

const WeatherDisplay = () => {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [dipCity, setdispCity] = useState("");
  const [logo, setLogo] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [discription, setDiscription] = useState("");
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
              } else {
                alert("Something went wrong");
              }
              setCity("");
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
          <button type="submit" className={style.btn}>Get Weather</button>
        </form>
        {temp && <p className={style.textcity}>{`${dipCity}`}</p>}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {temp && <p className={style.textTemp}>{`${temp}°C`}</p>}
          {logo && (
            <img
              src={`http://openweathermap.org/img/w/${logo}.png`}
              alt="icon"
              className={style.icon}
            />
          )}
        </div>
        {temp && <p className={style.text}>{discription}</p>}
        {temp && <p className={style.text}>{`Feels like${feelsLike}°C`}</p>}
      </Card>
    </div>
  );
};

export default WeatherDisplay;
