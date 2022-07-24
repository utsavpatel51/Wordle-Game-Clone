import { useEffect } from "react";
import "./assets/scss/app.scss";
import BlockRow from "./component/BlockRow";
import Grid from "./component/Grid";
import Modal from "./component/Modal";
import useWordle from "./hooks/useWordle";
import wordData from "./data/db.json";

function App() {
	let solution = "PAIN";
	// useEffect(() => {
	// 	solution =
	// 		wordData.letters[
	// 			Math.floor(Math.random() * wordData.letters.length)
	// 		].toUpperCase();
	// 	console.log(solution);
	// }, []);
	const MAX_GUESS = 4;
	const {
		currentTry,
		currentGuess,
		pastGuesses,
		isCorrect,
		isGameOver,
		handleKeyUp,
		restartGame,
	} = useWordle(solution, MAX_GUESS);

	useEffect(() => {
		window.addEventListener("keyup", handleKeyUp);
		if (isCorrect || currentTry >= MAX_GUESS) {
			window.removeEventListener("keyup", handleKeyUp);
		}
		return () => window.removeEventListener("keyup", handleKeyUp);
	}, [handleKeyUp, currentTry, isCorrect]);

	return (
		<section>
			<Modal
				isGameOver={isGameOver}
				isCorrect={isCorrect}
				solution={solution}
				restartGame={restartGame}
			/>
			<div className={`homeApp ${isGameOver ? "blur" : ""}`}>
				{/* Header */}
				<header>
					<BlockRow fix_value="WORDGAME" />
				</header>
				{/* Main */}
				<section className="homeApp-body">
					<Grid
						pastGuesses={pastGuesses}
						isCorrect={isCorrect}
						currentGuess={currentGuess}
						currentTry={currentTry}
					/>
				</section>
				{/* Footer */}
				<footer>
					<h2>Wordle Game: Guess The Hidden Word</h2>
					<p>
						The rules are very simple: You need to guess the hidden
						word (4 letters) in 4 tries. To get started, just type
						any word on the first line. If the letter is guessed
						correctly and is in the correct place, it will be
						highlighted in green, if the letter is in the word, but
						in the wrong place - in yellow, and if the letter is not
						in the word, it will remain gray. Can you guess the
						hidden word in 4 tries?
					</p>
				</footer>
			</div>
		</section>
	);
}

export default App;
