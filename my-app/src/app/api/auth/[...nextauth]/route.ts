import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, {AuthOptions, User} from "next-auth"
import {queryAccount} from "@/app/api/account/queryAccount"

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            type: "credentials",
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("Credentials authorize: ", credentials)
                if (credentials) {
                    const res = await queryAccount<Record<string, string>>({
                        name: credentials.username,
                        password: credentials.password
                    })
                    console.log(res)
                    if (!res) return null
                    return { id: res._id.toString(), name: res.name, admin: res.admin } as User
                } else return null
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV !== "production",
    callbacks: {
        async signIn(params) {
            console.log("signIn callback: ", params)
            return true
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }