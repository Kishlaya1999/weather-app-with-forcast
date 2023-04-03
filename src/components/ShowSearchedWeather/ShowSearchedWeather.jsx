/** @format */

import React, { useEffect, useState } from "react";
import "./ShowSearchedWeather.css";
import { API_KEY } from "../../utils/constants";

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
						<div className="weather__other_info_celcius">
							<div className="weather__feels_like">
								Feels Like: {Math.ceil(forcast?.list[0]?.main?.feels_like)}
								°C
							</div>
							<div className="weather__temp_max">
								<i className="fa-solid fa-temperature-arrow-up"></i> Max.
								Temprature: {Math.ceil(forcast?.list[0]?.main?.temp_max)}°C
							</div>
							<div className="weather__feels_min">
								<i className="fa-solid fa-temperature-arrow-down"></i> Min.
								Temprature: {Math.ceil(forcast?.list[0]?.main?.temp_min)}°C
							</div>
						</div>
						{/* <div className="weather__other_info_fahrenheit">
					<div className="weather__feels_like">16°C</div>
					<div className="weather__temp_max">17°C</div>
					<div className="weather__feels_min">14°C</div>
				</div> */}
					</div>
				</div>
			)}

			<h1>{latitude}</h1>
			<h1>{longitude}</h1>
		</div>
	);
};

export default ShowSearchedWeather;
