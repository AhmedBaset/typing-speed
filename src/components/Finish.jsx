import React, { useContext } from "react";

import { ResultContext } from "./../App";
import Graph from "./Graph";
import LiveResults from "./LiveResults";

function Finish() {
	const { charCount, history } = useContext(ResultContext);

	const d = [
		{ date: "12/12/2020", WPM: 42, accuracy: 92 },
		{ date: "13/12/2020", WPM: 43, accuracy: 93 },
		{ date: "14/12/2020", WPM: 44, accuracy: 94 },
		{ date: "15/12/2020", WPM: 45, accuracy: 95 },
		{ date: "16/12/2020", WPM: 46, accuracy: 96 },
		{ date: "17/12/2020", WPM: 47, accuracy: 97 },
		{ date: "18/12/2020", WPM: 48, accuracy: 98 },
		{ date: "19/12/2020", WPM: 49, accuracy: 99 },
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
						"repeat(auto-fit, minmax(min(100%, 350px), 1fr))",
				}}
			>
				<>
					{d && (
						<Graph
							data={history}
							x="date"
							y="WPM"
							name="WPM"
							barsColor="var(--clr-primary)"
							barsFill="var(--clr-white)"
						/>
					)}
				</>
				<>
					{history && (
						<Graph
							data={history}
							x="date"
							y="accuracy"
							name="Accuracy"
							barsColor="var(--clr-primary)"
							barsFill="var(--clr-white)"
						/>
					)}
				</>
			</div>
			<div className="p-1 flex-center">
				<button className="btn-primary">Print The Result</button>
			</div>
		</section>
	);
}

export default Finish;
