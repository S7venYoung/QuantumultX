// imgur-mirror.js
// 将 imgur 图片跳转到镜像站
// @author Seven

const url = $request.url;
const mirrorBase = "https://img.noobzone.ru/getimg.php?url=";

if (url.includes("i.imgur.com")) {
  const redirectUrl = mirrorBase + encodeURIComponent(url);
  $done({ response: { status: 302, headers: { Location: redirectUrl } } });
} else {
  $done({});
}
