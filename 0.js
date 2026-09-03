(function () {
  "use strict";
 
  const CONFIG = {
    key: "",
    telegram: "https://t.me/mehedy4644",
    m: "https://raw.githubusercontent.com/mehedy4644/1/main/0.mp3",
    l: "https://raw.githubusercontent.com/mehedy4644/1/main/0.png",
    s: `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
        background:rgba(6,10,23,0.95);backdrop-filter:blur(12px);
        -webkit-backdrop-filter:blur(12px);color:#fff;padding:30px 25px;
        border-radius:16px;z-index:2147483647;
        font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
        text-align:center;box-shadow:0 20px 50px rgba(0,0,0,0.6);
        border:2px solid #00ffcc;width:300px;box-sizing:border-box;
        animation: mehedy-lightning-glow 3s linear infinite;`,
  };

  let audioPlayer = null;
 
 
 
 
  (async function () {
    const existingBox = document.getElementById("mehedy-auth-box");
    if (existingBox) existingBox.remove();
 
 
 
 
    const styleEl = document.createElement("style");
    styleEl.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
      @keyframes mehedy-lightning-glow {
        0%   { box-shadow: 0 0 5px #00ffcc, 0 0 10px #00ffcc, inset 0 0 5px rgba(0,255,204,0.2);  border-color: #00ffcc; }
        25%  { box-shadow: 0 0 15px #00e6b8, 0 0 25px #00ffcc, inset 0 0 10px rgba(0,255,204,0.4); border-color: #00e6b8; }
        30%  { box-shadow: 0 0 8px #00ffcc,  0 0 12px #00ffcc, inset 0 0 6px rgba(0,255,204,0.3);  border-color: #00ffcc; }
        35%  { box-shadow: 0 0 25px #00ffff, 0 0 40px #00ffcc, inset 0 0 15px rgba(0,255,204,0.5); border-color: #00ffff; }
        70%  { box-shadow: 0 0 15px #00e6b8, 0 0 25px #00ffcc, inset 0 0 10px rgba(0,255,204,0.4); border-color: #00e6b8; }
        73%  { box-shadow: 0 0 5px #00ffcc,  0 0 10px #00ffcc, inset 0 0 5px rgba(0,255,204,0.2);  border-color: #00ffcc; }
        100% { box-shadow: 0 0 5px #00ffcc,  0 0 10px #00ffcc, inset 0 0 5px rgba(0,255,204,0.2);  border-color: #00ffcc; }
      }
      @keyframes mehedy-spin {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes mehedy-fire-spin {
        0%   { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
      }
      
      #mehedy-logo-card{

width:120px;

height:120px;

margin:0 auto 18px;

border-radius:16px;

overflow:hidden;

border:2px solid #00ffcc;

animation:mehedy-lightning-glow 3s linear infinite;

box-sizing:border-box;

}

#mehedy-logo{

width:100%;

height:100%;

display:block;

object-fit:cover;

}
      
    `;
    document.head.appendChild(styleEl);
 
 
 
 
    const authBox = document.createElement("div");
    authBox.id = "mehedy-auth-box";
    authBox.style.cssText = CONFIG.s;
    authBox.innerHTML = `
      <button id="mehedy-music-btn" style="
        position:absolute;top:15px;right:15px;
        background:rgba(255,255,255,0.05);border:1px solid rgba(0,255,204,0.3);
        color:#ff4444;border-radius:50%;width:32px;height:32px;
        cursor:pointer;font-size:14px;display:flex;align-items:center;
        justify-content:center;box-shadow:0 0 8px rgba(0,0,0,0.3);
        transition:all 0.3s ease;z-index:10;">🔇</button>
        
        <div id="mehedy-logo-card">

<img src="${CONFIG.l}" id="mehedy-logo">

</div>

      <h3 style="margin:0 0 6px 0;color:#00ffcc;font-size:20px;letter-spacing:1.5px;
                 font-weight:800;text-shadow:0 0 12px rgba(0,255,204,0.5);">
        Ꮇᴇͥʜͣᴇͫᴅƴ
      </h3>
      <p style="margin:0 0 20px 0;color:#64748b;font-size:11px;letter-spacing:2px;font-weight:600;">
        AINCRAD BYPASS
      </p>

      <input type="text" id="mehedy-key-input"
      display:none;
      placeholder="ENTER KEY HERE" style="width:100%;padding:12px;margin-bottom:16px;
        border:1px solid rgba(0,255,204,0.4);border-radius:8px;
        background:rgba(7,11,25,0.6);color:#fff;text-align:center;
        box-sizing:border-box;font-size:13px;font-weight:600;
        letter-spacing:1px;outline:none;transition:all 0.3s ease;
        box-shadow:inset 0 2px 4px rgba(0,0,0,0.5);">

      <button id="mehedy-login-btn" style="
        width:100%;background:#00ffcc;color:#030712;border:none;
        padding:12px;border-radius:8px;font-weight:700;cursor:pointer;
        font-size:14px;letter-spacing:0.5px;margin-bottom:12px;
        box-shadow:0 4px 12px rgba(0,255,204,0.3);transition:all 0.2s ease;">GET KEY</button>

      <button id="mehedy-telegram-btn" style="
      display:none;
        width:100%;background:#229ED9;color:#fff;border:none;
        padding:12px;border-radius:8px;font-weight:700;cursor:pointer;
        font-size:14px;letter-spacing:0.5px;
        box-shadow:0 4px 12px rgba(34,158,217,0.25);">TELEGRAM</button>

      <div id="mehedy-status" style="margin-top:16px;font-size:11px;font-weight:700;
                                   color:#64748b;letter-spacing:1.5px;">Telegram : @mehedy4644</div>
    `;
    document.body.appendChild(authBox);

 
 
 
 
    const musicBtn    = document.getElementById("mehedy-music-btn");
    const keyInput    = document.getElementById("mehedy-key-input");
    const loginBtn    = document.getElementById("mehedy-login-btn");
    const telegramBtn = document.getElementById("mehedy-telegram-btn");
    const statusEl   = document.getElementById("mehedy-status");
 
  
 // Auto load saved key
const savedKey = localStorage.getItem("userKey");

if (savedKey !== null) {
    keyInput.value = savedKey;
}
 
    setTimeout(() => {
      authBox.style.zIndex = "2147483647";
      if (window.innerWidth < 600) {
        authBox.style.width    = "90%";
        authBox.style.maxWidth = "300px";
      }
    }, 10);

 
 
 
 
    const FALLBACK_MUSIC_URL = "https://raw.githubusercontent.com/mehedy4644/1/main/0.mp3";
    let musicLoading = false;
    musicBtn.addEventListener("click", async () => {
      if (musicLoading) return;
      if (!audioPlayer) {
        musicLoading = true;
        musicBtn.textContent = "⏳";
        let resolvedUrl = FALLBACK_MUSIC_URL;
        try {
          const res      = await fetch(CONFIG.m + "&t=" + Date.now());
          const audioUrl = (await res.text()).trim();
          if (audioUrl && audioUrl.startsWith("http")) {
            resolvedUrl = audioUrl;
          } else {
            console.log("Invalid audio URL in music, using fallback.");
          }
        } catch (err) {
          console.log("Failed to fetch music URL, using fallback:", err);
        }
        audioPlayer      = new Audio(resolvedUrl);
        audioPlayer.loop = true;
        musicLoading = false;
      }

 
 
 
 
      if (audioPlayer.paused) {
        audioPlayer.play()
          .then(() => {
            musicBtn.textContent       = "🔊";
            musicBtn.style.color       = "#00ffcc";
            musicBtn.style.borderColor = "#00ffcc";
            musicBtn.style.boxShadow   = "0 0 10px rgba(0,255,204,0.4)";
          })
          .catch(err => {
            console.log("Playback failed:", err);
            musicBtn.textContent = "🔇";
          });
      } else {
        audioPlayer.pause();
        musicBtn.textContent       = "🔇";
        musicBtn.style.color       = "#ff4444";
        musicBtn.style.borderColor = "rgba(0,255,204,0.3)";
        musicBtn.style.boxShadow   = "0 0 8px rgba(0,0,0,0.3)";
      }
    });

 
 
 
 
    keyInput.addEventListener("focus", () => {
      keyInput.style.border    = "1px solid #00ffcc";
      keyInput.style.boxShadow = "0 0 10px rgba(0,255,204,0.25), inset 0 2px 4px rgba(0,0,0,0.5)";
    });
    keyInput.addEventListener("blur", () => {
      keyInput.style.border    = "1px solid rgba(0,255,204,0.4)";
      keyInput.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.5)";
    });

 

telegramBtn.addEventListener("click", () => {
  window.open(CONFIG.telegram, "_blank");
});


 
    loginBtn.addEventListener("click", async () => {
      const inputKey = keyInput.value.trim();

localStorage.setItem("userKey", inputKey);

      statusEl.innerHTML = "<span style='color:#00ffcc; text-shadow:0 0 8px rgba(0,255,204,0.3);'>CONNECTING SERVER...</span>";
      loginBtn.disabled = telegramBtn.disabled = true;
      try {
      
if (inputKey === CONFIG.key) {

          statusEl.innerHTML = "<span style='color:#00ffcc;'>SUCCESS! ✓</span>";

          setTimeout(async () => {
            authBox.remove();

            // Overlay: Checking Update
            const loadingOverlay = document.createElement("div");
            loadingOverlay.style.cssText = `
              position:fixed; top:0; left:0; width:100%; height:100%;
              background:rgba(3,7,18,0.85); backdrop-filter:blur(8px);
              -webkit-backdrop-filter:blur(8px); z-index:2147483647;
              display:flex; align-items:center; justify-content:center;
              font-family:system-ui,-apple-system,sans-serif;
            `;
            loadingOverlay.innerHTML = `
              <div style="text-align:center; background:rgba(6,10,23,0.95);
                          padding:35px 30px; border-radius:16px;
                          border:1px solid #00ffcc; width:290px;
                          animation: mehedy-lightning-glow 3s linear infinite;">
                <div style="width:45px; height:45px;
                            border:4px solid rgba(0,255,204,0.1);
                            border-top:4px solid #00ffcc; border-radius:50%;
                            margin:0 auto 20px auto;
                            animation:mehedy-spin 0.8s linear infinite;
                            box-shadow:0 0 15px rgba(0,255,204,0.2);"></div>
                <p id="mehedy-check-text" style="color:#00ffcc; font-size:15px;
                   font-weight:700; margin:0; letter-spacing:1.5px;
                   text-shadow:0 0 8px rgba(0,255,204,0.3);">CHECKING UPDATE...</p>
              </div>
            `;
            document.body.appendChild(loadingOverlay);
let hasUpdate = false;

try {
  const updateRes = await fetch(
    "https://raw.githubusercontent.com/mehedy4644/1/main/0.txt?t=" + Date.now(),
    { cache: "no-store" }
  );

  const currentVersion = (await updateRes.text()).trim();
  const savedVersion = localStorage.getItem("github_version");

  if (savedVersion === null) {
    // প্রথমবার চালু হলে শুধু সেভ করবে, আপডেট দেখাবে না
    localStorage.setItem("github_version", currentVersion);
  } else if (savedVersion !== currentVersion) {
    // নতুন আপডেট পাওয়া গেছে
    hasUpdate = true;
    localStorage.setItem("github_version", currentVersion);
  }

} catch (e) {
  console.error("Version check failed:", e);
}
const checkText = document.getElementById("mehedy-check-text");

await new Promise(res => setTimeout(res, 5000));

checkText.innerHTML = hasUpdate
  ? "<span style='color:#00ffcc;'>Link Updated Successfully! ✓</span>"
  : "<span style='color:#ff4444; text-shadow:0 0 8px rgba(255,68,68,0.3);'>No Update Available!</span>";

await new Promise(res => setTimeout(res, 5000));

// Update result দেখানোর সাথে সাথেই checking overlay সরবে
loadingOverlay.remove();

// API redirect + countdown
let redirectUrl = "";
let apiFinished = false;
let apiError = null;

const totalSeconds = 70;
let remaining = totalSeconds;
const DASH_TOTAL = 760;


// ==============================
// COUNTDOWN ANIMATION START
// ==============================

const countdownOverlay = document.createElement("div");

countdownOverlay.style.cssText = `
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background:rgba(3,7,18,0.05);
  backdrop-filter:blur(1px);
  -webkit-backdrop-filter:blur(1px);
  z-index:2147483647;
  display:flex;
  align-items:center;
  justify-content:center;
  font-family:system-ui,-apple-system,sans-serif;
`;

countdownOverlay.innerHTML = `
  <div style="text-align:center;">

    <div style="
      position:relative;
      width:250px;
      height:250px;
      margin:0 auto;
      display:flex;
      align-items:center;
      justify-content:center;
    ">

      <svg width="240" height="240"
           style="transform:rotate(0deg);
                  position:relative;
                  z-index:3;">

        <path id="progress"
          d="M215 120
             L215 199
             Q215 215 199 215
             L41 215
             Q25 215 25 199
             L25 41
             Q25 25 41 25
             L199 25
             Q215 25 215 41
             L215 120"
          fill="none"
          stroke="#00ffcc"
          stroke-width="14"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="760"
          stroke-dashoffset="760"
          style="
            filter:drop-shadow(0 0 8px #00ffcc);
            transition:stroke-dashoffset 1s linear;
          ">
        </path>

      </svg>

      <div style="
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        width:190px;
        height:190px;
        border-radius:16px;
        overflow:hidden;
        border:2px solid #00ffcc;
        box-sizing:border-box;
        animation:mehedy-lightning-glow 3s linear infinite;
        z-index:2;
      ">

        <img src="${CONFIG.l}" style="
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
        ">

      </div>

      <div id="countdown-text" style="
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        font-family:'Share Tech Mono',monospace;
        font-size:70px;
        font-weight:400;
        letter-spacing:3px;
        color:#00ffcc;
        text-shadow:
          0 0 10px #00ffcc,
          0 0 20px #00ffcc;
        z-index:4;
      ">${totalSeconds}</div>

    </div>

    <p style="
      margin-top:30px;
      color:#00ffcc;
      font-size:16px;
      font-weight:700;
      letter-spacing:3px;
      text-shadow:0 0 12px rgba(0,255,204,0.4);
      position:relative;
      z-index:4;
    ">REDIRECTING...</p>

  </div>
`;

document.body.appendChild(countdownOverlay);


// ==============================
// START API REQUEST
// ==============================

(async function () {

  try {

    const secret = "DONOTSTOLEBROJCFFVGCDDCXSG";
    const apiBaseUrl = "https://lol.a2mbd3.workers.dev";
    const apiKey = "abdullah";
    const apiType = "2";

    function base32ToBytes(base32) {

      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

      base32 = base32
        .toUpperCase()
        .replace(/=+$/, "");

      let bits = "";

      for (const ch of base32) {

        const v = alphabet.indexOf(ch);

        if (v < 0)
          throw new Error("Invalid base32");

        bits += v.toString(2).padStart(5, "0");
      }

      const bytes = [];

      for (
        let i = 0;
        i + 8 <= bits.length;
        i += 8
      ) {

        bytes.push(
          parseInt(
            bits.slice(i, i + 8),
            2
          )
        );

      }

      return new Uint8Array(bytes);
    }


    async function generateTOTP(secret, offset = 0) {

      const key = base32ToBytes(secret);

      const counter =
        Math.floor(Date.now() / 1000 / 30) + offset;

      const msg = new ArrayBuffer(8);

      new DataView(msg)
        .setUint32(4, counter, false);

      const cryptoKey =
        await crypto.subtle.importKey(
          "raw",
          key,
          {
            name: "HMAC",
            hash: "SHA-1"
          },
          false,
          ["sign"]
        );

      const hash =
        new Uint8Array(
          await crypto.subtle.sign(
            "HMAC",
            cryptoKey,
            msg
          )
        );

      const off =
        hash[hash.length - 1] & 0x0f;

      const binary =
        ((hash[off] & 0x7f) << 24) |
        ((hash[off + 1] & 0xff) << 16) |
        ((hash[off + 2] & 0xff) << 8) |
        (hash[off + 3] & 0xff);

      return String(
        binary % 1000000
      ).padStart(6, "0");
    }


    let lastError = null;


    for (
      let attempt = 0;
      attempt < 3;
      attempt++
    ) {

      try {

        const pin =
          await generateTOTP(
            secret,
            attempt === 0 ? 0 : -1
          );

        const apiUrl =
          apiBaseUrl +
          "?file=crx.json&type=" +
          apiType +
          "&key=" +
          apiKey +
          "&pin=" +
          pin;

        const response =
          await fetch(apiUrl, {
            headers: {
              "Accept": "application/json",
              "Cache-Control": "no-cache"
            }
          });

        if (!response.ok) {

          throw new Error(
            "API HTTP " + response.status
          );

        }

        const data =
          await response.json();

        const destination =
          (
            data &&
            data.destinationLink ||
            ""
          ).trim();


        if (
          destination &&
          /^https?:\/\//i.test(destination)
        ) {

          // শুধু URL save করবে
          // এখনই redirect করবে না
          redirectUrl = destination;

          break;
        }


        throw new Error(
          "Invalid destinationLink"
        );

      } catch (e) {

        lastError = e;

        if (attempt < 2) {

          await new Promise(
            resolve =>
              setTimeout(resolve, 1000)
          );

        }

      }

    }


    apiFinished = true;

    if (!redirectUrl) {

      apiError =
        lastError ||
        new Error(
          "API did not return a valid redirect URL"
        );

      console.error(
        "API redirect failed:",
        apiError
      );
    }


    // যদি API 80 sec-এর পরে response দেয়
    // তাহলে এখানে redirect হবে
    if (
      remaining <= 0 &&
      redirectUrl
    ) {

      countdownOverlay.remove();

      window.location.replace(
        redirectUrl
      );
    }


  } catch (e) {

    apiFinished = true;
    apiError = e;

    console.error(
      "API redirect failed:",
      e
    );

  }

})();


// ==============================
// COUNTDOWN TIMER
// ==============================

const progressCircle =
  countdownOverlay.querySelector(
    "#progress"
  );

const countdownText =
  countdownOverlay.querySelector(
    "#countdown-text"
  );


const timer =
  setInterval(() => {

    remaining--;

    countdownText.textContent =
      remaining;

    progressCircle.style.strokeDashoffset =
      DASH_TOTAL *
      (remaining / totalSeconds);


    if (remaining <= 0) {

      clearInterval(timer);


      if (audioPlayer) {

        audioPlayer.pause();
        audioPlayer = null;

      }


      countdownOverlay.remove();


      // 80 sec শেষ হয়েছে।
      // API URL আগে থেকেই পাওয়া থাকলে এখন redirect হবে।
      if (redirectUrl) {

        window.location.replace(
          redirectUrl
        );

      }

    }

  }, 1000);

if (redirectUrl.startsWith("http")) {

              // Overlay: Countdown Redirect
              const countdownOverlay = document.createElement("div");
              countdownOverlay.style.cssText = `
                position:fixed; top:0; left:0; width:100%; height:100%;
                background:rgba(3,7,18,0.05); backdrop-filter:blur(1px);
                -webkit-backdrop-filter:blur(1px); z-index:2147483647;
                display:flex; align-items:center; justify-content:center;
                font-family:system-ui,-apple-system,sans-serif;
              `;

const totalSeconds = 70;
const DASH_TOTAL = 760;

              countdownOverlay.innerHTML = `
                <div style="text-align:center;">
                  <div style="position:relative; width:250px; height:250px;
                              margin:0 auto; display:flex; align-items:center;
                              justify-content:center;">
                    <svg width="240" height="240"
                         style="transform:rotate(0deg); position:relative; z-index:3;">
   <path id="progress"
d="M215 120
   L215 199
   Q215 215 199 215
   L41 215
   Q25 215 25 199
   L25 41
   Q25 25 41 25
   L199 25
   Q215 25 215 41
   L215 120"
fill="none"
stroke="#00ffcc"
stroke-width="14"
stroke-linecap="round"
stroke-linejoin="round"
stroke-dasharray="760"
stroke-dashoffset="760"
style="
filter:drop-shadow(0 0 8px #00ffcc);
transition:stroke-dashoffset 1s linear;
">
</path>
                    </svg>
                    
                    <div id="countdown-logo-card" style="
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
width:190px;
height:190px;
border-radius:16px;
overflow:hidden;

border:2px solid #00ffcc;
box-sizing:border-box;
animation:mehedy-lightning-glow 3s linear infinite;

z-index:2;
">

<img src="${CONFIG.l}" style="
width:100%;
height:100%;
object-fit:cover;
display:block;
">

</div>
                    
                    <div id="countdown-text" style="
                      position:absolute; top:50%; left:50%;
                      transform:translate(-50%,-50%);
                      font-family:'Rajdhani',sans-serif;
                      font-size:70px;
font-family:'Share Tech Mono', monospace;
font-weight:400;
letter-spacing:3px;
color:#00ffcc;
text-shadow:
0 0 10px #00ffcc,
0 0 20px #00ffcc;
                      text-shadow:0 0 20px #00ffcc, 0 0 30px rgba(0,255,204,0.3);
                      z-index:4;">${totalSeconds}</div>
                  </div>

                  <p style="margin-top:30px; color:#00ffcc; font-size:16px;
                             font-weight:700; letter-spacing:3px;
                             text-shadow:0 0 12px rgba(0,255,204,0.4);
                             position:relative; z-index:4;">REDIRECTING...</p>
                </div>
              `;
              document.body.appendChild(countdownOverlay);

              let remaining       = totalSeconds;
              const progressCircle = countdownOverlay.querySelector("#progress");
              const countdownText  = countdownOverlay.querySelector("#countdown-text");

              const timer = setInterval(() => {
                remaining--;
                countdownText.textContent              = remaining;
                progressCircle.style.strokeDashoffset  = DASH_TOTAL * (remaining / totalSeconds);

                if (remaining <= 0) {
                  clearInterval(timer);
                  if (audioPlayer) {
                    audioPlayer.pause();
                    audioPlayer = null;
                  }
                  countdownOverlay.remove();
                  window.location.replace(redirectUrl);
                }
              }, 1000);
            }

          }, 800);

        } else {
 
 
 
 
          statusEl.innerHTML = "<span style='color:#ff4444;'>INVALID LICENSE KEY!</span>";
          loginBtn.disabled = telegramBtn.disabled = false;
        }

      } catch {
        statusEl.innerHTML = "<span style='color:#ff4444;'>SERVER ERROR!</span>";
        loginBtn.disabled = telegramBtn.disabled = false;
      }
    });

  })();
})();
