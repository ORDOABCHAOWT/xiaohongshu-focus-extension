const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const manifestPath = path.join(root, "manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const contentScriptPath = path.join(root, "src/content-script.js");
const contentScriptSource = fs.readFileSync(contentScriptPath, "utf8");
const coreScriptPath = path.join(root, "src/focus-core.js");
const coreScriptSource = fs.readFileSync(coreScriptPath, "utf8");

assert.equal(manifest.manifest_version, 3);
assert.equal(manifest.name, "小红书专注搜索页");
assert.equal(manifest.permissions, undefined, "extension must not request runtime permissions");
assert.equal(manifest.optional_permissions, undefined, "extension must not request optional permissions");
assert.equal(manifest.host_permissions, undefined, "content-script matches are sufficient; do not add host permissions");
assert.equal(manifest.background, undefined, "extension must not add a background worker without explicit approval");
assert.equal(manifest.action, undefined, "extension must not add toolbar behavior without explicit approval");
assert.ok(Array.isArray(manifest.content_scripts));
assert.equal(manifest.content_scripts.length, 1);

const [contentScript] = manifest.content_scripts;
assert.deepEqual(contentScript.matches, ["https://www.xiaohongshu.com/*"]);
assert.deepEqual(contentScript.js, ["src/focus-core.js", "src/content-script.js"]);
assert.equal(contentScript.run_at, "document_start");
assert.deepEqual(manifest.icons, {
  16: "assets/icon-16.png",
  32: "assets/icon-32.png",
  48: "assets/icon-48.png",
  128: "assets/icon-128.png"
});
assert.deepEqual(manifest.web_accessible_resources, [
  {
    resources: ["assets/xhs-icon.png", "assets/bottom-bg-openai-b.png"],
    matches: ["https://www.xiaohongshu.com/*"]
  }
]);

for (const file of contentScript.js) {
  assert.ok(fs.existsSync(path.join(root, file)), `${file} must exist`);
}

assert.ok(fs.existsSync(path.join(root, "assets/xhs-icon.png")), "assets/xhs-icon.png must exist");
assert.ok(fs.existsSync(path.join(root, "assets/bottom-bg-openai-b.png")), "assets/bottom-bg-openai-b.png must exist");

for (const iconPath of Object.values(manifest.icons)) {
  assert.ok(fs.existsSync(path.join(root, iconPath)), `${iconPath} must exist`);
}

assert.ok(
  !contentScriptSource.includes('preserveAspectRatio="none"'),
  "bottom illustration must not use preserveAspectRatio=\"none\" because it distorts the art"
);
assert.ok(
  !contentScriptSource.includes('<svg class="xhs-focus-art"'),
  "bottom illustration must not be a stretched SVG"
);
assert.ok(
  !contentScriptSource.includes("xhs-focus-art-card"),
  "old CSS illustration cards must be removed when using the generated image asset"
);
assert.ok(
  contentScriptSource.includes("xhs-focus-art-image"),
  "bottom illustration must render the generated image asset"
);
assert.ok(
  contentScriptSource.includes("object-fit: cover"),
  "bottom illustration image must use cover cropping instead of non-uniform stretching"
);
assert.ok(
  contentScriptSource.includes("object-position: center bottom"),
  "bottom illustration image must anchor to the bottom"
);
assert.ok(
  contentScriptSource.includes("-webkit-mask-image: linear-gradient"),
  "bottom illustration image must fade in at the top to avoid a visible horizontal seam"
);
assert.ok(
  contentScriptSource.includes("mask-image: linear-gradient"),
  "bottom illustration image must include an unprefixed top fade mask"
);
assert.ok(
  contentScriptSource.includes(`#\${OVERLAY_ID}::before`),
  "focus page must use a dedicated upper-left spherical color block layer"
);
assert.ok(
  contentScriptSource.includes(`#\${OVERLAY_ID}::after`),
  "focus page must use a dedicated lower-right spherical color block layer"
);
assert.ok(
  contentScriptSource.includes("rgba(255, 112, 72, 0.42)"),
  "lower-right spherical color block should be clearly visible enough to avoid an all-white page"
);
assert.ok(
  contentScriptSource.includes("right: clamp(-108px, -6vw, -72px)"),
  "lower-right spherical color block should sit inside the viewport enough to be visible"
);
assert.ok(
  contentScriptSource.includes("animation: xhs-focus-orb-drift 18s ease-in-out infinite alternate"),
  "spherical color blocks should move subtly so the page feels gently dynamic"
);
assert.ok(
  contentScriptSource.includes("opacity: 0.08"),
  "bottom illustration must stay extremely subtle so it does not read as a horizontal color band"
);
assert.ok(
  !contentScriptSource.includes("border-bottom: 1px solid rgba(17, 24, 39, 0.06)"),
  "top avatar bar must not render a bottom divider line"
);
assert.ok(
  contentScriptSource.includes("--xhs-focus-main-offset"),
  "main search group must define a responsive upward offset"
);
assert.ok(
  contentScriptSource.includes("transform: translateY(var(--xhs-focus-main-offset))"),
  "main search group must be moved upward with the responsive offset"
);
assert.ok(
  contentScriptSource.includes("core.extractFavoritesProfileUrl(pageAnchors)"),
  "avatar link must discover the signed-in profile without a stored account identifier"
);
assert.ok(
  !/\/user\/profile\/[a-z0-9]{20,}/i.test(coreScriptSource),
  "core source must not contain a hard-coded Xiaohongshu account identifier"
);
assert.ok(
  contentScriptSource.includes("core.shouldShowFocusPage(window.location.href)"),
  "content script must guard rendering with the pure route predicate"
);

for (const [name, source] of [
  ["src/focus-core.js", coreScriptSource],
  ["src/content-script.js", contentScriptSource]
]) {
  assert.ok(!/\beval\s*\(/.test(source), `${name} must not use eval`);
  assert.ok(!/\bnew\s+Function\s*\(/.test(source), `${name} must not construct executable code`);
  assert.ok(!/\bfetch\s*\(/.test(source), `${name} must not add network requests`);
  assert.ok(!/\bXMLHttpRequest\b/.test(source), `${name} must not add network requests`);
  assert.ok(!/\bchrome\.storage\b/.test(source), `${name} must not modify account or extension state`);
}

console.log("Extension manifest and runtime constraints are valid.");
