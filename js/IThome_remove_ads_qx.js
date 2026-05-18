// IT之家去广告 - Quantumult X
// Converted from kelee.one Loon plugin.

const OPTIONS = {
  removeAllBanners: true,
  removePinnedArticles: true
};

let modified = false;
let body = $response.body || "";

try {
  const obj = JSON.parse(body);

  function removeAllBanners() {
    if (!OPTIONS.removeAllBanners || !Array.isArray(obj?.data?.list)) return;
    const before = obj.data.list.length;
    obj.data.list = obj.data.list.filter((item) => item.feedType !== 10002);
    modified ||= before !== obj.data.list.length;
  }

  function removePinnedArticles() {
    if (!OPTIONS.removePinnedArticles || !Array.isArray(obj?.data?.list)) return;
    const before = obj.data.list.length;
    obj.data.list = obj.data.list.filter((item) => item.feedType !== 10003);
    modified ||= before !== obj.data.list.length;
  }

  function removeBannerAds() {
    if (!Array.isArray(obj?.data?.list)) return;
    obj.data.list.forEach((item) => {
      const focusNewsData = item?.feedContent?.focusNewsData;
      if (!Array.isArray(focusNewsData)) return;
      const before = focusNewsData.length;
      item.feedContent.focusNewsData = focusNewsData.filter((ad) => !ad.isAd);
      modified ||= before !== item.feedContent.focusNewsData.length;
    });
  }

  function removeFeedAds() {
    if (!Array.isArray(obj?.data?.list)) return;
    const before = obj.data.list.length;
    obj.data.list = obj.data.list.filter((item) => {
      if (item?.feedContent?.flag === 2 || item?.feedType === 10004) return false;
      const smallTags = item?.feedContent?.smallTags;
      if (Array.isArray(smallTags)) {
        return !smallTags.some((tag) => tag?.text === "广告");
      }
      return true;
    });
    modified ||= before !== obj.data.list.length;
  }

  removeAllBanners();
  removePinnedArticles();
  removeBannerAds();
  removeFeedAds();

  if (modified) body = JSON.stringify(obj);
} catch (e) {}

$done(modified ? { body } : {});
