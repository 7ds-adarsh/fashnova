import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectDB } from '@/src/lib/db';
import User from '@/models/User';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt({ token, user }) {
            // Runs when a user signs in or session is checked
            if (user) {
                await connectDB();
                let dbUser = await User.findOne({ email: user.email });

                // If the user doesn't exist in DB, create them
                if (!dbUser) {
                    dbUser = await User.create({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                    });
                }

                token.id = dbUser._id.toString();
            }
            return token;
        },

        async session({ session, token }) {
            if (token?.id) {
                session.user.id = token.id; // Make user.id available in client
            }
            return session;
        },
    },

    session: {
        strategy: 'jwt',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
