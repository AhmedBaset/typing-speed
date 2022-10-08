import React, { memo, useContext, useRef } from "react";
import Character from "./Character";
import Finish from "./Finish";

import { ResultContext } from "./../App";

function Game() {
	const {
		isStart,
		setIsStart,
		isFinish,
		setIsFinish,
		setTime,
		txt,
		charCount,
		setCharCount,
		charCorrectCount,
		setCharCorrectCount,
		setWPM, 
		setAccuracy,
		WPM, 
		accuracy,
		history,
		setHistory
	} = useContext(ResultContext);
	const game = useRef();

	// Start Game
	function startGame() {
		setIsStart(true);
		// Reset All States
		setIsFinish(false);
		setCharCount(0);
		setCharCorrectCount(0);
		setTime(0);
		setWPM(0)
		setAccuracy(0)
	}

	// End Game
	function endGame() {
		// Reset All States
		setIsStart(false);
		setIsFinish(true);
	}

	function focusCurrent() {
		const active = document.querySelectorAll(".char")[charCount];
		active && active.focus();
	}

	// Render
	return (
		<>
			<section
				onClick={focusCurrent}
				style={{ position: "relative", overflow: "hidden" }}
			>
				{!isStart && (
					<div
						className="flex-center flex-grow-1 flex-column gap"
						style={{ height: `${isFinish ? "" : "50vh"}`, padding: "3rem" }}
					>
						<h2 className="fs-2">Let's take a quick game!</h2>
						<button
							className="btn-primary"
							onClick={startGame}
							autoFocus={true}
						>
							Play Now
						</button>
					</div>
				)}
				{isStart && (
					<div
						ref={game}
						className="overflow-hidden relative"
						style={{ height: "50vh" }}
						id="game"
					>
						{txt &&
							txt.map((c, i) => (
								<Character
									key={i}
									value={c}
									id={"id" + i}
									focus={i === 0 ? true : false}
									disabled={i !== charCount ? true : false}
									index={i}
									endGame={endGame}
								/>
							))}
					</div>
				)}
				<div
					style={{
						position: "absolute",
						bottom: 0,
						left: 0,
						right: 0,
						height: "5px",
					}}
				>
					{txt && (
						<div
							style={{
								height: "100%",
								backgroundColor: "var(--clr-primary)",
								width: `${(charCorrectCount / txt.length) * 100}%`,
							}}
						></div>
					)}
				</div>
			</section>
			{isStart && (
				<section>
					<button className="btn-warning" onClick={endGame}>
						Surrender
					</button>
				</section>
			)}
			{isFinish && <Finish />}
		</>
	);
}

export default memo(Game);
