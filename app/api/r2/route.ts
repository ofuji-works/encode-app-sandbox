import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export const POST = (req: Request) => {
  const data = req.formData().then((data) => {
    console.log(data.get("file"));
    //const r2 = getRequestContext().env;
    return data;
  });
  return Response.json({ message: "ok" });
};

export const GET = (req: Request) => {
  return Response.json({ message: "Hello World" });
};
