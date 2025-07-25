import Link from "next/link";

export default function Header() {
	return (
		<header
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				padding: "1rem",
				background: "#1a1a1a",
				color: "white",
			}}
		>
			<Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
				<h1
					style={{
						fontSize: "1.5rem",
						fontWeight: "bold",
						margin: 0,
						fontFamily: "Times New Roman, serif",
					}}
				>
					ボートーク(仮):Votalk
					<span
						style={{
							fontSize: "0.8rem",
							fontWeight: "normal",
							marginLeft: "0.5rem",
							color: "#ccc",
						}}
					>
						- vote + talk -
					</span>
				</h1>
			</Link>
		</header>
	);
}