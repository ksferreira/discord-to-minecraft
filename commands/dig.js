module.exports = {
	name: 'dig',
	desc: 'Dig either front (default), down, or up.',
	execute(args, ws) {
		const direction = args.shift();

		console.log(`ARGS BEFORE DIRECTION: ${args}`);
		console.log(`DIRECTION: ${direction}`);

		if (direction.length === 0) return;

		ws.send(direction);
		console.log('direction sent')
	}
};