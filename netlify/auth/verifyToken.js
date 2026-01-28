import jwt from "jsonwebtoken";

export function requireUser(request) {
  const auth = request.headers.get("authorization") || "";
  const [, token] = auth.split(" ");

  if (!token) {
    throw new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload; // { userId, email, iat, exp }
  } catch {
    throw new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }
}
