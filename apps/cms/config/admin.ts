export default ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET", "replace-me"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT", "replace-me"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT", "replace-me"),
    },
  },
});
