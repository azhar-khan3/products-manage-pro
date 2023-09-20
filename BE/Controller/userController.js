const { User } = require("../Model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async ( req, res) => {
    var newUser = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    newUser.save().then((doc) => res.status(201).send(doc));
}

const loginUser = async (req, res)=> {
    const login = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        let user = await User.findOne({
            email: login.email
        });
        if (!user) {
            return res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }
        let match = await user.compareUserPassword(login.password, user.password);
        if (match) {
            let token = jwt.sign({
                 user
                }, process.env.JWTPRIVATEKEY, {
                expiresIn: 604800
            })
            if (token) {
              
                return res.status(200).json({
                    success: true,
                    token: token,
                })
            }
        } else {

            return res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
  };

  module.exports = { registerUser, loginUser }