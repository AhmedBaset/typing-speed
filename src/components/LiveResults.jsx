import React, { useContext } from "react";
import { ResultContext } from "./../App";

function LiveResults() {
	const { time, charCount, WPM, accuracy } = useContext(ResultContext);

	// The time style
	let t =
		time < 60
			? `00:${time < 10 ? `0${time}` : time}`
			: `${
					Math.floor(time / 60) < 10
						? `0${Math.floor(time / 60)}`
						: Math.floor(time / 60)
			  }:${time % 60 < 10 ? `0${time % 60}` : time % 60}`;

	return (
		<section className="grid-6 gap">
			<div className="border-x-between text-center p-05 flex-center flex-column">
				<h3 className="fs-1 fw-500 m-0">Time</h3>
				<p className="clr-primary fs-3 fw-700 m-0 p-0">{t}</p>
			</div>
			<div className="border-x-between text-center p-05 flex-center flex-column">
				<h3 className="fs-1 fw-500 m-0">words count</h3>
				<p className="fw-500">
					<span className="clr-primary fs-3 fw-700 m-0 p-0">
						{WPM || 0}
					</span>{" "}
					WPM
				</p>
			</div>
			<div className="border-x-between text-center p-05 flex-center flex-column">
				<h3 className="fs-1 fw-500 m-0">Characters count</h3>
				<p className="fw-500">
					<span className="clr-primary fs-3 fw-700 m-0 p-0">
						{charCount}
					</span>{" "}
					Ch
				</p>
			</div>
			<div className="border-x-between text-center p-05 flex-center flex-column">
				<h3 className="fs-1 fw-500 m-0">Accuracy</h3>
				<p className="fw-500">
					<span className="clr-primary fs-3 fw-700 m-0 p-0">
						{accuracy || 0}
					</span>{" "}
					%
				</p>
			</div>
		</section>
	);
}

export default LiveResults;
