/** @format */

import React, { useEffect, useRef, useState } from "react";
import "./Search.css";
import ShowSearchedWeather from "../ShowSearchedWeather/ShowSearchedWeather";
import { API_KEY } from "../../utils/constants";

const Search = () => {
	const [searchedData, setSearchedData] = useState([]);
	const [searchedCity, setSearchedCity] = useState("");
	const [latitude, setLatitude] = useState();
	const [longitude, setLongitude] = useState();

	// const inputBar = useRef();

	useEffect(() => {
		getLocation();
	}, []);

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			console.log("Location Access denied");
		}
	}

	function showPosition(position) {
		setLatitude(position.coords.latitude.toFixed(2));
		setLongitude(position.coords.longitude.toFixed(2));
		// console.log({ lat: position.coords.latitude, lon: position.coords.longitude });
	}
	useEffect(() => {
		// Featching searched city
		const timer = setTimeout(() => {
			fetch(
				`https://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&limit=5&appid=${API_KEY}`
			)
				.then((response) => response.json())
				.then((data) => setSearchedData(data));
		}, 50);
		// cleanup funciton
		return () => {
			clearTimeout(timer);
		};
	}, [searchedCity]);

	console.log(searchedData);

	const setLongituedeAndLatitude = (lat, lon) => {
		setLatitude(lat);
		setLongitude(lon);
		setSearchedData([]);
		// inputBar.current.value = "";
	};

	return (
		<div className="weather_search">
			<div className="weather__search_bar_container">
				<input
					onChange={(e) => setSearchedCity(e.target.value)}
					type="text"
					className="weather__search_bar"
					placeholder="Search the city name......"
					// ref={inputBar}
				/>
				<i className="fa-solid fa-magnifying-glass"></i>
			</div>

			<div className="weather__search_results">
				<ul>
					{searchedData.length &&
						searchedData.map((city) => (
							<li onClick={() => setLongituedeAndLatitude(city.lat, city.lon)}>
								<div className="weather__search_item">
									<div className="weather__search_item_name_info">
										<div className="weather__search_item_name">
											{city?.name}
										</div>
										<div className="weather__search_item_local_name">
											{city?.local_names?.hi
												? `(${city?.local_names?.hi})`
												: ""}
											,
										</div>
										<div className="weather__search_item_state">
											{city?.state ? `${city?.state},` : ""}
										</div>
										<div className="weather__search_item_country">
											{city?.country}
										</div>
									</div>
									<div className="weather__search_item_lat_lon">
										<div className="weather__search_item_lat">
											Lat: {city.lat.toFixed(3)}
										</div>
										<div className="weather__search_item_lon">
											Lon: {city.lon.toFixed(3)}
										</div>
									</div>
								</div>
							</li>
						))}
				</ul>
			</div>
			<ShowSearchedWeather latitude={latitude} longitude={longitude} />
		</div>
	);
};

export default Search;
