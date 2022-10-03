import React, { useRef, useState } from "react";
// import "https://fonts.googleapis.com/css2?family=Inconsolata:wght@300;400;500&display=swap";

const styles = {
	fontFamily: `"Inconsolata", monospace`,
	width: "1.1ch",
};

function Character({ value = "-", id, focus, index }) {
	const [char, setChar] = useState("");
	const thisLetter = useRef();

	React.useEffect(() => {
		console.log(thisLetter.current.value);

		if (char) {
			// console.log(thisLetter.nextSibling)
			const next = document.querySelector(`.char:nth-child(${index + 1})`)
			next.focus()
		}
	}, [char]);

	return (
		<input
			ref={thisLetter}
			type="text"
			className="border-none p-0 m-0 fs-250 char"
			style={styles}
			value={char}
			onChange={(e) => setChar((v) => e.target.value)}
			maxLength="1"
			placeholder={value}
			id={id}
			autoFocus={focus}
		/>
	);
}

export default Character;
