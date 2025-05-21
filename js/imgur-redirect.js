// imgur-mirror.js
// Quantumult X: 将 imgur 图片请求重定向到 img.noobzone.ru

const originalUrl = $request.url;
const redirectUrl = "https://img.noobzone.ru/getimg.php?url=" + encodeURIComponent(originalUrl);

$done({
  status: 302,
  headers: {
    Location: redirectUrl
  }
});
