/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other configurations ...
  images: {
    domains: ['imgs.search.brave.com'],
  },
  async headers() {
    return [
      {
        source: '/api/cart',
        headers: [
          { key: 'Content-Security-Policy', value: "default-src 'self'" },
        ],
      },
    ];
  },
};

export default nextConfig;
