import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const tsconfigOverride = {
  exclude: ["node_modules"],
};

export default [
  {
    input: "src/index.ts",
    plugins: [
      typescript({ ...tsconfigOverride }),
      replace({
        __VERSION__: "1.0.0",
        preventAssignment: true,
      }),
    ],
    output: [
      {
        file: "dist/cjs/index.js",
        format: "cjs",
      },
      {
        file: "dist/cjs/index.min.js",
        format: "cjs",
        plugins: [terser()],
      },
      {
        file: "dist/esm/index.js",
        format: "esm",
      },
      {
        file: "dist/esm/index.min.js",
        format: "esm",
        plugins: [terser()],
      },
      {
        file: "dist/iife/index.js",
        format: "iife",
        name: "ApolloIIFEBundle",
      },
      {
        file: "dist/iife/index.min.js",
        format: "iife",
        plugins: [terser()],
        name: "ApolloIIFEMinifiedBundle",
      },
    ],
  },
];
