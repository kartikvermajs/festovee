// import { ValidationError } from "./../../../../packages/error-handler/index";
// import crypto from "crypto";
// import redis from "../../../../packages/libs/redis";
// import { sendEmail } from "./sendMail";
// import { NextFunction } from "express";

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// export const validateRegistrationData = (
//   data: any,
//   userType: "user" | "seller"
// ) => {
//   const { name, email, password, phone_number, country } = data;

//   // Check required fields
//   if (
//     !name ||
//     !email ||
//     !password ||
//     (userType === "seller" && (!phone_number || !country))
//   ) {
//     throw new ValidationError("Missing required fields");
//   }

//   // Validate email format
//   if (!emailRegex.test(email)) {
//     throw new ValidationError("Invalid email format!");
//   }
// };

// export const checkOtpRestriction = async (
//   email: string,
//   next: NextFunction
// ) => {
//   if (await redis.set(`otp_lock:${email}`)) {
//     return next(
//       new ValidationError(
//         "Account locked due to multiple failed attempts, Try Again after 30minutes!!"
//       )
//     );
//   }
//   if (await redis.set(`otp_spam_lock:${email}`)) {
//     return next(
//       new ValidationError(
//         "Too many OTP requests! Please wait 1hour before requesting again"
//       )
//     );
//   }

//   if (await redis.set(`otp_cooldown:${email}`)) {
//     return next(
//       new ValidationError("Please wait 1 min before requesting a new OTP!")
//     );
//   }
// };

// export const trackOtpRequests = async (email: string, next: NextFunction) => {
//   const otpRequestKey = `otp_request_count:${email}`;
//   let otpRequests = parseInt((await redis.set(otpRequestKey)) || "0");

//   if (otpRequests >= 2) {
//     await redis.set(`otp_spam_lock:${email}`, "locked", "EX", 3600);
//     return next(
//       new ValidationError(
//         "Too many OTP requests .Wait for 1hour to request again."
//       )
//     );
//   }
//   await redis.set(otpRequestKey, otpRequests + 1, "EX", 3600);
// };

// export const sendOtp = async (
//   name: string,
//   email: string,
//   template: string
// ) => {
//   const otp = crypto.randomInt(1000, 9999).toString();
//   await sendEmail(email, "Verify your email", template, { name, otp });
//   await redis.set(`otp:${email}`, otp, "EX", 300);
//   await redis.set(`otp_cooldown:${email}`, "true", "EX", 60);
// };

import { ValidationError } from "./../../../../packages/error-handler/index";
import crypto from "crypto";
import redis from "../../../../packages/libs/redis";
import { sendEmail } from "./sendMail";
import { NextFunction } from "express";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegistrationData = (
  data: any,
  userType: "user" | "seller"
) => {
  const { name, email, password, phone_number, country } = data;

  if (
    !name ||
    !email ||
    !password ||
    (userType === "seller" && (!phone_number || !country))
  ) {
    throw new ValidationError("Missing required fields");
  }

  if (!emailRegex.test(email)) {
    throw new ValidationError("Invalid email format!");
  }
};

export const checkOtpRestriction = async (
  email: string,
  next: NextFunction
) => {
  if (await redis.get(`otp_lock:${email}`)) {
    return next(
      new ValidationError(
        "Account locked due to multiple failed attempts. Try again after 30 minutes!"
      )
    );
  }
  if (await redis.get(`otp_spam_lock:${email}`)) {
    return next(
      new ValidationError(
        "Too many OTP requests! Please wait 1 hour before requesting again."
      )
    );
  }
  if (await redis.get(`otp_cooldown:${email}`)) {
    return next(
      new ValidationError("Please wait 1 minute before requesting a new OTP!")
    );
  }
};

export const trackOtpRequests = async (email: string, next: NextFunction) => {
  const otpRequestKey = `otp_request_count:${email}`;
  let otpRequests = parseInt((await redis.get(otpRequestKey)) || "0");

  if (otpRequests >= 2) {
    await redis.set(`otp_spam_lock:${email}`, "locked", "EX", 3600);
    return next(
      new ValidationError(
        "Too many OTP requests. Wait 1 hour to request again."
      )
    );
  }

  await redis.set(otpRequestKey, (otpRequests + 1).toString(), "EX", 3600);
};

export const sendOtp = async (
  name: string,
  email: string,
  template: string
) => {
  const otp = crypto.randomInt(1000, 9999).toString();

  // Send OTP email
  await sendEmail(email, "Verify your email", template, { name, otp });

  // Store OTP and cooldown in Redis
  await redis.set(`otp:${email}`, otp, "EX", 300); // 5 minutes
  await redis.set(`otp_cooldown:${email}`, "true", "EX", 60); // 1 minute cooldown
};

export const verifyOtp = async (
  email: string,
  otp: string,
  next: NextFunction
) => {
  const storedOtp = await redis.get(`otp:${email}`);
  if (!storedOtp) {
    throw new ValidationError("Invalid or expired OTP!");
  }

  const failedAttemptsKey = `otp_attempts:${email}`;
  const failedAttempts = parseInt((await redis.get(failedAttemptsKey)) || "0");

  if (storedOtp !== otp) {
    if (failedAttempts >= 2) {
      await redis.set(`otp_lock:${email}`, "locked", "EX", 1800);
      await redis.del(`otp:${email}`, failedAttemptsKey);
      throw new ValidationError(
        "Too many failed attempts. Your account is locked for 30 minutes"
      );
    }
    await redis.set(failedAttemptsKey, failedAttempts + 1, "EX", 300);
    throw new ValidationError(
      `Incorrect OTP. ${2 - failedAttempts} attempts left.`
    );
  }

  await redis.del(`otp:${email}`, failedAttemptsKey);
};
