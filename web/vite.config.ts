import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrgPagesRepo = repoName.endsWith(".github.io");
const base = process.env.GITHUB_ACTIONS
  ? isUserOrOrgPagesRepo
    ? "/"
    : `/${repoName}/`
  : "/";

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  optimizeDeps: {
    include: ["react-slick"],
  },
});
