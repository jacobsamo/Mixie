import { env } from "@/env.mjs";
import * as jose from "jose";

interface JWTResponse<T> {
  items: T | undefined;
  app: string;
}

// class JWT {
//   async signJWT(payload?: object) {
//     try {
//       const secret = new TextEncoder().encode(env.JWT_SECRET);
//       return new jose.SignJWT({
//         items: payload,
//         app: env.NEXT_API_APP_TOKEN,
//       })
//         .setProtectedHeader({ alg: "HS256", typ: "JWT" })
//         .setIssuedAt()
//         .setExpirationTime("1h")
//         .sign(secret);
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

//   /**
//    * Sets the payload to be signed in a jwt to be sent back to the client so that certain data is private
//    */
//   async setPayload<T>(payload: T) {
//     try {
//       const secret = new TextEncoder().encode(env.JWT_SECRET);
//       return new jose.SignJWT({
//         payload,
//       })
//         .setProtectedHeader({ alg: "HS256", typ: "JWT" })
//         .sign(secret);
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

//   async verifyJWT<T>(token: string): Promise<JWTResponse<T>> {
//     console.log("token: ", token);

//     try {
//       const payload = (
//         await jose.jwtVerify(
//           token,
//           new TextEncoder().encode(process.env.JWT_SECRET_KEY)
//         )
//       ).payload;
//       console.log("payload: ", payload);
//       return {
//         items: payload.items as T,
//         app: payload.app as string,
//       };
//     } catch (error) {
//       console.log(error);
//       throw new Error("Your token has expired.");
//     }
//   }

//   async decodeJWT<T>(token: string): Promise<T> {
//     try {
//       return (
//         await jose.jwtDecrypt(
//           token,
//           new TextEncoder().encode(process.env.JWT_SECRET_KEY)
//         )
//       ).payload as T;
//     } catch (error) {
//       console.log(error);
//       throw new Error("Your token has expired.");
//     }
//   }
// }

// export default new JWT();

interface BaseRequest {
  url: RequestInfo | URL;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  params?: any;
  headers?: HeadersInit;
  nextOptions?: NextFetchRequestConfig;
}

export const Request = async <T>(
  url: string,
  {
    method = "GET",
    data,
    params,
    headers,
    nextOptions,
  }: Partial<BaseRequest> = {}
) => {
  const req = await fetch(`${env.NEXT_PUBLIC_APP_URL}/${url}`, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      ...headers,
      authorization: `Bearer ${env.NEXT_API_APP_TOKEN}`,
    },
    next: {
      ...nextOptions,
      revalidate: 60 * 60 * 24,
    },
  });

  return (await req.json()) as T;
};
