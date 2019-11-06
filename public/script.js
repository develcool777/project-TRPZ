window.addEventListener('load', () => {
	// modal1
	 [
	   ...document
	     .querySelectorAll('.menu__log')
	 ].map(button =>
		button.addEventListener(
			'click', event => {
				event.preventDefault();
				document
					.querySelector('.modal1')
					.classList.toggle('modal1_hidden');
			}
		)
	);
	document
		.querySelector('.modal1')
		.addEventListener(
			'click', event => {
				event.preventDefault();
				if (!event.target.classList.contains('modal1')) return;
				document
					.querySelector('.modal1')
					.classList.toggle('modal1_hidden', true);
			}
		);

	// modal2
  [
    ...document
      .querySelectorAll('.menu__signup')
  ].map(button =>
		button.addEventListener(
			'click', event => {
				event.preventDefault();
				document
					.querySelector('.modal2')
					.classList.toggle('modal2_hidden');
			}
		)
	);
	document
		.querySelector('.modal2')
		.addEventListener(
			'click', event => {
				event.preventDefault();
				if (!event.target.classList.contains('modal2')) return;
				document
					.querySelector('.modal2')
					.classList.toggle('modal2_hidden', true);
			}
		);
	// modal3
  [
    ...document
      .querySelectorAll('.menu__call')
  ].map(button =>
		button.addEventListener(
			'click', event => {
				event.preventDefault();
				document
					.querySelector('.modal3')
					.classList.toggle('modal3_hidden');
			}
		)
	);
	document
		.querySelector('.modal3')
		.addEventListener(
			'click', event => {
				event.preventDefault();
				if (!event.target.classList.contains('modal3')) return;
				document
					.querySelector('.modal3')
					.classList.toggle('modal3_hidden', true);
			}
		);
	// modalAccount
  [
    ...document
      .querySelectorAll('.menu__acc')
  ].map(button =>
		button.addEventListener(
			'click', event => {
				event.preventDefault();
				document
					.querySelector('.modal4')
					.classList.toggle('modal4_hidden');
			}
		)
	);
	document
		.querySelector('.modal4')
		.addEventListener(
			'click', event => {
				event.preventDefault();
				if (!event.target.classList.contains('modal4')) return;
				document
					.querySelector('.modal4')
					.classList.toggle('modal4_hidden', true);
			}
		);
	// arrive-1 / out-1
	const arrive_out_1 = (id, property) => (event) => {
		const {
			target: {
				value
			}
		} = event;
		console.log(id, property, value);
		document.getElementById(id)[property] = value;
	};
	document.getElementById('arrive-1')
		.addEventListener('change', arrive_out_1('out-1', 'min'));
	document.getElementById('out-1')
		.addEventListener('change', arrive_out_1('arrive-1', 'max'));

});