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
}