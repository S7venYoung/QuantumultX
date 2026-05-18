// 拼多多去广告 - Quantumult X
// Converted from Loon response-body-json-del / response-body-json-jq rules.

const url = $request.url;
let body = $response.body;

function delPath(obj, path) {
  const keys = path.split(".");
  let target = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (target == null || typeof target !== "object") return;
    target = target[keys[i]];
  }
  if (target && typeof target === "object") delete target[keys[keys.length - 1]];
}

function keepHomeTab(tab) {
  return tab && ["index.html", "chat_list.html", "personal.html"].includes(tab.link);
}

function cleanOrderButtons(order) {
  if (!order || !Array.isArray(order.order_buttons)) return order;
  order.order_buttons = order.order_buttons.map((button) => {
    if (button && typeof button === "object") delete button.order_growth_tip;
    return button;
  });
  return order;
}

try {
  const obj = JSON.parse(body);

  if (/\/api\/alexa\/homepage\/hub\?/.test(url)) {
    [
      "result.dy_module.irregular_banner_dy",
      "result.icon_set",
      "result.search_bar_hot_query"
    ].forEach((path) => delPath(obj, path));

    if (obj.result && Array.isArray(obj.result.bottom_tabs)) {
      obj.result.bottom_tabs = obj.result.bottom_tabs.filter(keepHomeTab);
    }
    if (obj.result && Array.isArray(obj.result.buffer_bottom_tabs)) {
      obj.result.buffer_bottom_tabs = obj.result.buffer_bottom_tabs.filter(keepHomeTab);
    }
    if (obj.result && Array.isArray(obj.result.all_top_opts)) {
      obj.result.all_top_opts = obj.result.all_top_opts.map((item) => {
        if (item && typeof item === "object") {
          delete item.selected_image;
          delete item.image;
          delete item.height;
          delete item.width;
        }
        return item;
      });
    }
  }

  if (/\/search\?/.test(url)) {
    delPath(obj, "expansion");
  }

  if (/\/api\/philo\/personal\/hub\?/.test(url)) {
    [
      "monthly_card_entrance",
      "personal_center_style_v2_vo",
      "icon_set.icons",
      "icon_set.top_personal_icons"
    ].forEach((path) => delPath(obj, path));
  }

  if (/\/api\/oak\/integration\/render\?/.test(url)) {
    [
      "bottom_section_list",
      "ui.bottom_section",
      "ui.live_section.float_info"
    ].forEach((path) => delPath(obj, path));
  }

  if (/\/api\/caterham\/v3\/query\/order_detail_group\?/.test(url)) {
    delPath(obj, "data.goods_list");
  }

  if (/\/order\//.test(url)) {
    [
      "marketing_banner_vo",
      "shipping.banner_above_recommend"
    ].forEach((path) => delPath(obj, path));
  }

  if (/\/api\/aristotle\/order_list_v4\?/.test(url) && Array.isArray(obj.orders)) {
    obj.orders = obj.orders.map(cleanOrderButtons);
  }

  body = JSON.stringify(obj);
} catch (e) {}

$done({ body });
