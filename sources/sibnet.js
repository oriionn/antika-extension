let regex = /\/v\/[a-zA-Z0-9]+\/[0-9]+\.mp4/g;
let url = document.body.innerHTML.match(regex);

if (url) {
  url = `https://video.sibnet.ru${url[1]}`;
  redirect(url, window.location.href, true, false);
}
