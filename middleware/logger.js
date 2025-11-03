export default function requestLogger(req, res, next) {
	const startTimeMs = Date.now();
	res.on("finish", () => {
		const durationMs = Date.now() - startTimeMs;
		console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${durationMs}ms`);
	});
	next();
}
