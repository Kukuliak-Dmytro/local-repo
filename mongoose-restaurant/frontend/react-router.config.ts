import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  // Update the app directory to point to the new src/app location
  appDirectory: "./src/app",
} satisfies Config;
