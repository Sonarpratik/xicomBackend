
const jwt = require("jsonwebtoken");

const generateToken=(user)=>{
    const { password:_p, ...newData } = user._doc;
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, ...newData },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
}

module.exports = {
  generateToken,
};
