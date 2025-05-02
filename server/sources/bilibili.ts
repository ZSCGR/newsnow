interface NewApiVideoItem {
  id: string;
  title: string;
  desc: string;
  cover: string;
  author: string;
  timestamp: number; // 注意这是毫秒时间戳
  hot: number;
  url: string;
  mobileUrl: string;
}

interface NewApiResponse {
  code: number;
  name: string;
  title: string;
  type: string;
  description: string;
  parameData: any; // 可以根据需要细化
  link: string;
  total: number;
  updateTime: string;
  fromCache: boolean;
  data: NewApiVideoItem[]; // 核心数据在这里
}

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
  const url = "https://proxy.255254.xyz/https://api.bilibili.com/x/web-interface/popular"
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
  // 1. 使用新接口的 URL
  const newUrl = "https://api-hot.chgr.cc/bilibili?limit=20"; // <--- 替换成新接口的实际地址
  // 假设 myFetch 可以正确获取并解析新接口的 JSON
  const newRes: NewApiResponse = await myFetch(newUrl);

  // 2. 数据转换适配层：将 NewApiResponse 转换为符合 HotVideoRes['data']['list'] 结构的数组
  //    注意：我们只需要构建 map 函数需要的部分即可，不需要严格创建完整的 HotVideoRes
  const adaptedList = newRes.data.map(newItem => {
    // 创建一个符合 map 函数内部访问 video 对象结构的临时对象
    return {
      bvid: newItem.id,
      title: newItem.title,
      pubdate: Math.floor(newItem.timestamp / 1000), // 将毫秒转为秒 (整数)
      owner: {
        name: newItem.author,
        // 如果 map 中需要其他 owner 字段，需提供默认值
        mid: 0,
        face: '',
      },
      stat: {
        view: newItem.hot, // 使用 hot 作为观看数 (近似值)
        like: 0, // <--- 新接口没有点赞数，这里设置为 0
        // 如果 map 中需要其他 stat 字段，需提供默认值
        danmaku: 0, reply: 0, favorite: 0, coin: 0, share: 0, now_rank: 0, his_rank: 0, dislike: 0,
      },
      desc: newItem.desc,
      pic: newItem.cover,
      // --- 以下字段如果 map 中没有用到，可以不映射 ---
      aid: 0, videos: 1, tid: 0, tname: 'N/A', copyright: 1, ctime: Math.floor(newItem.timestamp / 1000),
      state: 0, duration: 0, dynamic: '', cid: 0, dimension: { width: 0, height: 0, rotate: 0 },
      short_link: newItem.url, short_link_v2: newItem.url, rcmd_reason: { content: '', corner_mark: 0 },
    };
  });

  // 3. 使用转换后的 adaptedList 进行 map 操作，这部分代码保持不变
  //    map 函数现在操作的是我们手动适配过的对象数组
  return adaptedList.map(video => ({
    id: video.bvid,
    title: video.title,
    url: `https://www.bilibili.com/video/${video.bvid}`, // 保持原来的 URL 拼接方式
    // 或者，如果你想用新接口提供的 URL:
    // url: video.short_link, // short_link 在适配层映射自 newItem.url
    pubDate: video.pubdate * 1000, // 将秒转换回毫秒
    extra: {
      // 注意：因为 like 设置为 0，这里的点赞数会显示为 0
      info: `${video.owner.name} · ${formatNumber(video.stat.view)}观看 · ${formatNumber(video.stat.like)}点赞`,
      // 如果不想显示点赞数，可以修改 info 的格式:
      // info: `${video.owner.name} · ${formatNumber(video.stat.view)}观看`,
      hover: video.desc,
      icon: proxyPicture(video.pic), // pic 来源于 newItem.cover
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
