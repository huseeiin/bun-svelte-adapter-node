import { Server } from "SERVER";
import { manifest } from "MANIFEST";
import { totalist } from "totalist";

/**
 * @type {Record<string,string>}
 */
const assets = {};

totalist(
  "CLIENT_DIRECTORY",
  (relPath, absPath) => (assets[relPath] = absPath),
  "/"
);

const server = new Server(manifest);
server.init({
  // @ts-ignore
  env: Bun.env,
});

Bun.serve({
  fetch(req) {
    const { pathname } = new URL(req.url);

    return pathname in assets
      ? new Response(Bun.file(assets[pathname]))
      : server.respond(req, {
          getClientAddress: () => this.requestIP(req)?.address ?? "",
        });
  },
});
