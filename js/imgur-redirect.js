// Imgur image redirect for Quantumult X
// Redirects Imgur image responses to the noobzone mirror.

const mirrorBase = "https://img.noobzone.ru/getimg.php?url=";
const url = $request.url;

if (/^https?:\/\/(i\.)?imgur\.com\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(url)) {
  $done({
    status: "HTTP/1.1 302 Found",
    headers: {
      Location: mirrorBase + encodeURIComponent(url),
      "Cache-Control": "no-cache"
    }
  });
} else {
  $done({});
}
