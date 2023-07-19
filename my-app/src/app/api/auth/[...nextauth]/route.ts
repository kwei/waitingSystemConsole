import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, {Account, AuthOptions, Profile, User} from "next-auth"
import {AdapterUser} from "next-auth/adapters";
import {queryAccount} from "@/app/api/account/queryAccount";

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "",
            type: "credentials",
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("Credentials authorize: ", credentials)
                if (credentials) {
                    const res = await queryAccount<string>({
                        name: credentials.username,
                        password: credentials.password
                    })
                    console.log(res)
                    if (!res) return null
                    return { id: res._id.toString(), name: res.name } as User
                } else return null
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
    debug: process.env.NODE_ENV !== "production",
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) token = user as unknown as { [key: string]: any }
            console.log(token)
            return token
        },
        session: async ({ session, token }) => {
            session.user = { ...token }
            return session
        },
        async signIn(params) {
            console.log("signIn callback: ", params.credentials)
            return true
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }