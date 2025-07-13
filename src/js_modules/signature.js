export async function checkForAuthorSignature() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("author")) {
    const res = await fetch("https://subratap.gitlab.io/signature/");
    const html = await res.text();
    const body = document.createElement("body");
    body.innerHTML = html;
    document.documentElement.replaceChild(body, document.body);
  }
}
