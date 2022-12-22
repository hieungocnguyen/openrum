/** @type {import('next').NextConfig} */
const nextConfig = {
   env: {
      MONGO_URI:
         "mongodb+srv://ngnohieu:Ngochieu2001@openrum-cluster.g78dq0g.mongodb.net/?retryWrites=true&w=majority",
      JWT_SECRET: "hieudeptrai",
   },
};

module.exports = nextConfig;
