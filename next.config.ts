import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3", "firebase-admin", "fontkit"],
};

export default nextConfig;
