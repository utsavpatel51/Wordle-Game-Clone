import { useState } from "react";

const useWordle = (solution, MAX_GUESS) => {
	const [currentTry, setCurrentTry] = useState(0);
	const [isCorrect, setIsCorrect] = useState(false);
	const [currentGuess, setCurrentGuess] = useState("");
	const [isGameOver, setIsGameOver] = useState(false);
	const [pastGuesses, setPastGuesses] = useState([...Array(MAX_GUESS)]); // history of guesses with characters information

	const restartGame = () => {
		setIsGameOver(false);
		setTimeout(() => {
			setIsCorrect(false);
			setCurrentTry(0);
			setCurrentGuess("");
			setPastGuesses([...Array(MAX_GUESS)]);
		}, 320);
	};
	const formatGuess = (guess) => {
		let solutionChars = [...solution];
		let guessChars = [...guess];

		let solutionCharFreq = {};
		solutionChars.map((char) => {
			solutionCharFreq[char]
				? solutionCharFreq[char]++
				: (solutionCharFreq[char] = 1);
		});

		// For Incorrect characters
		let formattedGuess = guessChars.map((char) => {
			return { key: char, status: "default" };
		});

		// Check for correct characters
		guessChars.map((char, index) => {
			if (char === solutionChars[index]) {
				formattedGuess[index].status = "success";
				solutionCharFreq[char]--;
			}
		});

		// Check for correct but not in the correct position characters
		guessChars.map((char, index) => {
			if (solutionCharFreq[char] > 0)
				formattedGuess[index].status = "warn";
			solutionCharFreq[char]--;
		});
		return formattedGuess;
	};

	const handleKeyUp = ({ key }) => {
		if (key === "Backspace") {
			if (currentGuess.length > 0) {
				setCurrentGuess(currentGuess.slice(0, -1));
			}
		} else if (key === "Enter") {
			if (currentTry > MAX_GUESS - 1) setIsGameOver(true);
			else if (
				currentTry <= MAX_GUESS - 1 &&
				currentGuess.length === solution.length
			) {
				if (currentGuess === solution) {
					setIsCorrect(true);
					setIsGameOver(true);
				}

				if (currentTry === MAX_GUESS - 1) {
					setIsGameOver(true);
				}
				setPastGuesses((prev) => {
					prev[currentTry] = formatGuess(currentGuess);
					return [...prev];
				});
				setCurrentTry((prev) => prev + 1);
				setCurrentGuess("");
			}
		} else if (/^[A-Za-z]$/.test(key)) {
			key = key.toUpperCase();
			if (currentGuess.length < solution.length) {
				setCurrentGuess((prev) => prev + key);
			}
		}
	};

	return {
		currentTry,
		currentGuess,
		pastGuesses,
		isCorrect,
		isGameOver,
		handleKeyUp,
		restartGame,
	};
};

export default useWordle;
