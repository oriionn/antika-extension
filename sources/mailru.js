let id = window.location.href.split("/")[5];
let metadataApi = `https://my.mail.ru/+/video/meta/${id}?xemail=&ajax_call=1&func_name=&mna=&mnb=&ext=1&_=${Date.now()}`;

eFetch(metadataApi).then(async (response) => {
  let metadata = await response.json();
  let url = `http:${metadata.videos[0].url}`;

  redirect({
    video: url,
    type: "video/mp4",
    original_link: window.location.href,
    proxy: {
      enabled: true,
      cookies: document.cookie,
      onlyDomain: true,
    },
  });
});
