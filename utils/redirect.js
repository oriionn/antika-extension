async function getInstance() {
  return `http://localhost:3000/`;
}

/**
 * Redirects the user to the video page
 * @param {Object} options - The options object
 * @param {String} options.video - The video URL
 * @param {String} options.type - The video MIME type
 * @param {String} options.original_link - The original link of the video
 * @param {Boolean} [options.redirect=false] - If the video should be redirected
 * @param {Boolean} [options.local_redirect=false] - If the video should be redirected locally
 * @param {Object} options.proxy - The proxy options
 * @param {Boolean} [options.proxy.enabled=false] - If the proxy should be enabled
 * @param {String} [options.proxy.cookies] - The cookies to be used in the proxy
 * @param {Boolean} [options.proxy.onlyDomain=false] - If the Referer should be set to the domain only
 */

async function redirect({
  video,
  type,
  original_link,
  redirect = false,
  local_redirect = false,
  proxy: {
    enabled: proxy_enabled = false,
    cookies: proxy_cookies,
    onlyDomain: proxy_onlyDomain = false,
  },
}) {
  // Check if local redirect is enabled, if enabled, make a request to the video URL to get the final URL
  if (local_redirect) {
    let res = eFetch(video, {
      headers: {
        Referer: original_link,
      },
      redirect: "follow",
    });

    if (res.ok) {
      video = res.url;
    }
  }

  let original_linkB64 = b64EncodeUnicode(original_link);

  // Proxy enabled, encode the cookies and the target URL and make video link with the proxy URL
  if (proxy_enabled === true) {
    let cookies = b64EncodeUnicode(proxy_cookies);
    let target = b64EncodeUnicode(
      `${new URL(video).protocol}//${new URL(video).host}/`,
    );
    let onlyDomain = proxy_onlyDomain ? "true" : "false";
    let path = new URL(video).pathname;
    let query = new URL(video).search;
    video = `${await getInstance()}proxy${path}${query}${query === "" ? "?" : "&"}target=${target}&cookies=${encodeURIComponent(cookies)}&only_domain=${onlyDomain}&original_link=${original_linkB64}`;
  }

  let videoB64 = b64EncodeUnicode(video);

  // Redirect the user to the video page
  let redirectLink = `${await getInstance()}?video=${encodeURIComponent(videoB64)}&original_link=${encodeURIComponent(original_linkB64)}${redirect ? "&redirect=true" : ""}&type=${type}`;
  window.location.href = redirectLink;
}
