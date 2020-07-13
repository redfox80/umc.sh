//Middleware function to redirect umc.sh short links
function mw(sc) {

	return (req, res, next) => {

		let uris = req.path.split('/').splice(1);
	
		if(uris[0] === 'redirect' && uris[1] !== undefined) {
	
			const { link } = sc.models;

			link.findOne({
				where: {
					short: uris[1]
				}
			})
				.then(r => {
					if(r === null) {
						next();
						return;
					} else {
						res.redirect(301, r.link);
					}
				})
				.catch(err => {
					console.log(err);
					next();
				});
		}
		else {
			next();
		}
	
	};
}

module.exports = function(app) {
	const sc = app.get('sequelizeClient');
	
	app.use(mw(sc));
};
