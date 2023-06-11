import NextAuth from 'next-auth';
import authOptions from '@lib/config/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
