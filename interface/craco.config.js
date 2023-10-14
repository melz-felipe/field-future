const path = require("path");
module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          crypto: false,
          http: false,
          https: false,
          zlib: false,
          stream: false,
        },
      },
    },
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
