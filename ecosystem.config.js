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
      },
    },
    {
      name: "bainboiler-cms",
      cwd: "./apps/cms",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
        PORT: 1337,
        // Strapi 生产环境必须的密钥 (部署时需要在服务器的 .env 中覆盖或直接在这里配置真实的随机字符串)
        APP_KEYS: "toBeModified1,toBeModified2",
        API_TOKEN_SALT: "toBeModified3",
        ADMIN_JWT_SECRET: "toBeModified4",
        TRANSFER_TOKEN_SALT: "toBeModified5",
        JWT_SECRET: "toBeModified6",
        // 如果使用 SQLite 并且需要持久化，确保挂载路径正确
        DATABASE_CLIENT: "sqlite",
        DATABASE_FILENAME: ".tmp/data.db"
      },
    },
  ],
};
