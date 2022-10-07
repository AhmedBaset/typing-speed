import React, { useContext } from "react";

import { ResultContext } from "./../App";
import Graph from "./Graph";
import LiveResults from "./LiveResults";

function Finish() {
	const { charCount } = useContext(ResultContext);

	const data = [
		{ date: "25/12/2022", WPM: 45, accuracy: 97 },
		{ date: "26/12/2022", WPM: 47, accuracy: 96 },
		{ date: "27/12/2022", WPM: 40, accuracy: 99 },
		{ date: "28/12/2022", WPM: 52, accuracy: 94 },
		{ date: "25/12/2022", WPM: 45, accuracy: 97 },
		{ date: "26/12/2022", WPM: 47, accuracy: 96 },
		{ date: "27/12/2022", WPM: 40, accuracy: 99 },
		{ date: "28/12/2022", WPM: 52, accuracy: 94 },
		{ date: "25/12/2022", WPM: 45, accuracy: 97 },
		{ date: "26/12/2022", WPM: 47, accuracy: 96 },
		{ date: "27/12/2022", WPM: 40, accuracy: 99 },
		{ date: "28/12/2022", WPM: 52, accuracy: 94 },
		{ date: "25/12/2022", WPM: 45, accuracy: 97 },
		{ date: "26/12/2022", WPM: 47, accuracy: 96 },
		{ date: "27/12/2022", WPM: 40, accuracy: 99 },
		{ date: "28/12/2022", WPM: 52, accuracy: 94 },
		{ date: "25/12/2022", WPM: 45, accuracy: 97 },
		{ date: "26/12/2022", WPM: 47, accuracy: 96 },
		{ date: "27/12/2022", WPM: 40, accuracy: 99 },
		{ date: "28/12/2022", WPM: 52, accuracy: 94 },
		{ date: "25/12/2022", WPM: 45, accuracy: 97 },
		{ date: "26/12/2022", WPM: 47, accuracy: 96 },
		{ date: "27/12/2022", WPM: 40, accuracy: 99 },
	];

	return (
		<section className="p-x-1 p-y-3 m-b-1 rounded-1 flex-center flex-column gap-05">
			<h2 className="clr-primary">Congrats, Typing Test Completed!</h2>
			<p className="fs-150">
				You typed {Math.round(charCount / 5)}{" "}
				{charCount < 8 ? "word" : "words"}
			</p>
			<h3 className="fw-600">You achieved:</h3>
			<div className="w-100">
				<LiveResults />
			</div>
			<div
				className="w-100 gap"
				style={{
					display: "grid",
					gridTemplateColumns:
						"repeat(auto-fill, minmax(min(100%, 350px), 1fr))",
				}}
			>
				<>
					<Graph
						data={data}
						x="date"
						y="accuracy"
						name="Accuracy"
						barsColor="var(--clr-primary)"
						barsFill="var(--clr-white)"
					/>
				</>
				<>
					<Graph
						data={data}
						x="date"
						y="WPM"
						name="WPM"
						barsColor="var(--clr-primary)"
						barsFill="var(--clr-white)"
					/>
				</>
			</div>
			<div className="p-1 flex-center">
				<button className="btn-primary">Print The Result</button>
			</div>
		</section>
	);
}

export default Finish;
