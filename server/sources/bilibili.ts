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

const hotVideo = defineSource(async () => {
  const url = "https://api.bilibili.com/x/web-interface/popular"
  const res: HotVideoRes = await myFetch(url)

  return res.data.list.map(video => ({
    id: video.bvid,
    title: video.title,
    url: `https://www.bilibili.com/video/${video.bvid}`,
    pubDate: video.pubdate * 1000,
    extra: {
      info: `${video.owner.name} · ${formatNumber(video.stat.view)}观看 · ${formatNumber(video.stat.like)}点赞`,
      hover: video.desc,
      icon: proxyPicture(video.pic),
    },
  }))
})

const ranking = defineSource(async () => {
  const url = "https://api-hot.chgr.cc/bilibili?limit=20"; // 确认此 URL 返回 HotVideoRes 结构的数据
  const res: HotVideoRes = await myFetch(url); // myFetch 应返回解析后的 HotVideoRes 类型对象

  // 健壮性检查：确保 res, res.data 和 res.data.list 存在且 list 是数组
  if (!res || !res.data || !Array.isArray(res.data.list)) {
    console.error("获取 Bilibili 热门榜数据失败或格式错误:", res);
    // 根据你的错误处理策略，可以返回空数组、抛出错误或返回 null
    return [];
  }

  // 访问 res.data.list 进行映射
  return res.data.list.map(video => ({
    id: video.bvid, // 使用 'bvid' 作为唯一 ID
    title: video.title, // 'title' 字段
    url: `https://www.bilibili.com/video/${video.bvid}`, // 使用 'bvid' 构建 URL
    pubDate: video.pubdate * 1000, // 'pubdate' 是秒级时间戳，需转换为毫秒
    extra: {
      // 构建 info 字符串，包含作者、观看数和点赞数
      info: `${video.owner.name} · ${formatNumber(video.stat.view)}观看 · ${formatNumber(video.stat.like)}点赞`,
      hover: video.desc, // 'desc' 字段用于悬停信息
      icon: proxyPicture(video.pic), // 'pic' 字段是封面图 URL
    },
  }))
})
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
