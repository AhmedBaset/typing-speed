import React, { useState, useEffect } from "react";

function Graph({
	data,
	x,
	y,
	name = " ",
	barsColor = "skyblue",
	barsFill = "black",
}) {
	const [DATA] = useState(data.slice(-14));
	const [xValues, setXValues] = useState();
	const [yValues, setYValues] = useState();
	const [MIN, setMIN] = useState(0);
	const [MAX, setMAX] = useState(0);

	useEffect(() => {
		if (DATA) {
			setXValues([...DATA.map((item) => item[x])]);
			setYValues([...DATA.map((item) => item[y])]);
		}
	}, [DATA]);

	useEffect(() => {
		if (yValues) {
			setMIN(Math.min(...yValues) - 2);
			setMAX(Math.max(...yValues) - 2);
		}
	}, [yValues]);

	const [yDefaultValues, setYDefaultValues] = useState([]);

	const INCREASE_BY = Math.round((MAX - MIN) / 10);

	useEffect(() => {
		for (let i = MIN; i <= MAX; i += INCREASE_BY) {
			setYDefaultValues((prev) => [...new Set([...prev, i])]);
		}
	}, [MIN, MAX]);

	if (!data) return;

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
									rotate: "-45deg",
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
