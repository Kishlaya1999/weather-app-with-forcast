/** @format */

import React, { useEffect, useState } from "react";
import "./ShowSearchedWeather.css";
import { API_KEY } from "../../utils/constants";
import Forcast from "../Forcast/Forcast";

const ShowSearchedWeather = ({ latitude, longitude }) => {
	const [isCelsius, setIsCelcius] = useState("metric");
	const [forcast, setForcast] = useState({});

	useEffect(() => {
		fetchForcast();
		console.log(forcast, 1);
	}, []);

	useEffect(() => {
		fetchForcast();
		// console.log(forcast, 1);
	}, [latitude, longitude]);

	useEffect(() => {
		const timer = setTimeout(() => {
			fetchForcast();
		}, 20);
		// console.log(forcast, 1);
		return () => {
			clearTimeout(timer);
		};
	}, [isCelsius]);

	const fetchForcast = () => {
		fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${isCelsius}`
		)
			.then((response) => response.json())
			.then((data) => setForcast(data));
	};
	console.log(forcast);
	// if (
	// 	forcast &&
	// 	Object.keys(forcast).length === 0 &&
	// 	Object.getPrototypeOf(forcast) === Object.prototype
	// ) {
	//
	// 	// console.log(city, list);

	// }

	const formatTime = (time, timezone) => {
		const date = new Date((time + timezone) * 1000);
		return `${date.toUTCString().slice(17, 25)}`;
	};

	return (
		<div className="weather">
			{!(Object.keys(forcast).length === 0) && forcast?.list && (
				<div className="weather__current">
					<div className="weather__city_name">{forcast?.city?.name}</div>
					<div className="weather_icon">
						<img
							src={`https://openweathermap.org/img/wn/${forcast?.list[0]?.weather[0]?.icon}@2x.png`}
							alt={forcast?.list[0]?.weather[0]?.main}
							title={forcast?.list[0]?.weather[0]?.main}
						/>
						<span>{forcast?.list[0]?.weather[0]?.main}</span>
					</div>
					<div className="weather__temp_info">
						{isCelsius === "metric" ? (
							<div className="weather__celcius">
								<span className="weather__celcius_no">
									{Math.ceil(forcast?.list[0]?.main?.temp)}°C&nbsp;
								</span>
								|&nbsp;
								<span
									onClick={() => setIsCelcius("imperial")}
									className="weather__other_unit">
									°F
								</span>
							</div>
						) : (
							<div className="weather__fahrenheit">
								<span className="weather__fahrenheit_no">
									{Math.ceil(forcast?.list[0]?.main?.temp)}°F&nbsp;
								</span>
								|&nbsp;
								<span
									onClick={() => setIsCelcius("metric")}
									className="weather__other_unit">
									°C
								</span>
							</div>
						)}
					</div>
					<div className="weather__other_info">
						{isCelsius === "metric" ? (
							<div className="weather__other_info_celcius">
								<div className="weather__feels_like">
									Feels Like:{" "}
									{Math.ceil(forcast?.list[0]?.main?.feels_like)}
									°C
								</div>
								<div className="weather__temp_max">
									<i className="fa-solid fa-temperature-arrow-up"></i>{" "}
									Max. Temprature:{" "}
									{Math.ceil(forcast?.list[0]?.main?.temp_max)}°C
								</div>
								<div className="weather__feels_min">
									<i className="fa-solid fa-temperature-arrow-down"></i>{" "}
									Min. Temprature:{" "}
									{Math.ceil(forcast?.list[0]?.main?.temp_min)}°C
								</div>
							</div>
						) : (
							<div className="weather__other_info_celcius">
								<div className="weather__feels_like">
									Feels Like:{" "}
									{Math.ceil(forcast?.list[0]?.main?.feels_like)}
									°F
								</div>
								<div className="weather__temp_max">
									<i className="fa-solid fa-temperature-arrow-up"></i>{" "}
									Max. Temprature:{" "}
									{Math.ceil(forcast?.list[0]?.main?.temp_max)}°F
								</div>
								<div className="weather__feels_min">
									<i className="fa-solid fa-temperature-arrow-down"></i>{" "}
									Min. Temprature:{" "}
									{Math.ceil(forcast?.list[0]?.main?.temp_min)}°F
								</div>
							</div>
						)}
						<div className="weather_sunrise_sunset">
							<span className="weather_sunrise">
								<i className="fa-regular fa-sun"></i> Sunrise:{" "}
								{formatTime(
									forcast?.city?.sunrise,
									forcast?.city?.timezone
								)}{" "}
								AM
							</span>
							<span className="weather_sunset">
								<i className="fa-solid fa-moon"></i> Sunset:{" "}
								{formatTime(forcast?.city?.sunset, forcast?.city?.timezone)}{" "}
								PM
							</span>
						</div>
					</div>
				</div>
			)}
			{!(Object.keys(forcast).length === 0) && forcast?.list && (
				<Forcast isCelsius={isCelsius} list={forcast?.list.slice(1, 5)} />
			)}
		</div>
	);
};

export default ShowSearchedWeather;
