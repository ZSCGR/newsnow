import { $fetch } from "ofetch"

export const myFetch = $fetch.create({
  headers: {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  },
  timeout: 10000,
  retry: 3,
})

export const zhihuFetch = $fetch.create({
  headers: {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    "Cookie":"_xsrf=Fqd6SYVAC4An5NVL2oXYDw3HBSBOzlDf; _zap=286e4603-44b0-442d-8293-bf0d05f0ec5c; d_c0=UJdT8ZDCShqPTpMVoz_sVGhKkJJq3OjcNRw=|1744473659; z_c0=2|1:0|10:1745549590|4:z_c0|80:MS4xWnlkdElRQUFBQUFtQUFBQVlBSlZUVHpjNTJoa1pzLVNNT2h3R09KMTBJMnp0WElvXzlvbWJBPT0=|bde94e06c8c63f7fe38a411afe6ad9c8bdea9618b10bed81344581fe5f914ec8; __zse_ck=004_FuOSDUetR0D4a8UEBPV9B8HiuZjHP9VfApEdWnwZ=IvpgEabJwMVtpwcLqcOBNS66KHnE0d7Gg6gIWXKdGuvT1bn=CEbZvT7sOyrOLh2EzQTdYb09vgrZpnI/H0zqPgE-fWR2dGnbsGCxjuXEcGQckMXvdreMdAEbahvReBhHvZNQocMWUdOcLtW9EkUwcRcG9EFr2xv/GmZvEso9XDiw7x/v/wnLzrLqLdSMltnhYlU2tnKPnKgelIhX+XXLY11hAdeqUW1FqTUTkcOHnQTofrPdOkrKLkHXxV1eo+f6oio=; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1745035813,1745549587,1746104606; BEC=244e292b1eefcef20c9b81b1d9777823"
  },
  timeout: 10000,
  retry: 3,
})

export const linuxdoFetch = $fetch.create({
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Referer": "https://linux.do",
    "Cookie": "_ga=GA1.1.1183480785.1715009311; fp=5eee706916d2e36e6dbdcce5bd49e7b2; __stripe_mid=76b48ad6-c589-4af0-91c2-1a6fda637bf844114d; cfz_google-analytics_v4=%7B%22PYbv_engagementStart%22%3A%7B%22v%22%3A%221714747002754%22%2C%22e%22%3A1746283002754%7D%2C%22PYbv_engagementDuration%22%3A%7B%22v%22%3A%220%22%2C%22e%22%3A1746283002754%7D%2C%22PYbv_counter%22%3A%7B%22v%22%3A%2228139%22%2C%22e%22%3A1746283002754%7D%2C%22PYbv_session_counter%22%3A%7B%22v%22%3A%22328%22%2C%22e%22%3A1746283002754%7D%2C%22PYbv_ga4%22%3A%7B%22v%22%3A%221735bec4-da64-44b7-bb98-5187ec85009b%22%2C%22e%22%3A1746283002754%7D%2C%22PYbv_let%22%3A%7B%22v%22%3A%221714747002754%22%2C%22e%22%3A1746283002754%7D%7D; __stripe_sid=2c6c529c-ab1c-4dce-93a9-4669e46ef477c16628; _ga_1X49KS6K0M=GS2.1.s1748856383$o755$g1$t1748860698$j38$l0$h297976191; _t=2RXVWZuicoPYPcLU9mHs%2BI6Lj1ysPN37Y1WXePTWiFe28KIva5VSz%2BgWFeYFOqQ7jh5G14HFXPXgQrzk4BsrnbxE7UqvyYWfxpTFCBzMOeVB4lmv5BgStym6r0D5e6fs4lzCCsWjJSgfXbp9qNduxRL%2B0QjHt7GDXoOmNm1l9uM0zfrB3hmnqBTswiHgRPlXVi2%2Be4zlGsRbOUC5830t469jle7NovMJJyZORNu5eKZYWjqm1PRXN62VZz9YcRWzKXFuRCF2nVUiuH6udnmG91hta6d2oikShFvJAvxhEuerQu%2Br45qgtg%3D%3D--3KFAHpaFtIMggseq--oc5uQ7kaBGjQKT7zpxVUaQ%3D%3D; _forum_session=bFKGNVmPkNgTbTi1U9D16hNgjYJmVHc3dqLu1WCDcSYEbPBjKsT%2FgKbd%2BkFfft%2BwxIt9I5rbwwCsdjlN5%2FPOLjRTbEylzHD1WM8xKU5HVK7rR4qY7eq9JqlYZW5wovwGV7A4x%2Fr9JXljHLj33SRuwRP5mxbEjaUNWwmgh0gDd%2Fy7mv9FS1B8VpymFYAolPwG1QUoHrutQaI7d2LxDM%2FtbgVZqFJwNu6lD9u7qCNIqZb4j288o%2BdPFjMXkrZLaO9JQHeslXjUlwKXHEVjOGCutHHH31ffRlPXdmBpmcqeWBGJ9Tcd3lwk3EpNiJxNDnIPqw1vFmYEgGA39NXEVOCMlze0I5%2FehYEU4MEERlW2kztoe7RWKhyNYzIonXA%2Fs%2FBHQgGq2uKHK7zU%2BW5RPcoIfN8lSc%2Fx0oLtIof5h1mi--Cy%2BuPMwktjqgQqQK--bCd15VxwEOGk9iJp0TVmGw%3D%3D; cf_clearance=lzOygkNV8Mk5bdqpiJ9bhEgjxZ9IEd8DvrmqC8wBCo8-1748861387-1.2.1.1-3dE4jUHcsVaLOTRLksQI44LPvZ3lBwdVlgNm4lT9jiSz0CeU2wezHPIxIVDxFBGkz8n.uo2kYKJfmNysonIJiNcyYWak_NDmsHYooZgXADmGXHNimGI9fzl5Kgm0zOIpLHexaLIl8fHVuGVU0qwMQ4XLKTFfWaTB.7ZlWpONOiRPzfKPlZM3PBGXg.s_.riZv74HN_WAaOAxZKphq4MudHdvzxczgWDH5ek3u4QyCiFoPDuKUqD2e41yxi1pFqe8DaIn.UJoRC3j1uqgsk3.qs3OHN_qK_dq.q9KIn3Fc_g7caG_9nhvMR3fUzkko9mb1TzkuHsG6J5YBBPgs1xHMI0g6J44aopfMJqnucMY.5D2_oGUn0BfnV2D5Fceiu5d",
    "Cache-Control":"no-cache",
    "Pragma":"no-cache",
    "Priority":"u=0, i",
    "Sec-Fetch-Dest":"document",
    "Sec-Fetch-Mode":"navigate",
    "Sec-Fetch-Site":"none",
    "Sec-Fetch-User":"?1",
    "Upgrade-Insecure-Requests":"1"
  },
  timeout: 10000,
  retry: 3,
})
