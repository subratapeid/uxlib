export function checkForAuthorSignature() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("author")) {
    const body = document.createElement("body");
    body.style.margin = "0";
    body.style.fontFamily = "sans-serif";
    body.innerHTML = `
      <div style="min-height: 100vh; display: flex; justify-content: center; align-items: center; background: #fffbe6; padding: 40px;">
        <div style="max-width: 700px; width: 100%; background: white; border: 2px solid #ffc107; border-radius: 10px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h2 style="margin-top: 0; color: #d35400;">👨‍💻 Developed by Subrata</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            This page or tool has been proudly designed and developed by <strong>Subrata</strong> from India 🇮🇳.<br><br>
            You're seeing this page with <code>?author</code> in the URL — which acts as a digital signature to prove my authorship and originality.
          </p>
          <p style="margin-top: 20px; font-size: 15px;">
            📌 Visit my profile:<br>
            <a href="https://subratap.gitlab.io/profile" target="_blank" style="color: #2980b9; text-decoration: underline;">
              🌐 subratap.gitlab.io/profile
            </a>
          </p>
          <p style="margin-top: 20px; font-size: 14px; color: #777;">
            💡 Tip: Add <code>?author</code> to any project URL to see this signature.
          </p>
          <button onclick="(function(){
            window.location.href = window.location.href.replace(/[?&]author(=[^&]*)?/, '').replace(/([?&])$/, '');
          })()" 
            style="margin-top: 30px; padding: 10px 20px; background-color: #ffc107; color: #333; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
            🔙 View Original Page
          </button>
        </div>
      </div>`;
    document.documentElement.replaceChild(body, document.body);
  }
}
