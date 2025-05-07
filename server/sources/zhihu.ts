interface Res {
  data: {
    card_label?: {
      icon: string
      night_icon: string
    }
    target: {
      id: number
      title: string
      url: string
      created: number
      answer_count: number
      follower_count: number
      bound_topic_ids: number[]
      comment_count: number
      is_following: boolean
      excerpt: string
    }
  }[]
}

export default defineSource({
  zhihu: async () => {
    const url = "https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=20&desktop=true"
    const headers = {
  'Cookie': '_xsrf=Fqd6SYVAC4An5NVL2oXYDw3HBSBOzlDf; _zap=286e4603-44b0-442d-8293-bf0d05f0ec5c; d_c0=UJdT8ZDCShqPTpMVoz_sVGhKkJJq3OjcNRw=|1744473659; z_c0=2|1:0|10:1745549590|4:z_c0|80:MS4xWnlkdElRQUFBQUFtQUFBQVlBSlZUVHpjNTJoa1pzLVNNT2h3R09KMTBJMnp0WElvXzlvbWJBPT0=|bde94e06c8c63f7fe38a411afe6ad9c8bdea9618b10bed81344581fe5f914ec8; __zse_ck=004_FuOSDUetR0D4a8UEBPV9B8HiuZjHP9VfApEdWnwZ=IvpgEabJwMVtpwcLqcOBNS66KHnE0d7Gg6gIWXKdGuvT1bn=CEbZvT7sOyrOLh2EzQTdYb09vgrZpnI/H0zqPgE-fWR2dGnbsGCxjuXEcGQckMXvdreMdAEbahvReBhHvZNQocMWUdOcLtW9EkUwcRcG9EFr2xv/GmZvEso9XDiw7x/v/wnLzrLqLdSMltnhYlU2tnKPnKgelIhX+XXLY11hAdeqUW1FqTUTkcOHnQTofrPdOkrKLkHXxV1eo+f6oio=; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1745035813,1745549587,1746104606; BEC=244e292b1eefcef20c9b81b1d9777823'
  };
    const res: Res = await myFetch(url,{ headers })
    return res.data
      .map((k) => {
        const urlId = k.target.url?.match(/(\d+)$/)?.[1]
        return {
          id: k.target.id,
          title: k.target.title,
          extra: {
            icon: k.card_label?.night_icon && proxyPicture(k.card_label.night_icon),
          },
          url: `https://www.zhihu.com/question/${urlId || k.target.id}`,
        }
      })
  },
})
