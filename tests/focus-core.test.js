const test = require("node:test");
const assert = require("node:assert/strict");

const {
  GENERIC_PROFILE_URL,
  shouldShowFocusPage,
  buildSearchUrl,
  normalizeProfileHref,
  buildFavoritesProfileUrl,
  extractFavoritesProfileUrl,
  pickPreferredIconHref
} = require("../src/focus-core.js");

test("only shows focus page on Xiaohongshu explore-style entry URLs", () => {
  assert.equal(shouldShowFocusPage("https://www.xiaohongshu.com/explore"), true);
  assert.equal(shouldShowFocusPage("https://www.xiaohongshu.com/explore/"), true);
  assert.equal(shouldShowFocusPage("https://www.xiaohongshu.com/explore?channel=homefeed"), true);
  assert.equal(shouldShowFocusPage("https://www.xiaohongshu.com/search_result?keyword=coffee"), false);
  assert.equal(shouldShowFocusPage("https://www.xiaohongshu.com/user/profile/abc123"), false);
  assert.equal(shouldShowFocusPage("https://example.com/explore"), false);
});

test("builds a Xiaohongshu search URL and preserves the original query text", () => {
  const url = buildSearchUrl("  海口 咖啡  ");
  assert.equal(url.origin, "https://www.xiaohongshu.com");
  assert.equal(url.pathname, "/search_result");
  assert.equal(url.searchParams.get("keyword"), "海口 咖啡");
  assert.equal(url.searchParams.get("source"), "web_explore_feed");
});

test("does not navigate for an empty search query", () => {
  assert.equal(buildSearchUrl("   "), null);
});

test("builds a favorites URL without storing a real account identifier", () => {
  assert.equal(
    buildFavoritesProfileUrl("/user/profile/example-account?xsec_source=pc_home"),
    "https://www.xiaohongshu.com/user/profile/example-account?xsec_source=pc_home&tab=fav&subTab=note"
  );
  assert.equal(buildFavoritesProfileUrl("/explore"), GENERIC_PROFILE_URL);
});

test("normalizes discovered profile hrefs to absolute Xiaohongshu URLs", () => {
  assert.equal(
    normalizeProfileHref("/user/profile/abc123"),
    "https://www.xiaohongshu.com/user/profile/abc123"
  );
  assert.equal(
    normalizeProfileHref("https://www.xiaohongshu.com/user/profile/abc123?foo=bar"),
    "https://www.xiaohongshu.com/user/profile/abc123?foo=bar"
  );
  assert.equal(normalizeProfileHref("https://example.com/user/profile/abc123"), null);
});

test("extracts the first usable profile href and opens its favorites tab", () => {
  const anchors = [
    { href: "https://www.xiaohongshu.com/explore" },
    { href: "/user/profile/abc123" },
    { href: "/user/profile/def456" }
  ];

  assert.equal(
    extractFavoritesProfileUrl(anchors),
    "https://www.xiaohongshu.com/user/profile/abc123?tab=fav&subTab=note"
  );
});

test("falls back safely while the signed-in profile link is not yet in the DOM", () => {
  assert.equal(extractFavoritesProfileUrl([]), GENERIC_PROFILE_URL);
});

test("picks the highest-quality official Xiaohongshu icon from page links", () => {
  const links = [
    { rel: "shortcut icon", href: "https://www.xiaohongshu.com/favicon.ico" },
    {
      rel: "apple-touch-icon",
      href: "https://picasso-static.xiaohongshu.com/fe-platform/f43dc4a8baf03678996c62d8db6ebc01a82256ff.png"
    }
  ];

  assert.equal(
    pickPreferredIconHref(links),
    "https://picasso-static.xiaohongshu.com/fe-platform/f43dc4a8baf03678996c62d8db6ebc01a82256ff.png"
  );
});

test("falls back to Xiaohongshu favicon when no icon link is available", () => {
  assert.equal(pickPreferredIconHref([]), "https://www.xiaohongshu.com/favicon.ico");
});
