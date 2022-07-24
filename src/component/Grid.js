import BlockRow from "./BlockRow";

function Grid({ pastGuesses, isCorrect, currentGuess, currentTry }) {
	return (
		<section className="grid">
			{pastGuesses.map((guess, index) => {
				return currentTry === index ? (
					<BlockRow key={index} current_value={currentGuess} />
				) : (
					<BlockRow key={index} value={guess} />
				);
			})}
		</section>
	);
}

export default Grid;
