window.onload = () => {
	// document.querySelectorAll('.input_number').forEach(elm => {
	// 	elm.addEventListener('keyup', function(e) {
	// 		if(/[1-9]/.test(e.key)) {
	// 			elm.value = e.key;
	// 		} else {
	// 			elm.value = '';
	// 		}
	// 	});
	// });

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

	const putValueOptions = (sudoku) => {
		const newSudoku = [...sudoku];
		const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		const regions = ['line', 'column', 'square'];
		regions.forEach(region => {
			values.forEach(value => {
				const especificRegion = newSudoku.filter(cellValue => cellValue[region] == value);
				const numbersAtRegion = especificRegion.map(cell => cell.value)
					.filter(number => number)
					.map(number => parseInt(number));
				const regionOptins = values.filter(numberValue => numbersAtRegion.indexOf(numberValue) === -1);
				especificRegion.forEach(cell => {
					cell.valueOptions[region] = regionOptins;
				});
			});
		});
		return newSudoku;
	};

	const defineValues = (sudoku) => {
		const newSudoku = [];
		const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		sudoku.filter(cell => !cell.value).forEach(cell => {
			const possibleNumbers = values.filter(number => 
				cell.valueOptions.line.indexOf(number) > -1 &&
				cell.valueOptions.column.indexOf(number) > -1 &&
				cell.valueOptions.square.indexOf(number) > -1
			);
			if(possibleNumbers.length === 1) {
				cell.value = possibleNumbers[0];
			}
			newSudoku.push(cell);
		});
		return newSudoku;
	};

	const putValues = (sudoku) => {
		sudoku.forEach(cell => {
			document.getElementById(''+cell.square+cell.line+cell.column).value = cell.value;
		});
	};

	document.querySelector('#solve').addEventListener('click', () => {
		let sudoku = createSudoku();
		for(let i = 0; i < 1; i++) {
			sudoku = defineValues(putValueOptions(sudoku));
			console.log(sudoku);
			putValues(sudoku);
		}
	});
}