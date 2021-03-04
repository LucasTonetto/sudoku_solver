window.onload = () => {
	document.querySelectorAll('.input_number').forEach(elm => {
		elm.addEventListener('keyup', function(e) {
			if(/[1-9]/.test(e.key)) {
				elm.value = e.key;
			} else {
				elm.value = '';
			}
		});
	});

	const createSudoku = () => {
		const sudoku = [];
		document.querySelectorAll('.input_number').forEach(elm => {
			const [square, line, column] = elm.id.split('');
			sudoku.push({
				line,
				column,
				square,
				value: elm.value,
				valueOptions: {
					line: [],
					column: [],
					square: []
				}
			});
		});
		return sudoku;
	};

	const putLineValueOptions = (sudoku) => {
		const newSudoku = [];
		const values = lines =  [1, 2, 3, 4, 5, 6, 7, 8, 9];
		lines.forEach(lineNumber => {
			const line = sudoku.filter(lineValue => lineValue.line == lineNumber);
			const numbersAtLine = line.map(cell => cell.value).filter(number => number).map(number => parseInt(number));
			const lineOptions = values.filter(value => numbersAtLine.indexOf(value) === -1);
			line.forEach(cell => {
				cell.valueOptions.line = lineOptions;
				newSudoku.push(cell);
			})
		});
		return newSudoku;
	};

	document.querySelector('#solve').addEventListener('click', () => {
		const sudoku = createSudoku();
		putLineValueOptions(sudoku);
		
	});
}