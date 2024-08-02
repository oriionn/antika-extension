/**
 * Redirects to the video page
 * @param {string} url - The video URL
 * @param {string} original_link - The original link
 * @param {boolean} r - If the video URL redirects to another URL (This method gets the final URL with a request in the server)
 * @param {boolean} lr - Same as r, but in local, not in the server (For domains allow CORS and have a IP checking)
 * @returns {void}
 */

async function redirect(url, original_link, r, lr) {
  if (lr) {
    let res = eFetch(url, {
      headers: {
        Referer: original_link,
      },
      redirect: "follow",
    });

    if (res.ok) {
      url = res.url;
    }
  }

  let urlB64 = b64EncodeUnicode(url);
  let original_linkB64 = b64EncodeUnicode(original_link);
  let redirect = `http://localhost:3000/?video=${encodeURIComponent(urlB64)}&original_link=${encodeURIComponent(original_linkB64)}${r ? "&redirect=true" : ""}`;
  window.location.href = redirect;
}
