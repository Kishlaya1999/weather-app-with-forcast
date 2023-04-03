/** @format */

import "./App.css";
import bg_img from "./assets/images/weather_bg.jpg";
import Search from "./components/Search/Search";
import Footer from "./components/Footer/Footer";

function App() {
	return (
		<div className="App">
			<img src={bg_img} alt="background image" className="backgound_image" />
			<Search />
			<Footer />
		</div>
	);
}

export default App;
