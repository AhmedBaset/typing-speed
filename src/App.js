import React, { createContext, useState, useEffect } from "react";
import Game from "./components/Game";
import LiveResults from "./components/LiveResults";
import NavBar from "./components/NavBar";
import "./styles/stylish/stylish";
import texts from "./texts";

document.body.style.setProperty("--clr-primary", "hsl(185, 100%, 40%)");
document.body.style.setProperty("--clr-primary-light", "hsl(185, 100%, 85%)");
document.body.style.setProperty("--clr-primary-dark", "hsl(185, 100%, 20%)");
document.body.style.setProperty("--font-family", `'Noto Sans JP', sans-serif`);

export const ResultContext = createContext();

function App() {
	const [isStart, setIsStart] = useState(false);
	const [isFinish, setIsFinish] = useState(false);
	const [charCount, setCharCount] = useState(0);
	const [charWrongCount, setCharWrongCount] = useState(0);
	const [charCorrectCount, setCharCorrectCount] = useState(0);
	const [time, setTime] = useState(0);
	const [txt, setTxt] = useState();
	const [dark, setDark] = useState(false);

	if (!dark) {
		document.body.style.setProperty("--clr-bg", "#f2f2f2");
		document.body.style.setProperty("--clr-white", "#fff");
		document.body.style.setProperty("--clr-black", "#000");
		document.body.style.setProperty("--box-shadow", "#0004");
		document.querySelector(`meta[name="color-scheme"]`).content = "light";
	} else {
		document.body.style.setProperty("--clr-bg", "#111");
		document.body.style.setProperty("--clr-white", "#444");
		document.body.style.setProperty("--clr-black", "#ffffff");
		document.body.style.setProperty("--box-shadow", "#fff4");
		document.querySelector(`meta[name="color-scheme"]`).content = "dark";
	}

	// Script Text:
	useEffect(() => {
		setTxt(texts[Math.floor(Math.random() * texts.length)].split(""));
	}, [isStart]);

	useEffect(() => {
		let interval;
		if (isStart) {
			interval = setInterval(() => {
				setTime((prev) => prev + 1);
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [isStart]);

	return (
		<ResultContext.Provider
			value={{
				isStart,
				setIsStart,
				isFinish,
				setIsFinish,
				time,
				setTime,
				txt,
				charCount,
				setCharCount,
				charWrongCount,
				setCharWrongCount,
				charCorrectCount,
				setCharCorrectCount,
				dark,
				setDark
			}}
		>
			<div className="flex-column" style={{ minHeight: window.innerHeight }}>
				<NavBar />
				<div className="container flex-grow-1">
					{!isFinish && <LiveResults />}
					<Game />
				</div>
			</div>
		</ResultContext.Provider>
	);
}

export default App;
