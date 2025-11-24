const config = {
  plugins: ["@tailwindcss/postcss",
        "autoprefixer",
    process.env.NODE_ENV === "production" ? "cssnano" : undefined,
  ].filter(Boolean),
  
};

export default config;
