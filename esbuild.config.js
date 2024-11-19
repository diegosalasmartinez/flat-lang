import esbuild from "esbuild";

esbuild.build({
    entryPoints: ["./dist/styles.css", "./dist/scripts.js"],
    outdir: "./dist",
    minify: true,
    bundle: true,
}).then(() => {
    console.log("Assets optimized successfully!");
}).catch((error) => {
    console.error("Error during optimization:", error);
});
