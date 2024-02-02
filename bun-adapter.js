import { rmSync } from "fs";

/**
 * @param opts {{out:string}}
 */
export default (opts = {}) => {
  const { out = "build" } = opts;

  /** @type {import('@sveltejs/kit').Adapter} */
  const adapter = {
    name: "bun",
    async adapt(builder) {
      // Clear out the build directory
      builder.rimraf(out);
      builder.mkdirp(out);

      const serverDir = `${out}/server`;

      builder.writeServer(serverDir);

      const server = builder.getServerDirectory();

      const index = await Bun.file(
        `${import.meta.dirname}/bun-adapter/index.js`
      ).text();

      const entry = `${out}/index.js`;

      await Bun.write(
        entry,
        index
          .replace("MANIFEST", `${server}/manifest.js`)
          .replace("SERVER", `${server}/index.js`)
      );

      Bun.spawn(
        `bun build ${entry} --external uWebSockets.js --target bun --outdir ${out}`.split(
          " "
        )
      );

      rmSync(serverDir, { recursive: true, force: true });
    },
  };

  return adapter;
};
