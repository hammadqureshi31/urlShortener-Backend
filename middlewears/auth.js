import jwt from 'jsonwebtoken';

function validateToken(token) {
  try {
    const payload = jwt.verify(token, 'testing');
    // console.log("payload", payload);
    return payload;
  } catch (error) {
    // console.error("Token validation error:", error);
    throw error;
  }
}

export function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return res.status(401).send("Authentication required");
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
      next();
    } catch (error) {
      res.status(401).send("Invalid or expired token");
    }
  };
}
