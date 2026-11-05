import { prismaAdapter } from "@better-auth/prisma-adapter";
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { Resend } from "resend";
import prisma from "@/lib/prisma";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      role: {
        type: ["ADMIN", "USER"],
        required: true,
        defaultValue: "USER",
        input: false,
      },
    },
  },
  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 300,
      allowedAttempts: 3,
      storeOTP: "hashed",
      async sendVerificationOTP({ email, otp }) {
        const { error } = await resend.emails.send({
          from: process.env.AUTH_EMAIL_FROM ?? "LCC 40 Anos <onboarding@resend.dev>",
          to: email,
          subject: "Your LCC 40 Anos sign-in code",
          text: `Your authentication code is ${otp}. It expires in 5 minutes.`,
        });

        if (error) {
          throw new Error(`Could not send authentication email: ${error.message}`);
        }
      },
    }),
  ],
});

export type AuthSession = typeof auth.$Infer.Session;
