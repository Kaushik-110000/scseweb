/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Unsplash images
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/premium_photo-*",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
        pathname: "/photo*",
      },
      // Google-hosted images
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      // Future CDN images
      {
        protocol: "https",
        hostname: "cdn.mos.cms.futurecdn.net",
      },
      // Searchengineland images with a wildcard path
      {
        protocol: "https",
        hostname: "searchengineland.com",
        pathname: "/*",
      },
      // Simplilearn images
      {
        protocol: "https",
        hostname: "www.simplilearn.com",
        pathname: "/ice9/free_resources_article_thumb/*",
      },
    ],
  },
};

module.exports = nextConfig;
