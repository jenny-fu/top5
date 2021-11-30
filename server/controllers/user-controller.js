const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

getLoggedIn = async (req, res) => {
    auth.verify(req, res, async function () {
        const loggedInUser = await User.findOne({ _id: req.userId });
        return res.status(200).json({
            loggedIn: true,
            user: {
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                email: loggedInUser.email
            }
        }).send();
    })
}

registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, passwordVerify } = req.body;
        if (!firstName || !lastName || !email || !password || !passwordVerify) {
            return res
                .status(200)
                .json({
                    success: false, errorMessage: "Please enter all required fields."
                })
        }
        if (password.length < 8) {
            return res
                .status(200)
                .json({
                    success: false,
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        if (password !== passwordVerify) {
            return res
                .status(200)
                .json({
                    success: false,
                    errorMessage: "Please enter the same password twice."
                })
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res
                .status(200)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, lastName, email, passwordHash
        });
        const savedUser = await newUser.save();

        // LOGIN THE USER
        const token = auth.signToken(savedUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(200)
                .json({
                    success: false, errorMessage: "Please enter all required fields."
                });
        }
        // LOGIN THE USER
        const savedUser = await User.findOne({ email: email });
        if (!savedUser) {
            return res
                .status(200)
                .json({
                    success: false, errorMessage: "Incorrect email/password has been entered."
                });
        }
        const valid = bcrypt.compare(password, savedUser.passwordHash);
        if (!valid) {
            return res
                .status(200)
                .json({
                    success: false, errorMessage: "Incorrect email/password has been entered."
                });
        } else {
            const token = auth.signToken(savedUser);
            // const refresh = auth.refreshToken(savedUser);
			// await res.cookie('refresh-token', refresh, { httpOnly: true , sameSite: 'None', secure: true});
            await res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            }).status(200).json({
                success: true,
                user: {
                    firstName: savedUser.firstName,
                    lastName: savedUser.lastName,
                    email: savedUser.email
                }
            }).send();
        }
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {
    getLoggedIn,
    loginUser,
    registerUser
}