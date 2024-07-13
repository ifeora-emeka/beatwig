/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'streamsgate.net',
            },
            {
                protocol: 'https',
                hostname: 'media.themoviedb.org',
            },
            {
                protocol: 'https',
                hostname: "lh3.googleusercontent.com",
            },
        ],
    },
};

export default nextConfig;
