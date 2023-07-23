/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["mongodb"]
    }
}

module.exports = nextConfig
