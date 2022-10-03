import React, { useEffect, useRef, useState } from "react";
import Character from "./Character";
import texts from "./../texts";

function Game() {
	const [isStart, setIsStart] = useState(false);
	const [letters, setLetters] = useState();

	function startGame() {
		setIsStart(true);
	}
	// Script Text:
	const txt = texts[Math.floor(Math.random() * texts.length)].split("");

	// Focus the character:
	const gameRef = useRef();
	const game = gameRef.current;

	useEffect(() => {
		setLetters(document.getElementsByClassName("char"));
		// console.log(letters);

		// Add event to each character
		// if (typeof letters === "object") {
		//    console.log(typeof letters);
		//    // letters.map((l) => {
		// 	// 	l.addEventListener("change", (e) => {
		// 	// 		console.log(e);
		// 	// 	});
		// 	// });
		// }
	}, [isStart, game]);

	return (
		<div className="bg-white m-y-150 p-1 rounded">
			{!isStart && (
				<div className="flex-center">
					<button className="btn-primary" onClick={startGame}>
						Play Now
					</button>
				</div>
			)}
			{isStart && (
				<div ref={gameRef} id="game">
					{txt &&
						txt.map((c, i) => (
							<Character
								key={i}
								value={c}
								id={"id" + i}
								focus={i === 0 ? true : false}
								index={i}
							/>
						))}
				</div>
			)}
		</div>
	);
}

export default Game;
