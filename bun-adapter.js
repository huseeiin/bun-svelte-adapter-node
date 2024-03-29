import { rmSync } from "fs";

/**
 * @param opts {{out:string}}
 */
export default ({ out } = { out: "build" }) => {
  /** @type {import('@sveltejs/kit').Adapter} */
  const adapter = {
    name: "bun",
    async adapt(builder) {
      // Clear out the build directory
      builder.rimraf(out);
      builder.mkdirp(out);

      const serverDir = `${out}/server`;

      builder.writeServer(serverDir);
      builder.writeClient(`${out}/client`);

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
          .replace("CLIENT_DIRECTORY", builder.getClientDirectory())
      );

      Bun.spawn(`bun build ${entry} --target bun --outdir ${out}`.split(" "));

      rmSync(serverDir, { recursive: true, force: true });
    },
  };

  return adapter;
};
