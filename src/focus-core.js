(function initFocusCore(root) {
  "use strict";

  const XHS_ORIGIN = "https://www.xiaohongshu.com";
  const XHS_FAVICON = `${XHS_ORIGIN}/favicon.ico`;
  const GENERIC_PROFILE_URL = `${XHS_ORIGIN}/user/profile`;

  function parseUrl(value) {
    try {
      return new URL(value, XHS_ORIGIN);
    } catch (_error) {
      return null;
    }
  }

  function shouldShowFocusPage(value) {
    const url = parseUrl(value);
    if (!url) return false;
    if (url.origin !== XHS_ORIGIN) return false;
    return url.pathname === "/explore" || url.pathname === "/explore/";
  }

  function buildSearchUrl(query) {
    const keyword = String(query || "").trim();
    if (!keyword) return null;

    const url = new URL("/search_result", XHS_ORIGIN);
    url.searchParams.set("keyword", keyword);
    url.searchParams.set("source", "web_explore_feed");
    return url;
  }

  function normalizeProfileHref(href) {
    const url = parseUrl(href);
    if (!url) return null;
    if (url.origin !== XHS_ORIGIN) return null;
    if (!url.pathname.startsWith("/user/profile")) return null;
    return url.toString();
  }

  function buildFavoritesProfileUrl(href) {
    const normalized = normalizeProfileHref(href);
    if (!normalized) return GENERIC_PROFILE_URL;

    const url = new URL(normalized);
    const profileId = url.pathname.split("/").filter(Boolean)[2];
    if (!profileId) return GENERIC_PROFILE_URL;

    url.searchParams.set("tab", "fav");
    url.searchParams.set("subTab", "note");
    return url.toString();
  }

  function extractFavoritesProfileUrl(anchors) {
    for (const anchor of anchors || []) {
      const normalized = normalizeProfileHref(anchor && anchor.href);
      if (normalized && new URL(normalized).pathname.split("/").filter(Boolean)[2]) {
        return buildFavoritesProfileUrl(normalized);
      }
    }
    return GENERIC_PROFILE_URL;
  }

  function pickPreferredIconHref(links) {
    const candidates = Array.from(links || [])
      .map((link) => ({
        href: link && link.href ? String(link.href) : "",
        rel: link && link.rel ? String(link.rel).toLowerCase() : ""
      }))
      .filter((link) => link.href && /(^|\s)(apple-touch-icon|apple-touch-icon-precomposed|icon|shortcut icon)(\s|$)/.test(link.rel));

    const appleIcon = candidates.find((link) => link.rel.includes("apple-touch-icon"));
    if (appleIcon) return appleIcon.href;

    const icon = candidates.find((link) => link.rel.includes("icon"));
    return icon ? icon.href : XHS_FAVICON;
  }

  const api = {
    XHS_ORIGIN,
    XHS_FAVICON,
    GENERIC_PROFILE_URL,
    shouldShowFocusPage,
    buildSearchUrl,
    normalizeProfileHref,
    buildFavoritesProfileUrl,
    extractFavoritesProfileUrl,
    pickPreferredIconHref
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  root.XHSFocusCore = api;
})(typeof globalThis !== "undefined" ? globalThis : window);
