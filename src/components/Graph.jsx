import React, { useState, useEffect, useContext } from "react";

import { ResultContext } from "./../App";

function Graph({
	data,
	x,
	y,
	name = " ",
	barsColor = "skyblue",
	barsFill = "black",
}) {
	const { WPM, accuracy, history } = useContext(ResultContext);
	const [DATA, setData] = useState(data.slice(-14));

	useEffect(() => {
		if (DATA.length !== history.slice(-15).length) {
			setData((prev) => [
				...prev,
				{ date: new Date().toLocaleString(), WPM: WPM, accuracy: accuracy },
			]);
		}
	}, [history]);

	const [xValues, setXValues] = useState();
	const [yValues, setYValues] = useState();
	const [MIN, setMIN] = useState(0);
	const [MAX, setMAX] = useState(0);

	useEffect(() => {
		setXValues([...DATA.map((item) => item[x])]);
		setYValues([...DATA.map((item) => item[y])]);
	}, [DATA]);

	useEffect(() => {
		if (yValues) {
			setMIN(Math.min(...yValues) - 2);
			setMAX(Math.max(...yValues) + 2);
		}
	}, [yValues]);

	const [yDefaultValues, setYDefaultValues] = useState([]);

	const INCREASE_BY = Math.round((MAX - MIN) / 10) || 1;

	// MAX - MIN >= 90
	// 	? 10
	// 	: MAX - MIN >= 80
	// 	? 7
	// 	: MAX - MIN >= 75
	// 	? 6
	// 	: MAX - MIN >= 60
	// 	? 5
	// 	: MAX - MIN >= 45
	// 	? 4
	// 	: MAX - MIN >= 30
	// 	? 3
	// 	: MAX - MIN >= 15
	// 	? 2
	// 	: 1;

	useEffect(() => {
		const set = new Set();
		set.add(MIN);
		for (let i = MIN; i <= MAX; i += INCREASE_BY) {
			set.add(i);
		}
		setYDefaultValues([...set]);
	}, [MIN, MAX]);

	if (!DATA) return;
	if (DATA.length < 2) {
		return (
			<div
				style={{
					backgroundBlendMode: "difference",
					width: "100%",
					height: "100%",
					overflow: "auto",
					padding: "1rem",
					display: "grid",
					gridTemplateColumns: "auto 1fr",
					gridTemplateRows: "1fr auto",
				}}
			>
				<div style={{ gridArea: "1 / 1 / 2 / 2" }}></div>
				<div style={{ gridArea: "1 / 2 / 2 / 3", position: "relative" }}>
					<h2
						style={{
							position: "absolute",
							top: "10%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							opacity: 0.5,
							fontSize: "4rem",
							textOverflow: "wrap",
							isolation: "isolate",
							zIndex: 1,
						}}
					>
						{name.toUpperCase()}
					</h2>
					<h3 style={{ fontSize: "1.5rem", textAlign: "center" }}>
						Play again to compare results (;
					</h3>
				</div>
				<div
					style={{
						gridArea: "2 / 1 / 3 / 2",
						display: "flex",
						justifyContent: "center",
						alignItems: "flex-start",
					}}
				></div>
				<div style={{ gridArea: "2 / 2 / 3 / 3" }}></div>
			</div>
		);
	}

	return (
		<div
			style={{
				backgroundBlendMode: "difference",
				width: "100%",
				height: "100%",
				overflow: "auto",
				padding: "1rem",
				display: "grid",
				gridTemplateColumns: "auto 1fr",
				gridTemplateRows: "1fr auto",
			}}
		>
			{/* Y Axis */}
			<div style={{ gridArea: "1 / 1 / 2 / 2" }}>
				<ul
					style={{
						display: "flex",
						height: "100%",
						flexDirection: "column-reverse",
						justifyContent: "space-evenly",
						alignItems: "center",
						padding: ".25rem",
						listStyle: "none",
					}}
				>
					{yDefaultValues &&
						yDefaultValues.map((item, i) => (
							<li key={i} style={{ fontSize: ".75rem" }}>
								{item}
							</li>
						))}
				</ul>
			</div>
			{/* Main Bars */}
			<div style={{ gridArea: "1 / 2 / 2 / 3", position: "relative" }}>
				<h2
					style={{
						position: "absolute",
						top: "10%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						opacity: 0.5,
						fontSize: "4rem",
						textOverflow: "wrap",
						isolation: "isolate",
						zIndex: 1,
					}}
				>
					{name.toUpperCase()}
				</h2>
				<ul
					style={{
						zIndex: 2,
						display: "flex",
						height: "100%",
						width: "100%",
						justifyContent: "space-evenly",
						alignItems: "flex-end",
						padding: ".25rem",
						listStyle: "none",
						borderBottom: "1px dashed",
						borderInlineStart: "1px dashed",
					}}
				>
					{yValues &&
						yValues.map((item, i) => (
							<li
								key={i}
								style={{
									fontSize: ".75rem",
									padding: ".125rem",
									height: `${((item - MIN) / (MAX - MIN)) * 100}%`,
									backgroundColor: barsColor,
									color: barsFill,
									zIndex: 3,
									borderTopLeftRadius: "0.5vmin",
									borderTopRightRadius: "0.5vmin",
									animation:
										"0.75s ease 0s 1 normal none running tall",
								}}
							>
								{item}
							</li>
						))}
				</ul>
			</div>
			{/* Name */}
			<div
				style={{
					gridArea: "2 / 1 / 3 / 2",
					display: "flex",
					justifyContent: "center",
					alignItems: "flex-start",
				}}
			>
				<span
					style={{
						transform: "rotate(-45deg)",
						padding: ".25rem",
					}}
				>
					{name}
				</span>
			</div>
			{/* X Axis */}
			<div style={{ gridArea: "2 / 2 / 3 / 3" }}>
				<ul
					style={{
						display: "flex",
						justifyContent: "space-evenly",
						padding: ".25rem",
						listStyle: "none",
					}}
				>
					{xValues &&
						xValues.map((item, i) => (
							<li
								key={i}
								style={{
									writingMode: "vertical-lr",
									padding: ".125rem",
									fontSize: ".75rem",
									transform: "rotate(-45deg)",
									transformOrigin: "top",
								}}
							>
								{item}
							</li>
						))}
				</ul>
			</div>
		</div>
	);
}

export default Graph;
