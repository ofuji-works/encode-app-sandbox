import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  return basicAuth(req);
}

const craimBasicAuth = (): NextResponse => {
  const response = NextResponse.next({
    status: 401,
  });
  response.headers.set("www-authenticate", 'Basic realm="Secure Area"');

  return response;
};

const basicAuth = (req: NextRequest): NextResponse => {
  const auth = req.headers.get("authorization");
  if (!auth) {
    return craimBasicAuth();
  }

  const [username, password] = atob(auth.split(" ")[1]).split(":");
  if (
    username !== process.env.NEXT_PUBLIC_BASIC_ID ||
    password !== process.env.NEXT_PUBLIC_BASIC_PASS
  ) {
    return craimBasicAuth();
  }

  return NextResponse.next();
};
