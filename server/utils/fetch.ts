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
    "Cache-Control":"no-cache",
    "Pragma":"no-cache",
    "Priority":"u=0, i",
    "Sec-Ch-Ua":""Chromium";v="136", "Microsoft Edge";v="136", "Not.A/Brand";v="99"",
    "Sec-Ch-Ua-Mobile":"?0",
    "Sec-Ch-Ua-Platform":""Windows"",
    "Sec-Fetch-Dest":"document",
    "Sec-Fetch-Mode":"navigate",
    "Sec-Fetch-Site":"none",
    "Sec-Fetch-User":"?1",
    "Upgrade-Insecure-Requests":"1"
  },
  timeout: 10000,
  retry: 3,
})
