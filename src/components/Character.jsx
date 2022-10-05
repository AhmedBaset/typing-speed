import React, { useRef, useState, useEffect, useContext, memo } from "react";
import { ResultContext } from "./../App";

const styles = {
	fontFamily: `"Inconsolata", monospace`,
	width: "1.1ch",
};

function Character({ value, id, focus, disabled, index, endGame }) {
	const [char, setChar] = useState("");
	const thisLetter = useRef();
	const [isFocus, setIsFocus] = useState(focus);
	const [isDisabled] = useState(disabled);
	const { setCharCount, setCharCorrectCount, setCharWrongCount } =
		useContext(ResultContext);

	useEffect(() => {
		// If the character input validate
		if (char) {
			// thisLetter.current.classList.add(char === value ? "success" : "danger")
			setCharCount((v) => v + 1);
			if (char === value) {
				thisLetter.current.classList.add("success");
				setCharCorrectCount((v) => v + 1);
				setIsFocus(false);

				// Focus the next character
				if (thisLetter.current.nextElementSibling) {
					thisLetter.current.nextElementSibling.disabled = false;
					thisLetter.current.nextElementSibling.focus();
				} else {
					endGame();
				}
			} else {
				thisLetter.current.classList.add("danger");

				setChar("");
				setCharWrongCount((v) => v + 1);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [char]);

	function scrollToFocus() {
		let scrollValue =
			(thisLetter.current && thisLetter.current.offsetTop) - 50;
		window.game.scrollTo({
			top: Math.round(scrollValue),
			behavior: "smooth",
		});
	}
	
	return (
		<>
			<input
				ref={thisLetter}
				type="text"
				className="border-none p-0 m-0 fs-250 char rounded-05"
				style={styles}
				value={char}
				onChange={(e) => setChar((v) => e.target.value)}
				maxLength="1"
				placeholder={value}
				id={id}
				autoFocus={isFocus}
				disabled={isDisabled}
				onFocus={scrollToFocus}
			/>
		</>
	);
}

export default memo(Character);
