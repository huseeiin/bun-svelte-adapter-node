import { Server } from "SERVER";
import { manifest } from "MANIFEST";

const server = new Server(manifest);
server.init({ env: process.env });

Bun.serve({
  fetch(req) {
    return server.respond(req);
  },
});
