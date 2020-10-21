import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import pkg from "./package.json";

const external = Object.keys(
  Object.assign({}, pkg.dependencies, pkg.peerDependencies)
);

export default [
  {
    input: "src/index.js",
    output: [
      {
        dir: pkg.main.replace("/index.js", ""),
        format: "cjs",
        sourcemap: true,
        exports: "auto",
        preserveModules: true,
        preserveModulesRoot: "src"
      },
      {
        dir: pkg.module.replace("/index.js", ""),
        format: "esm",
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: "src"
      }
    ],
    external,
    plugins: [
      resolve(),
      commonjs(),
      babel({
        runtimeHelpers: true
      })
    ]
  }
];
