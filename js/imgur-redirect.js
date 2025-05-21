// imgur-redirect-loon.js
// 自动将 imgur 图片请求跳转到镜像站
// Author: @S7venYoung + ChatGPT

const mirrorBase = "https://img.noobzone.ru/getimg.php?url=";
const url = $request.url;

if (url.match(/^https?:\/\/(i\.)?imgur\.com\/.+\.(jpg|jpeg|png|gif|webp)$/i)) {
  const redirectUrl = mirrorBase + encodeURIComponent(url);
  $done({
    response: {
      status: 302,
      headers: {
        Location: redirectUrl,
        "Cache-Control": "no-cache"
      }
    }
  });
} else {
  $done({});
}
