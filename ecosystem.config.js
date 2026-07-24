module.exports = {
  apps: [
    {
      name: "bainboiler-web",
      cwd: "./apps/web",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        // Sanity Content Lake（云服务，无需自托管）
        // 在服务器 .env 中覆盖：
        //   NEXT_PUBLIC_SANITY_PROJECT_ID
        //   NEXT_PUBLIC_SANITY_DATASET
        //   NEXT_PUBLIC_SANITY_API_VERSION
        //   SANITY_API_READ_TOKEN (可选)
        //   NEXT_PUBLIC_SITE_URL
      },
    },
  ],
};
