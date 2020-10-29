const bcrypt = require("bcryptjs")
const usersModel = require("./users-model")

function restrict() {
	// Create a middleware function that restricts routes to authorized users only.
	// It should get the username and password from the request headers.
	return async (req, res, next) => {
		try {
			if(!req.session || !req.session.user) {
				return res.status(401).json({
					message: "Invalid credentials",
			   })
			}


			/*const { username, password } = req.headers
			
			if (!username || !password) {
				return res.status(401).json({
					 message: "Invalid credentials",
				})
			}

			const user = await usersModel.findBy({username}).first()
			if(!user) {
				return res.status(401).json({
					message: "Invalid credentials",
				})
			}

			const passwordValid = await bcrypt.compare(password, usersModel.password)
			if(!passwordValid) {
				return res.status(401).json({
					message: "Invalid credentials",
				})		
			}*/

			next()

		} catch (err) {
			return res.status(500)
		}

	}
}

module.exports = {
	restrict,
}