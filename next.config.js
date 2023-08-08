/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ipfs.io',
                port: '',
                pathname: '/ipfs/**'
            },
            {
                protocol: 'https',
                hostname: 'craft-network.mypinata.cloud',
                port: '',
                pathname: '/ipfs/**'
            }
        ]
    }
}

module.exports = nextConfig
