// imgur-redirect.js
// Loon 插件：重定向 i.imgur.com 图片至 noobzone 镜像站

let url = $request.url;
let redirectUrl = "https://img.noobzone.ru/getimg.php?url=" + encodeURIComponent(url);

$done({
  status: 302,
  headers: {
    Location: redirectUrl,
    'Cache-Control': 'no-cache'
  }
});