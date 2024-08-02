waitForElement("video#mainvideo").then(() => {
  let url = document.querySelector("video#mainvideo").src;
  redirect(url, window.location.href, false, true);
});
