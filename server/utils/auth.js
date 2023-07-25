const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via cookies
    let token = req.cookies.token;
    console.log("Auth Middleware triggered."); // Add log here
    console.log("Token from cookies: ", token); // And here
    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      console.log('Decoded token:', data); // Add this
      req.user = data;
      console.log('Request user after decoding token:', req.user); // And this

    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
