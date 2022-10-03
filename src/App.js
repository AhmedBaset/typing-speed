import React from "react";
import Game from "./components/Game";
import LiveResults from "./components/LiveResults";
import NavBar from "./components/NavBar";

document.body.style.setProperty("--clr-primary", "hsl(185, 100%, 45%)")
document.body.style.setProperty("--clr-primary-light", "hsl(185, 100%, 85%)")
document.body.style.setProperty("--clr-primary-dark", "hsl(185, 100%, 20%)")
document.body.style.setProperty("--clr-bg", "#f2f2f2")

function App() {
	return (
		<>
			<NavBar />
			<div className="container">
				<LiveResults />
				<Game />
			</div>
		</>
	);
}

export default App;
