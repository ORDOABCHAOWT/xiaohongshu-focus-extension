(function initXiaohongshuFocusPage() {
  "use strict";

  const core = globalThis.XHSFocusCore;
  if (!core) return;

  const OVERLAY_ID = "xhs-focus-extension-root";
  const STYLE_ID = "xhs-focus-extension-style";

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${OVERLAY_ID} {
        --xhs-focus-main-offset: clamp(-96px, -8vh, -48px);
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        min-height: 100vh;
        overflow: hidden;
        background: #fff;
        color: #111827;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
      }

      #${OVERLAY_ID}::before,
      #${OVERLAY_ID}::after {
        content: "";
        position: absolute;
        z-index: 0;
        border-radius: 50%;
        pointer-events: none;
        will-change: transform;
        animation: xhs-focus-orb-drift 18s ease-in-out infinite alternate;
      }

      #${OVERLAY_ID}::before {
        width: clamp(260px, 30vw, 460px);
        height: clamp(260px, 30vw, 460px);
        left: clamp(-96px, -4vw, -42px);
        top: clamp(-96px, -4vw, -42px);
        background: radial-gradient(circle, rgba(255, 54, 84, 0.22) 0%, rgba(255, 92, 120, 0.12) 38%, rgba(255, 92, 120, 0.035) 62%, rgba(255, 92, 120, 0) 78%);
        filter: blur(10px);
        opacity: 0.9;
      }

      #${OVERLAY_ID}::after {
        width: clamp(560px, 54vw, 820px);
        height: clamp(560px, 54vw, 820px);
        right: clamp(-108px, -6vw, -72px);
        bottom: clamp(-150px, -8vw, -92px);
        background: radial-gradient(circle, rgba(255, 112, 72, 0.42) 0%, rgba(255, 150, 94, 0.26) 32%, rgba(255, 190, 150, 0.12) 56%, rgba(255, 190, 150, 0) 78%);
        filter: blur(12px);
        opacity: 0.98;
      }

      #${OVERLAY_ID} * {
        box-sizing: border-box;
      }

      #${OVERLAY_ID} .xhs-focus-topbar {
        height: 72px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 28px;
        border-bottom: 0;
        background: transparent;
        position: relative;
        z-index: 2;
      }

      #${OVERLAY_ID} .xhs-focus-avatar-link {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        display: block;
        text-decoration: none;
        overflow: hidden;
        background: linear-gradient(135deg, #ff7182, #ffc063);
        box-shadow: 0 0 0 2px #fff, 0 0 0 3px rgba(255, 36, 66, 0.16);
      }

      #${OVERLAY_ID} .xhs-focus-avatar-link img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      #${OVERLAY_ID} .xhs-focus-body {
        min-height: calc(100vh - 72px);
        position: relative;
        display: grid;
        place-items: center;
        overflow: hidden;
        padding: 56px 24px 132px;
        background: transparent;
        z-index: 1;
      }

      #${OVERLAY_ID} .xhs-focus-body::before {
        content: none;
      }

      #${OVERLAY_ID} .xhs-focus-main {
        width: min(600px, 100%);
        text-align: center;
        position: relative;
        z-index: 2;
        transform: translateY(var(--xhs-focus-main-offset));
      }

      #${OVERLAY_ID} .xhs-focus-logo {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 56px;
        height: 56px;
        padding: 0;
        border-radius: 16px;
        overflow: hidden;
        background: #ff2442;
        margin: 0 auto 30px;
        box-shadow:
          0 12px 26px rgba(255, 36, 66, 0.14),
          0 0 0 1px rgba(255, 255, 255, 0.9);
      }

      #${OVERLAY_ID} .xhs-focus-logo img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }

      #${OVERLAY_ID} .xhs-focus-search {
        height: 58px;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 0 9px 0 18px;
        border: 1px solid rgba(255, 255, 255, 0.72);
        border-radius: 999px;
        background:
          linear-gradient(135deg, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.5)),
          rgba(255, 255, 255, 0.58);
        box-shadow:
          0 16px 38px rgba(31, 41, 55, 0.09),
          inset 0 1px 0 rgba(255, 255, 255, 0.95),
          inset 0 -1px 0 rgba(255, 255, 255, 0.42);
        -webkit-backdrop-filter: blur(18px) saturate(150%);
        backdrop-filter: blur(18px) saturate(150%);
      }

      #${OVERLAY_ID} .xhs-focus-icon {
        width: 15px;
        height: 15px;
        border: 2px solid rgba(82, 91, 105, 0.74);
        border-radius: 50%;
        position: relative;
        flex: 0 0 auto;
      }

      #${OVERLAY_ID} .xhs-focus-icon::after {
        content: "";
        position: absolute;
        width: 7px;
        height: 2px;
        right: -5px;
        bottom: -3px;
        border-radius: 2px;
        background: rgba(82, 91, 105, 0.74);
        transform: rotate(45deg);
      }

      #${OVERLAY_ID} .xhs-focus-input {
        flex: 1;
        min-width: 0;
        height: 100%;
        border: 0;
        outline: 0;
        background: transparent;
        color: #111827;
        font: inherit;
        font-size: 15px;
      }

      #${OVERLAY_ID} .xhs-focus-input::placeholder {
        color: rgba(74, 85, 104, 0.78);
      }

      #${OVERLAY_ID} .xhs-focus-button {
        height: 40px;
        min-width: 72px;
        border: 0;
        border-radius: 999px;
        background: rgba(255, 36, 66, 0.86);
        color: #fff;
        font: inherit;
        font-size: 14px;
        font-weight: 650;
        cursor: pointer;
        box-shadow:
          0 10px 24px rgba(255, 36, 66, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.38);
      }

      #${OVERLAY_ID} .xhs-focus-empty {
        margin-top: 24px;
        color: rgba(107, 114, 128, 0.76);
        font-size: 13px;
      }

      #${OVERLAY_ID} .xhs-focus-art {
        position: absolute;
        inset: auto 0 0;
        height: clamp(110px, 14vh, 150px);
        overflow: hidden;
        z-index: 0;
        pointer-events: none;
      }

      #${OVERLAY_ID} .xhs-focus-art-image {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        object-position: center bottom;
        opacity: 0.08;
        filter: saturate(0.7) brightness(1.08) blur(1px);
        transform: translate3d(-1%, 8%, 0) scale(1.02);
        transform-origin: center bottom;
        animation: xhs-focus-art-flow 42s ease-in-out infinite alternate;
        -webkit-mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.12) 18%,
          rgba(0, 0, 0, 0.58) 40%,
          rgba(0, 0, 0, 1) 66%,
          rgba(0, 0, 0, 1) 100%
        );
        mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.12) 18%,
          rgba(0, 0, 0, 0.58) 40%,
          rgba(0, 0, 0, 1) 66%,
          rgba(0, 0, 0, 1) 100%
        );
      }

      @keyframes xhs-focus-orb-drift {
        0% {
          transform: translate3d(0, 0, 0) scale(1);
        }
        50% {
          transform: translate3d(-10px, 8px, 0) scale(1.025);
        }
        100% {
          transform: translate3d(12px, -10px, 0) scale(1.045);
        }
      }

      @keyframes xhs-focus-art-flow {
        0% {
          transform: translate3d(-1%, 8%, 0) scale(1.02);
          opacity: 0.06;
        }
        100% {
          transform: translate3d(1%, 7%, 0) scale(1.03);
          opacity: 0.1;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        #${OVERLAY_ID}::before,
        #${OVERLAY_ID}::after,
        #${OVERLAY_ID} .xhs-focus-art-image {
          animation: none;
        }
      }

      @media (max-width: 640px) {
        #${OVERLAY_ID} {
          --xhs-focus-main-offset: -22px;
        }

        #${OVERLAY_ID} .xhs-focus-topbar {
          padding: 0 18px;
        }

        #${OVERLAY_ID}::before {
          width: 260px;
          height: 260px;
          left: -82px;
          top: -78px;
          opacity: 0.86;
        }

        #${OVERLAY_ID}::after {
          width: 520px;
          height: 520px;
          right: -174px;
          bottom: -160px;
          opacity: 1;
        }

        #${OVERLAY_ID} .xhs-focus-body {
          align-items: start;
          padding-top: 22vh;
          padding-bottom: 112px;
        }

        #${OVERLAY_ID} .xhs-focus-art {
          height: 110px;
          bottom: -26px;
        }
      }
    `;
    document.documentElement.append(style);
  }

  function getAvatarSource() {
    const candidates = Array.from(document.images || []);
    const avatar = candidates.find((image) => {
      const src = image.currentSrc || image.src || "";
      const text = `${image.alt || ""} ${image.className || ""}`.toLowerCase();
      return src && (/avatar|profile|user/.test(src) || /头像|avatar|profile|user/.test(text));
    });
    return avatar ? avatar.currentSrc || avatar.src : "";
  }

  function getProfileHref() {
    const overlay = document.getElementById(OVERLAY_ID);
    const pageAnchors = Array.from(
      document.querySelectorAll('a[href*="/user/profile/"]')
    ).filter((anchor) => !overlay || !overlay.contains(anchor));
    return core.extractFavoritesProfileUrl(pageAnchors);
  }

  function getSiteIconHref() {
    if (globalThis.chrome && chrome.runtime && typeof chrome.runtime.getURL === "function") {
      return chrome.runtime.getURL("assets/xhs-icon.png");
    }

    return core.pickPreferredIconHref(
      Array.from(document.querySelectorAll('link[rel~="icon"], link[rel~="apple-touch-icon"], link[rel~="apple-touch-icon-precomposed"]'))
    );
  }

  function getBottomBackgroundHref() {
    if (globalThis.chrome && chrome.runtime && typeof chrome.runtime.getURL === "function") {
      return chrome.runtime.getURL("assets/bottom-bg-openai-b.png");
    }

    return "../assets/bottom-bg-openai-b.png";
  }

  function setNativeSearchValue(keyword) {
    const inputs = Array.from(document.querySelectorAll("input"));
    const nativeInput = inputs.find((input) => {
      const hint = `${input.placeholder || ""} ${input.getAttribute("aria-label") || ""}`;
      return /搜索/.test(hint);
    });

    if (!nativeInput) return false;

    nativeInput.value = keyword;
    nativeInput.dispatchEvent(new Event("input", { bubbles: true }));
    nativeInput.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  }

  function search(keyword) {
    const url = core.buildSearchUrl(keyword);
    if (!url) return;

    setNativeSearchValue(String(keyword || "").trim());
    window.location.assign(url.toString());
  }

  function refreshAvatarLink() {
    const root = document.getElementById(OVERLAY_ID);
    if (!root) return;

    const link = root.querySelector(".xhs-focus-avatar-link");
    if (!link) return;

    link.href = getProfileHref();

    const avatarSrc = getAvatarSource();
    const image = link.querySelector("img");
    if (avatarSrc && image) {
      image.src = avatarSrc;
    } else if (avatarSrc) {
      const nextImage = document.createElement("img");
      nextImage.alt = "我的头像";
      nextImage.src = avatarSrc;
      link.append(nextImage);
    }
  }

  function render() {
    if (!core.shouldShowFocusPage(window.location.href)) {
      const existing = document.getElementById(OVERLAY_ID);
      if (existing) existing.remove();
      return;
    }

    ensureStyle();

    let root = document.getElementById(OVERLAY_ID);
    if (!root) {
      root = document.createElement("div");
      root.id = OVERLAY_ID;
      root.setAttribute("role", "main");
      root.setAttribute("aria-label", "小红书专注搜索页");
      document.documentElement.append(root);
    }

    const avatarSrc = getAvatarSource();
    const avatarImage = avatarSrc ? `<img alt="我的头像" src="${avatarSrc}">` : "";
    const siteIconHref = getSiteIconHref();
    const bottomBackgroundHref = getBottomBackgroundHref();

    root.innerHTML = `
      <div class="xhs-focus-topbar">
        <a class="xhs-focus-avatar-link" href="${getProfileHref()}" aria-label="打开我的小红书主页">${avatarImage}</a>
      </div>
      <div class="xhs-focus-body">
        <div class="xhs-focus-main">
          <div class="xhs-focus-logo" aria-label="小红书">
            <img alt="小红书" src="${siteIconHref}">
          </div>
          <form class="xhs-focus-search" autocomplete="off">
            <span class="xhs-focus-icon" aria-hidden="true"></span>
            <input class="xhs-focus-input" name="keyword" type="search" placeholder="搜索小红书" autofocus>
            <button class="xhs-focus-button" type="submit">搜索</button>
          </form>
          <div class="xhs-focus-empty">推荐内容已隐藏</div>
        </div>
        <div class="xhs-focus-art" aria-hidden="true">
          <img class="xhs-focus-art-image" alt="" src="${bottomBackgroundHref}" loading="eager">
        </div>
      </div>
    `;

    const form = root.querySelector("form");
    const input = root.querySelector("input");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      search(input.value);
    });

    window.requestAnimationFrame(() => input.focus({ preventScroll: true }));
  }

  function patchHistory(methodName) {
    const original = history[methodName];
    history[methodName] = function patchedHistoryMethod() {
      const result = original.apply(this, arguments);
      window.dispatchEvent(new Event("xhs-focus-location-change"));
      return result;
    };
  }

  function scheduleRender() {
    window.requestAnimationFrame(render);
  }

  patchHistory("pushState");
  patchHistory("replaceState");
  window.addEventListener("popstate", scheduleRender);
  window.addEventListener("xhs-focus-location-change", scheduleRender);
  document.addEventListener("DOMContentLoaded", render, { once: true });

  const observer = new MutationObserver(() => {
    if (!core.shouldShowFocusPage(window.location.href)) return;

    if (!document.getElementById(OVERLAY_ID)) {
      scheduleRender();
    } else {
      refreshAvatarLink();
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
  render();
})();
