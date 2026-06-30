export function isAdminRequest(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  const token = cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("kotn_admin="))
    ?.split("=")[1];

  return token === getAdminToken();
}

export function getAdminToken() {
  const token = process.env.ADMIN_SESSION_TOKEN;
  if (token) return token;

  if (process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_SESSION_TOKEN must be set in production");
  }

  return "local-admin-session";
}

export function getAdminPassword() {
  const password = process.env.ADMIN_PASSWORD;
  if (password) return password;

  if (process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_PASSWORD must be set in production");
  }

  return "change-me-king";
}
