// Imgur 加速镜像 + 去除 Referer（兼容 Quantumult X & Loon）

let url = $request.url;
let match = url.match(/^https?:\/\/i\.imgur\.com\/(.*\.(jpg|jpeg|png|gif))/);
if (match) {
  let imagePath = match[1];
  let newURL = "https://img.noobzone.ru/getimg.php?url=https://i.imgur.com/" + imagePath;

  $done({
    url: newURL,
    headers: {
      ...$request.headers,
      "Referer": ""
    }
  });
} else {
  $done({});
}