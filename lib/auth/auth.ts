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
      disableSignUp: true,
      async sendVerificationOTP({ email, otp }) {
        const { error } = await resend.emails.send({
          from: "LCC 40 Anos <loging@40lcc.di.uminho.pt>",
          to: email,
          subject: "Your LCC 40 Anos sign-in code",
          html: `<p>Your verification code is <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
        });

        if (error) {
          throw new Error(
            `Could not send authentication email: ${error.message}`,
          );
        }
      },
    }),
  ],
});

export type AuthSession = typeof auth.$Infer.Session;
