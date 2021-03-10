window.onload = () => {
	document.querySelectorAll('.input_number').forEach(elm => {
		elm.addEventListener('keyup', function(e) {
			if(/^[a-zA-ZçÇ]$/.test(e.key)) {
				elm.value = '';
			} else if(/^[0-9]$/.test(e.key)) {
				elm.value = e.key;
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
				},
				availabeValues: []
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

	const defineAvailableValues = (sudoku) => {
		const newSudoku = [...sudoku];
		const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		return newSudoku.map(cell => {
			if(!cell.value) {
				const possibleNumbers = values.filter(number => 
					cell.valueOptions.line.indexOf(number) > -1 &&
					cell.valueOptions.column.indexOf(number) > -1 &&
					cell.valueOptions.square.indexOf(number) > -1
				);
				cell.availabeValues = possibleNumbers;
			}
			return cell;
		});
	};

	const defineValues = (sudoku) => {
		const newSudoku = [...sudoku];
		const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		return newSudoku.map(cell => {
			if(!cell.value) {
				const lineCells = newSudoku.filter(lineCell => lineCell.line === cell.line);
				const columnCells = newSudoku.filter(columnCell => columnCell.column === cell.column);
				const squareCells = newSudoku.filter(squareCell => squareCell.square === cell.square);
				const availableLineValues = cell.availabeValues.filter(availabeValue =>
					lineCells.filter(lineCell => lineCell.availabeValues.indexOf(availabeValue) === -1).length > 0
				);
				const availableColumnValues = cell.availabeValues.filter(availabeValue => 
					columnCells.filter(columnCell => columnCell.availabeValues.indexOf(availabeValue) === -1).length > 0
				);
				const availableSquareValues = cell.availabeValues.filter(availabeValue => 
					squareCells.filter(squareCell => squareCell.availabeValues.indexOf(availabeValue) === -1).length > 0
				);
				const definitiveValue = values.filter(number => 
					availableLineValues.indexOf(number) > -1 &&
					availableColumnValues.indexOf(number) > -1 &&
					availableSquareValues.indexOf(number) > -1
				);
				if(definitiveValue.length === 1) {
					cell.value = definitiveValue[0];
				}
			}
			return cell;
		});
	};

	const writeValues = (sudoku) => {
		sudoku.forEach(cell => {
			document.getElementById(''+cell.square+cell.line+cell.column).value = cell.value;
		});
	};

	document.querySelector('#solve').addEventListener('click', () => {
		let sudoku = createSudoku();
		for(let i = 0; i < 100; i++) {
			sudoku = defineValues(defineAvailableValues(putValueOptions(sudoku)));
			writeValues(sudoku);
		}
	});
}