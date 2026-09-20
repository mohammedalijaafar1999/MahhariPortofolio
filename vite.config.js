import { defineConfig } from "vite";
import { resolve } from "path";

// Serve /css/* and /javascript/* from src/ in dev (HTML references them via ../)
const serveSrcStatic = {
  name: "serve-src-static",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url && req.url.startsWith("/css/")) {
        req.url = "/@fs/" + resolve(__dirname, "src/css").replace(/\\/g, "/") + req.url.slice(4);
      } else if (req.url && req.url.startsWith("/javascript/")) {
        req.url = "/@fs/" + resolve(__dirname, "src/javascript").replace(/\\/g, "/") + req.url.slice(11);
      }
      next();
    });
  },
};

// Vite config for the portfolio.
// - Root is src/pages so index.html and Work.html are served directly.
// - /public is served at "/" (Vite default), so images live at /Images/...
export default defineConfig({
  root: "src/pages",
  publicDir: resolve(__dirname, "public"),
  plugins: [serveSrcStatic],
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/pages/index.html"),
        work: resolve(__dirname, "src/pages/Work.html"),
      },
    },
  },
  server: {
    open: true,
  },
});
