import React, { createContext, useState, useEffect } from "react";
import Game from "./components/Game";
import LiveResults from "./components/LiveResults";
import NavBar from "./components/NavBar";
import "./styles/stylish/stylish";
import texts from "./texts";

// CSS colors
document.body.style.setProperty("--clr-primary", "hsl(185, 100%, 40%)");
document.body.style.setProperty("--clr-primary-light", "hsl(185, 100%, 85%)");
document.body.style.setProperty("--clr-primary-dark", "hsl(185, 100%, 20%)");
document.body.style.setProperty("--font-family", `'Noto Sans JP', sans-serif`);

// Export the Context
export const ResultContext = createContext();

function App() {
	// Set All States
	const [txt, setTxt] = useState();
	const [isStart, setIsStart] = useState(false);
	const [isFinish, setIsFinish] = useState(false);
	const [time, setTime] = useState(0);
	const [charCount, setCharCount] = useState(0);
	const [charWrongCount, setCharWrongCount] = useState(0);
	const [charCorrectCount, setCharCorrectCount] = useState(0);
	const [WPM, setWPM] = useState(0);
	const [accuracy, setAccuracy] = useState(0);
	const [dark, setDark] = useState(
		localStorage.getItem("darkTheme") === "dark" || false
	);
	const [history, setHistory] = useState([]);
	const [historyStorage, setHistoryStorage] = useState(
		localStorage.getItem("history") || '[]'
	);

	useEffect(() => {
		if (history !== JSON.parse(historyStorage)) {
			setHistory(JSON.parse(historyStorage));
		}
	}, []);

	// useEffect(()=> {
	// 	console.log("History \n", history);
	// 	console.log("History Storage \n", historyStorage);
	// }, [history, historyStorage])

	// Save the result to localStorage
	useEffect(() => {
		if (isFinish) {
			setHistory((previous) => {
				return [
					...previous,
					{
						date: new Date().toLocaleString(),
						WPM: WPM,
						accuracy: accuracy,
					},
				];
			});
		}
	}, [isFinish]);

	useEffect(() => {
		if (historyStorage !== JSON.stringify(history) && history) {
			setHistoryStorage(JSON.stringify(history));
		}
	}, [history]);

	useEffect(() => {
		localStorage.setItem("history", historyStorage);
	}, [historyStorage])

	// set Word Per Minutes
	useEffect(() => {
		setWPM((v) => Math.round((60 / time) * (charCorrectCount / 5)));
		setAccuracy((v) => Math.round((charCorrectCount / charCount) * 100));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [charCorrectCount]);

	// Toggle style Light & Dark theme
	if (!dark) {
		document.body.style.setProperty("--clr-bg", "#f2f2f2");
		document.body.style.setProperty("--clr-white", "#fff");
		document.body.style.setProperty("--clr-black", "#000");
		document.body.style.setProperty("--box-shadow", "#0004");
		document.querySelector(`meta[name="color-scheme"]`).content = "light";
	} else {
		document.body.style.setProperty("--clr-bg", "#111");
		document.body.style.setProperty("--clr-white", "#4a4a4a");
		document.body.style.setProperty("--clr-black", "#ffffff");
		document.body.style.setProperty("--box-shadow", "#fff4");
		document.querySelector(`meta[name="color-scheme"]`).content = "dark";
	}

	// To make screen red when type wrong
	document.body.style.backgroundColor = "hsla(4, 88%, 90%, 0.5)";

	useEffect(() => {
		localStorage.setItem("darkTheme", dark ? "dark" : "light");
	}, [dark]);

	// Script Text:
	useEffect(() => {
		if (isStart) {
			setTxt(texts[Math.floor(Math.random() * texts.length)].split(""));
			// For Testing =>
			// setTxt("I am ahmed abdelbaset, I am from Egypt".split(""));
		}
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
				WPM,
				accuracy,
				setWPM,
				setAccuracy,
				history,
				setHistory,
				dark,
				setDark,
			}}
		>
			<div className="flex-column" style={{ minHeight: window.innerHeight }}>
				<NavBar />
				<div className="container flex-grow-1">
					{
						<div
							style={{
								position: "fixed",
								width: "100%",
								height: "100%",
								top: 0,
								left: 0,
								backgroundColor: "var(--clr-bg)",
								isolation: "isolate",
								zIndex: "-1",
								opacity: `${
									((charCorrectCount / charCount) * 100) / 100
								}`,
							}}
						></div>
					}
					{!isFinish && <LiveResults />}
					<Game />
				</div>
			</div>
		</ResultContext.Provider>
	);
}

export default App;
