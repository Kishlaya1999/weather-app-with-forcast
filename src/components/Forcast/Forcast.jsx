/** @format */

import React from "react";
import "./Forcast.css";

const Forcast = ({ isCelsius, list }) => {
	console.log(list);
	return (
		<div className="forcast">
			{list.length &&
				list.map((singleDayForcast) => (
					<div className="forcast__single_day">
						<div className="forcast__icon">
							<img
								src={`https://openweathermap.org/img/wn/${singleDayForcast?.weather[0]?.icon}@2x.png`}
								alt=""
							/>
						</div>
						{isCelsius === "metric" ? (
							<div className="forcast__temp">
								{Math.ceil(singleDayForcast?.main?.temp)}°C
							</div>
						) : (
							<div className="forcast__temp">
								{Math.ceil(singleDayForcast?.main?.temp)}°F
							</div>
						)}
						{isCelsius === "metric" ? (
							<div className="forcast__min_max_temp">
								<div className="forcast__min_temp">
									Min. Temp:{" "}
									{Math.ceil(singleDayForcast?.main?.temp_min)}
									°C
								</div>
								<div className="forcast__max_temp">
									Max. Temp:{" "}
									{Math.ceil(singleDayForcast?.main?.temp_max)}
									°C
								</div>
							</div>
						) : (
							<div className="forcast__min_max_temp">
								<div className="forcast__min_temp">
									Min. Temp:{" "}
									{Math.ceil(singleDayForcast?.main?.temp_min)}
									°F
								</div>
								<div className="forcast__max_temp">
									Max. Temp:{" "}
									{Math.ceil(singleDayForcast?.main?.temp_max)}
									°F
								</div>
							</div>
						)}
					</div>
				))}
		</div>
	);
};

export default Forcast;
