import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from "@/lib/db"
import { getUserById } from "@/data/user"
import authConfig from "@/auth.config"
import { UserRole } from "@prisma/client"


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // pages: {
  //   signIn: "/auth/signin" ,
  //   error: '/auth/error',
  // },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date()
        }
      })
    }
  },
  callbacks: {
    // async signIn ({user}) {
    //   console.log({user})
    //   if (!user) return false;

    //   const existUser = await getUserById(user.id as string);

    //   if (!existUser || !existUser.emailVerified) return false;

    //   console.log(user)
    //   return true
    // },

    async session({ token, session },) {
      console.log({ token })
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existUser = await getUserById(token.sub);

      if (!existUser) return token;

      token.role = existUser.role;

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" }, // Prisma session strategy database dosent work
  ...authConfig,
})