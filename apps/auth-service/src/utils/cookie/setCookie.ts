// import { Response } from "express";

// export const setCookie = (res: Response, name: string, value: string) => {
//   res.cookie(name, value, {
//     httpOnly: true,
//     secure: true,
//     sameSite: "none",
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//   });
// };

import { Response } from "express";

export const setCookie = (
  res: Response,
  name: string,
  value: string,
  options: any = {}
) => {
  res.cookie(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // only secure in prod
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    ...options,
  });
};
