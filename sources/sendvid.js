let regex = /var video_source = "(http[s]?:\/\/[^"]+)"/;
let url = document.body.innerHTML.match(regex);

if (url) {
  url = url[1];
  redirect(url, window.location.href, false, false);
}
