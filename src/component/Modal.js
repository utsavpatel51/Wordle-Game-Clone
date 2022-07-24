import "../assets/scss/result-pop.scss";

function ResultPop({ isGameOver, isCorrect, solution, restartGame }) {
	return (
		<section className={`result-pop ${isGameOver ? "active" : ""}`}>
			<div className="result-pop__header">
				<h1>{isCorrect ? "You Win!😎" : "You Lost!😞"}</h1>
			</div>
			<div className="result-pop__body">
				<div className="result-pop__solution">
					<h2>
						The answer was:
						<br />
						<p>{solution}</p>
					</h2>
				</div>
				<button className="result-pop__restart" onClick={restartGame}>
					Restart
				</button>
			</div>
		</section>
	);
}

export default ResultPop;
