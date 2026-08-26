(function () {
  "use strict";

  // =========================================================
  // DEBUG
  // =========================================================

  const DBG = {
    enabled: true,

    log(tag, message) {
      if (!this.enabled) return;
      console.log(`[${tag}] ${message}`);
    },

    warn(tag, message) {
      if (!this.enabled) return;
      console.warn(`[${tag}] ${message}`);
    },

    error(tag, message) {
      console.error(`[${tag}] ${message}`);
    }
  };


  // =========================================================
  // CONFIG
  // =========================================================

  const CONFIG = {
    // GitHub থেকে Key
    keyUrl:
      "https://raw.githubusercontent.com/mehedy4644/1/main/key.txt",

    // GitHub থেকে Telegram link
    telegramUrl:
      "https://raw.githubusercontent.com/mehedy4644/1/main/button.txt",

    // আপনার API — redirect-এর জন্য
    apiBaseUrl:
      "https://lol.a2mbd3.workers.dev",

    musicUrl:
      "https://raw.githubusercontent.com/mehedy4644/1/main/music.mp3",

    logoUrl:
      "https://raw.githubusercontent.com/mehedy4644/1/main/logo.png"
  };


  // =========================================================
  // FETCH TEXT
  // =========================================================

  async function fetchText(url, name) {

    DBG.log("FETCH", `Loading ${name}`);

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(
        `${name}: HTTP ${response.status}`
      );
    }

    const text = (await response.text()).trim();

    if (!text) {
      throw new Error(
        `${name}: empty response`
      );
    }

    return text;
  }


  // =========================================================
  // LOAD GITHUB DATA
  // =========================================================

  async function loadGithubData() {

    const result = {
      key: "",
      telegram: ""
    };

    try {
      result.key = await fetchText(
        CONFIG.keyUrl,
        "GitHub Key"
      );
    } catch (error) {
      DBG.error(
        "GITHUB",
        error.message
      );
    }

    try {
      result.telegram = await fetchText(
        CONFIG.telegramUrl,
        "GitHub Telegram"
      );
    } catch (error) {
      DBG.error(
        "GITHUB",
        error.message
      );
    }

    return result;
  }


  // =========================================================
  // TELEGRAM URL VALIDATION
  // =========================================================

  function normalizeTelegramUrl(value) {

    const url =
      String(value || "").trim();

    if (
      url.startsWith("https://t.me/") ||
      url.startsWith("http://t.me/") ||
      url.startsWith("https://telegram.me/") ||
      url.startsWith("http://telegram.me/")
    ) {
      return url;
    }

    return "";
  }


  // =========================================================
  // API URL
  // =========================================================

  function getApiUrl(path) {

    const base =
      CONFIG.apiBaseUrl.replace(/\/+$/, "");

    const cleanPath =
      String(path || "")
        .replace(/^\/+/, "");

    return `${base}/${cleanPath}`;
  }


  // =========================================================
  // REDIRECT API
  // =========================================================

  async function getRedirectUrl(
    path,
    params = {}
  ) {

    const requestUrl =
      new URL(getApiUrl(path));

    Object.entries(params).forEach(
      ([key, value]) => {

        if (
          value !== undefined &&
          value !== null
        ) {
          requestUrl.searchParams.set(
            key,
            String(value)
          );
        }

      }
    );


    DBG.log(
      "API",
      "Requesting redirect URL"
    );


    const response =
      await fetch(
        requestUrl.toString(),
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
        `Redirect API: HTTP ${response.status}`
      );
    }


    const data =
      await response.json();


    if (
      !data ||
      typeof data.url !== "string"
    ) {

      throw new Error(
        "API did not return a valid URL"
      );
    }


    const redirectUrl =
      data.url.trim();


    if (!redirectUrl) {

      throw new Error(
        "Redirect URL is empty"
      );
    }


    return redirectUrl;
  }


  // =========================================================
  // REDIRECT
  // =========================================================

  async function redirectFromApi(
    path,
    params = {}
  ) {

    try {

      const redirectUrl =
        await getRedirectUrl(
          path,
          params
        );


      DBG.log(
        "REDIRECT",
        "Redirecting"
      );


      window.location.assign(
        redirectUrl
      );


    } catch (error) {

      DBG.error(
        "REDIRECT",
        error.message
      );


      showStatus(
        "REDIRECT FAILED",
        "error"
      );
    }
  }


  // =========================================================
  // STATUS
  // =========================================================

  function showStatus(
    message,
    type = "normal"
  ) {

    const element =
      document.getElementById(
        "mehedy-status"
      );


    if (!element) return;


    element.textContent =
      message;


    if (type === "success") {

      element.style.color =
        "#00ffcc";

    } else if (type === "error") {

      element.style.color =
        "#ff4444";

    } else {

      element.style.color =
        "#64748b";
    }
  }


  // =========================================================
  // UI
  // =========================================================

  function createUI() {

    if (
      document.getElementById(
        "mehedy-auth-box"
      )
    ) {
      return;
    }


    const style =
      document.createElement("style");


    style.textContent = `
      #mehedy-auth-box {
        position:fixed;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        width:300px;
        padding:25px;
        box-sizing:border-box;
        background:#060a17;
        color:#fff;
        border:2px solid #00ffcc;
        border-radius:16px;
        z-index:2147483647;
        font-family:system-ui,sans-serif;
        text-align:center;
        box-shadow:0 20px 50px rgba(0,0,0,.6);
      }

      #mehedy-logo {
        width:100px;
        height:100px;
        object-fit:cover;
        border-radius:15px;
        margin-bottom:15px;
      }

      #mehedy-key-input {
        width:100%;
        box-sizing:border-box;
        padding:12px;
        margin:10px 0;
        border-radius:8px;
        border:1px solid #00ffcc;
        background:#070b19;
        color:#fff;
        text-align:center;
      }

      .mehedy-btn {
        width:100%;
        padding:12px;
        margin-top:8px;
        border:0;
        border-radius:8px;
        cursor:pointer;
        font-weight:bold;
      }

      #mehedy-login-btn {
        background:#00ffcc;
        color:#030712;
      }

      #mehedy-telegram-btn {
        background:#229ed9;
        color:#fff;
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
      >

      <h3>MEHEDY</h3>

      <p>AINCRAD BYPASS</p>

      <input
        id="mehedy-key-input"
        type="text"
        placeholder="ENTER KEY HERE"
      >

      <button
        id="mehedy-login-btn"
        class="mehedy-btn"
      >
        VERIFY KEY
      </button>

      <button
        id="mehedy-telegram-btn"
        class="mehedy-btn"
        disabled
      >
        TELEGRAM
      </button>

      <div
        id="mehedy-status"
        style="margin-top:15px"
      >
        Loading...
      </div>
    `;


    document.body.appendChild(box);
  }


  // =========================================================
  // INITIALIZATION
  // =========================================================

  async function initialize() {

    DBG.log(
      "INIT",
      "Starting script"
    );


    createUI();


    const keyInput =
      document.getElementById(
        "mehedy-key-input"
      );


    const loginButton =
      document.getElementById(
        "mehedy-login-btn"
      );


    const telegramButton =
      document.getElementById(
        "mehedy-telegram-btn"
      );


    /*
     * GitHub data load
     */

    const github =
      await loadGithubData();


    /*
     * Telegram link
     * ONLY GitHub থেকে
     */

    const telegram =
      normalizeTelegramUrl(
        github.telegram
      );


    if (telegram) {

      telegramButton.disabled =
        false;

      telegramButton.addEventListener(
        "click",
        () => {

          window.open(
            telegram,
            "_blank",
            "noopener,noreferrer"
          );

        }
      );

      showStatus(
        "READY",
        "success"
      );

    } else {

      showStatus(
        "TELEGRAM LINK NOT AVAILABLE",
        "error"
      );
    }


    /*
     * Key data
     */

    const validKeys =
      github.key
        .split(/\r?\n/)
        .map(
          value => value.trim()
        )
        .filter(Boolean);


    /*
     * Login
     */

    loginButton.addEventListener(
      "click",
      async () => {

        const entered =
          keyInput.value.trim();


        if (!entered) {

          showStatus(
            "ENTER KEY",
            "error"
          );

          return;
        }


        const valid =
          validKeys.includes(
            entered
          );


        if (!valid) {

          showStatus(
            "INVALID KEY",
            "error"
          );

          return;
        }


        showStatus(
          "KEY VERIFIED",
          "success"
        );


        /*
         * Redirect API
         *
         * এখানে আপনার নিজের API endpoint
         * ব্যবহার করুন।
         */

        await redirectFromApi(
          "redirect",
          {
            key: entered
          }
        );

      }
    );


    DBG.log(
      "INIT",
      "Initialization complete"
    );
  }


  // =========================================================
  // START
  // =========================================================

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initialize
    );

  } else {

    initialize();

  }


  // =========================================================
  // GLOBAL EXPORTS
  // =========================================================

  window.MEHEDY_CONFIG =
    CONFIG;

  window.MEHEDY_DEBUG =
    DBG;

})();