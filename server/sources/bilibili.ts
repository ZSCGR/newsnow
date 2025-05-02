interface WapRes {
  code: number
  exp_str: string
  list: {
    hot_id: number
    keyword: string
    show_name: string
    score: number
    word_type: number
    goto_type: number
    goto_value: string
    icon: string
    live_id: any[]
    call_reason: number
    heat_layer: string
    pos: number
    id: number
    status: string
    name_type: string
    resource_id: number
    set_gray: number
    card_values: any[]
    heat_score: number
    stat_datas: {
      etime: string
      stime: string
      is_commercial: string
    }
  }[]
  top_list: any[]
  hotword_egg_info: string
  seid: string
  timestamp: number
  total_count: number
}

// Interface for Bilibili Hot Video response
interface HotVideoRes {
  code: number
  message: string
  ttl: number
  data: {
    list: {
      aid: number
      videos: number
      tid: number
      tname: string
      copyright: number
      pic: string
      title: string
      pubdate: number
      ctime: number
      desc: string
      state: number
      duration: number
      owner: {
        mid: number
        name: string
        face: string
      }
      stat: {
        view: number
        danmaku: number
        reply: number
        favorite: number
        coin: number
        share: number
        now_rank: number
        his_rank: number
        like: number
        dislike: number
      }
      dynamic: string
      cid: number
      dimension: {
        width: number
        height: number
        rotate: number
      }
      short_link: string
      short_link_v2: string
      bvid: string
      rcmd_reason: {
        content: string
        corner_mark: number
      }
    }[]
  }
}

const hotSearch = defineSource(async () => {
  const url = "https://s.search.bilibili.com/main/hotword?limit=30"
  const res: WapRes = await myFetch(url)

  return res.list.map(k => ({
    id: k.keyword,
    title: k.show_name,
    url: `https://search.bilibili.com/all?keyword=${encodeURIComponent(k.keyword)}`,
    extra: {
      icon: k.icon && proxyPicture(k.icon),
    },
  }))
})



const ranking = defineSource(async () => {
  const url = "https://api-hot.chgr.cc/bilibili?limit=20"; // 这个 URL 是否返回你提供的 JSON 结构？请确认。
  // 假设 myFetch 返回的类型是 HotVideoRes 或者 any
  const res = await myFetch(url); // 确保 myFetch 正确处理请求并返回解析后的 JSON 对象

  // 检查 res 和 res.data 是否存在且 res.data 是数组
  if (!res || !Array.isArray(res.data)) {
    console.error("获取 Bilibili 热门榜数据失败或格式错误:", res);
    return []; // 返回空数组或进行错误处理
  }

  // 直接使用 res.data 进行映射
  return res.data.map(video => ({
    id: video.id, // 使用 JSON 中的 'id'
    title: video.title, // 'title' 字段匹配
    url: `https://www.bilibili.com/video/${video.id}`, // 使用 'id' 构建 Bilibili 标准 URL
    pubDate: video.timestamp, // 使用 'timestamp'，假设已经是毫秒
    extra: {
      // 根据可用数据构建 info 字符串
      info: `${video.author} · ${formatNumber(video.hot)} 热度`, // 使用 'author' 和 'hot'
      hover: video.desc, // 'desc' 字段匹配
      icon: proxyPicture(video.cover), // 使用 'cover'
    },
  }));
});
function formatNumber(num: number): string {
  if (num >= 10000) {
    return `${Math.floor(num / 10000)}w+`
  }
  return num.toString()
}

export default defineSource({
  "bilibili": hotSearch,
  "bilibili-hot-search": hotSearch,
  "bilibili-hot-video": hotVideo,
  "bilibili-ranking": ranking,
})
