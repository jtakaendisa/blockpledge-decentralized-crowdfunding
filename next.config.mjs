import withPlaiceholder from '@plaiceholder/next';

/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_GATEWAY_DOMAIN,
        port: '',
        pathname: '/ipfs/**',
      },
    ],
  },
};

export default withPlaiceholder(config);
