import { env } from "@/env.mjs";
import jwt from "jsonwebtoken";

class JWT {
  setJwt(data?: any) {
    const JWT = jwt.sign(
      {
        ...data,
        app: env.API_APP_TOKEN,
      },
      env.JWT_SECRET
    );

    return JWT;
  }

  verifyJwt(token: string) {
    const verify = jwt.verify(token, env.JWT_SECRET);
    console.log("verify: ", verify);
    return verify;
  }
}

export default new JWT();

interface BaseRequest {
  url: RequestInfo | URL;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  params?: any;
  headers?: HeadersInit;
  nextOptions?: NextFetchRequestConfig;
}

export const Get = async <T>({
  url,
  method = "GET",
  data,
  params,
  headers,
  nextOptions,
}: BaseRequest) => {
  const jwt = new JWT();

  const req = await fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      ...headers,
      authorization: jwt.setJwt(),
    },
    next: {
      ...nextOptions,
      revalidate: 60 * 60 * 24,
    },
  });

  return (await req.json()) as T;
};
