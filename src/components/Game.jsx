import React, { memo, useContext, useRef } from "react";
import Character from "./Character";
import Finish from "./Finish"

import { ResultContext } from "./../App";

function Game() {
	const { isStart, setIsStart, isFinish, setIsFinish, setTime, txt, charCount, setCharCount } = useContext(ResultContext);
	const game = useRef();

	// Start Game
	function startGame() {
		setIsStart(true);
		// Reset All States
		setIsFinish(false)
		setCharCount(0);
		setTime(0);
	}

	// End Game
	function endGame() {
		// Reset All States
		setIsStart(false);
		setIsFinish(true)
	}

	function focusCurrent() {
		const active = document.querySelectorAll(".char")[charCount];
		active && active.focus();
	}

	// Render
	return (
		<>
			<section onClick={focusCurrent} className="bg-white p-1 m-y-1 rounded">
				{!isStart && (
					<div className="flex-center flex-grow-1">
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
			</section>
			{isStart && (
				<section className="m-b-1 bg-white p-1 rounded-1">
					<button className="btn-warning" onClick={endGame}>
						Surrender
					</button>
				</section>
			)}
			{	isFinish && (
				<Finish />
			)}
		</>
	);
}

export default memo(Game);
