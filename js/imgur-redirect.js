// @name Imgur 图片跳转镜像 - Quantumult X
// @author @S7venYoung

let url = $request.url;
let mirror = "https://img.noobzone.ru/getimg.php?url=";

if (url.includes("imgur.com")) {
  let newUrl = mirror + encodeURIComponent(url);
  $done({
    status: "HTTP/1.1 302 Found",
    headers: {
      "Location": newUrl
    }
  });
} else {
  $done({});
}
