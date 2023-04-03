/** @format */

import React, { useEffect, useState } from "react";
import "./ShowSearchedWeather.css";
import { API_KEY } from "../../utils/constants";

const ShowSearchedWeather = ({ latitude, longitude }) => {
	// const [isCelsius, setIsCelcius] = useState("metric");
	// const [forcast, setForcast] = useState({});

	// useEffect(() => {
	// 	fetchForcast();
	// 	console.log(forcast, 1);
	// }, []);

	// useEffect(() => {
	// 	fetchForcast();
	// 	// console.log(forcast, 1);
	// }, [latitude, longitude]);

	// const fetchForcast = () => {
	// 	fetch(
	// 		`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${isCelsius}`
	// 	)
	// 		.then((response) => response.json())
	// 		.then((data) => setForcast(data));
	// };

	return (
		<div className="weather">
			{/* {forcast && (
				<div className="weather__forcast">
					<img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
				</div>
			)} */}
			<h1>{latitude}</h1>
			<h1>{longitude}</h1>
		</div>
	);
};

export default ShowSearchedWeather;
