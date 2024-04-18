/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'streamsgate.net',
            },
        ],
    },
};

export default nextConfig;
