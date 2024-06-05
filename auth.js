// Dependencies and Modules
const jwt = require("jsonwebtoken");


// Used in the algorithm for encrypting our data which makes it difficult to decode.
const secret = "EcommerceAPI";	


// Token Creation
module.exports.createAccessToken = (user) => {

	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}

	return jwt.sign(data, secret, {});
}

// Token verification

module.exports.verify = (req, res, next) => {

	console.log(req.headers.authorization);

	let token = req.headers.authorization;

	if(typeof token === "undefined"){

		return res.send({ auth: "Failed No Token" });

	} else {

		console.log(token);

		token = token.slice(7, token.length);
		console.log(token);

		jwt.verify(token, secret, function(err,decodedToken){


			if(err) {
				return res.send({
					auth: "Failed",
					message: err.message
				})

			} else {

				console.log(decodedToken) // Contains the data from our token

				req.user = decodedToken;

				next();
			}
		});
	}
}

// veritfyAdmin - verify if the logged in user is an Admin
module.exports.verifyAdmin = (req, res, next) => {

	if(req.user.isAdmin) {

		next();

	} else {

		return res.send({
			auth: "Failed",
			message: "Action Forbidden"
		})
	}
}
