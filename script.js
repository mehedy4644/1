(function () {
  "use strict";

  /* =========================================================
     MEHEDY SCRIPT
     ========================================================= */

  const DBG = {
    enabled: true,

    log: function (tag, message) {
      if (!this.enabled) return;
      console.log("[MEHEDY:" + tag + "] " + message);
    },

    warn: function (tag, message) {
      if (!this.enabled) return;
      console.warn("[MEHEDY:" + tag + "] " + message);
    },

    error: function (tag, message) {
      console.error("[MEHEDY:" + tag + "] " + message);
    }
  };


  /* =========================================================
     BOOKMARK CHECK
     ========================================================= */

  if (window.MEHEDY_BOOKMARK_LOAD !== true) {
    DBG.warn(
      "ACCESS",
      "MEHEDY_BOOKMARK_LOAD is not enabled."
    );
    return;
  }


  /* =========================================================
     CONFIG
     ========================================================= */

  const CONFIG = {

    keyUrl:
      "https://raw.githubusercontent.com/mehedy4644/1/main/key.txt",

    telegramUrl:
      "https://raw.githubusercontent.com/mehedy4644/1/main/button.txt",

    logoUrl:
      "https://raw.githubusercontent.com/mehedy4644/1/main/logo.png",

    musicUrl:
      "https://raw.githubusercontent.com/mehedy4644/1/main/music.mp3",

    apiBaseUrl:
      "https://lol.a2mbd3.workers.dev"
  };


  /* =========================================================
     HELPERS
     ========================================================= */

  function getElement(id) {
    return document.getElementById(id);
  }


  function setStatus(message, type) {

    const el = getElement("mehedy-status");

    if (!el) return;

    el.textContent = message;

    if (type === "success") {
      el.style.color = "#00ffcc";
    } else if (type === "error") {
      el.style.color = "#ff4d4d";
    } else {
      el.style.color = "#94a3b8";
    }
  }


  async function fetchText(url, name) {

    DBG.log(
      "FETCH",
      "Loading " + name
    );

    const separator =
      url.indexOf("?") >= 0 ? "&" : "?";

    const response = await fetch(
      url + separator + "t=" + Date.now(),
      {
        method: "GET",
        cache: "no-store"
      }
    );

    if (!response.ok) {
      throw new Error(
        name +
        " HTTP " +
        response.status
      );
    }

    const text =
      (await response.text()).trim();

    if (!text) {
      throw new Error(
        name + " is empty"
      );
    }

    return text;
  }


  /* =========================================================
     TELEGRAM URL
     ========================================================= */

  function validTelegramUrl(value) {

    const url =
      String(value || "").trim();

    if (
      url.indexOf("https://t.me/") === 0 ||
      url.indexOf("http://t.me/") === 0 ||
      url.indexOf("https://telegram.me/") === 0 ||
      url.indexOf("http://telegram.me/") === 0
    ) {
      return url;
    }

    return "";
  }


  /* =========================================================
     LOAD GITHUB CONFIG
     ========================================================= */

  async function loadConfig() {

    const result = {
      keys: [],
      telegram: ""
    };


    /* -------------------------
       KEY
       ------------------------- */

    try {

      const rawKey =
        await fetchText(
          CONFIG.keyUrl,
          "GitHub key.txt"
        );


      result.keys =
        rawKey
          .split(/\r?\n/)
          .map(function (x) {
            return x.trim();
          })
          .filter(function (x) {
            return x.length > 0;
          });


      DBG.log(
        "KEY",
        result.keys.length +
        " key(s) loaded"
      );

    } catch (error) {

      DBG.error(
        "KEY",
        error.message
      );
    }


    /* -------------------------
       TELEGRAM
       ------------------------- */

    try {

      const rawTelegram =
        await fetchText(
          CONFIG.telegramUrl,
          "GitHub button.txt"
        );


      result.telegram =
        validTelegramUrl(
          rawTelegram
        );


      if (!result.telegram) {

        throw new Error(
          "Invalid Telegram URL"
        );
      }


      DBG.log(
        "TELEGRAM",
        "Telegram URL loaded"
      );

    } catch (error) {

      DBG.error(
        "TELEGRAM",
        error.message
      );
    }


    return result;
  }


  /* =========================================================
     CREATE UI
     ========================================================= */

  function createUI() {

    const old =
      getElement("mehedy-auth-box");

    if (old) {
      old.remove();
    }


    const style =
      document.createElement("style");


    style.id =
      "mehedy-style";


    style.textContent = `

      @keyframes mehedyGlow {

        0% {
          box-shadow:
            0 0 5px #00ffcc,
            0 0 10px #00ffcc;
        }

        50% {
          box-shadow:
            0 0 20px #00ffcc,
            0 0 40px #00ffcc;
        }

        100% {
          box-shadow:
            0 0 5px #00ffcc,
            0 0 10px #00ffcc;
        }

      }


      #mehedy-auth-box {

        position: fixed;

        top: 50%;
        left: 50%;

        transform:
          translate(-50%, -50%);

        width: 320px;
        max-width: 90vw;

        padding: 25px;

        box-sizing: border-box;

        background:
          rgba(6, 10, 23, .97);

        color: #fff;

        border:
          2px solid #00ffcc;

        border-radius:
          16px;

        z-index:
          2147483647;

        font-family:
          system-ui,
          -apple-system,
          BlinkMacSystemFont,
          "Segoe UI",
          sans-serif;

        text-align:
          center;

        animation:
          mehedyGlow 3s
          linear infinite;

      }


      #mehedy-logo {

        width: 110px;
        height: 110px;

        object-fit: cover;

        border-radius: 16px;

        border:
          2px solid #00ffcc;

        margin-bottom: 15px;

      }


      #mehedy-key-input {

        width: 100%;

        box-sizing: border-box;

        padding: 12px;

        margin:
          12px 0;

        border:
          1px solid
          rgba(0,255,204,.5);

        border-radius: 8px;

        outline: none;

        background:
          rgba(0,0,0,.35);

        color: #fff;

        text-align: center;

        font-size: 14px;

      }


      .mehedy-button {

        width: 100%;

        padding: 12px;

        margin-top: 8px;

        border: none;

        border-radius: 8px;

        font-weight: 700;

        cursor: pointer;

        transition:
          opacity .2s,
          transform .2s;

      }


      .mehedy-button:active {

        transform:
          scale(.98);

      }


      #mehedy-login-btn {

        background: #00ffcc;

        color: #03110e;

      }


      #mehedy-telegram-btn {

        background: #229ed9;

        color: white;

      }


      #mehedy-telegram-btn:disabled {

        opacity: .45;

        cursor: not-allowed;

      }


      #mehedy-status {

        margin-top: 15px;

        min-height: 18px;

        font-size: 12px;

        color: #94a3b8;

      }

    `;


    document.head.appendChild(style);


    const box =
      document.createElement("div");


    box.id =
      "mehedy-auth-box";


    box.innerHTML = `

      <img
        id="mehedy-logo"
        src="${CONFIG.logoUrl}"
        alt="Logo"
      >

      <h3
        style="
          margin:0;
          color:#00ffcc;
          font-size:20px;
        "
      >
        MEHEDY
      </h3>

      <p
        style="
          color:#64748b;
          font-size:11px;
          letter-spacing:2px;
        "
      >
        AUTHENTICATION
      </p>

      <input
        id="mehedy-key-input"
        type="text"
        autocomplete="off"
        placeholder="ENTER KEY"
      >

      <button
        id="mehedy-login-btn"
        class="mehedy-button"
      >
        VERIFY KEY
      </button>

      <button
        id="mehedy-telegram-btn"
        class="mehedy-button"
        disabled
      >
        TELEGRAM
      </button>

      <div id="mehedy-status">
        Loading...
      </div>

    `;


    document.body.appendChild(box);
  }


  /* =========================================================
     MUSIC
     ========================================================= */

  function setupMusic() {

    const audio =
      document.createElement("audio");

    audio.src =
      CONFIG.musicUrl;

    audio.loop = true;

    audio.preload = "none";

    window.MEHEDY_AUDIO =
      audio;


    document.addEventListener(
      "click",
      function startMusic() {

        audio.play()
          .catch(function () {});

        document.removeEventListener(
          "click",
          startMusic
        );

      },
      {
        once: true
      }
    );
  }


  /* =========================================================
     API REDIRECT
     ========================================================= */

  async function getRedirectFromApi(
    endpoint,
    params
  ) {

    const base =
      CONFIG.apiBaseUrl
        .replace(/\/+$/, "");


    const path =
      String(endpoint || "")
        .replace(/^\/+/, "");


    const url =
      new URL(
        base + "/" + path
      );


    if (params) {

      Object.keys(params)
        .forEach(function (key) {

          const value =
            params[key];

          if (
            value !== undefined &&
            value !== null
          ) {

            url.searchParams.set(
              key,
              String(value)
            );
          }

        });
    }


    DBG.log(
      "API",
      "Requesting redirect"
    );


    const response =
      await fetch(
        url.toString(),
        {
          method: "GET",
          cache: "no-store",
          headers: {
            "Accept":
              "application/json"
          }
        }
      );


    if (!response.ok) {

      throw new Error(
        "API HTTP " +
        response.status
      );
    }


    const data =
      await response.json();


    if (
      !data ||
      typeof data.url !== "string"
    ) {

      throw new Error(
        "API response does not contain url"
      );
    }


    const destination =
      data.url.trim();


    if (!destination) {

      throw new Error(
        "API returned empty URL"
      );
    }


    /*
     * Redirect destination API থেকেই
     * এসেছে।
     */

    return destination;
  }


  async function performRedirect(
    key
  ) {

    try {

      setStatus(
        "Getting redirect...",
        "normal"
      );


      /*
       * এখানে আপনার নিজের API endpoint।
       */

      const destination =
        await getRedirectFromApi(
          "redirect",
          {
            key: key
          }
        );


      /*
       * API থেকে পাওয়া URL-এ redirect।
       */

      window.location.assign(
        destination
      );


    } catch (error) {

      DBG.error(
        "REDIRECT",
        error.message
      );


      setStatus(
        "REDIRECT FAILED",
        "error"
      );
    }
  }


  /* =========================================================
     MAIN
     ========================================================= */

  async function main() {

    try {

      DBG.log(
        "INIT",
        "Starting"
      );


      createUI();


      setupMusic();


      const keyInput =
        getElement(
          "mehedy-key-input"
        );


      const loginButton =
        getElement(
          "mehedy-login-btn"
        );


      const telegramButton =
        getElement(
          "mehedy-telegram-btn"
        );


      const config =
        await loadConfig();


      /* -------------------------
         Telegram
         ----------------