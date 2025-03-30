# Hits! - General purpose hits counter based on Cloudflare Workers （[中文说明](https://github.com/xykt/Hits/blob/main/README_CN.md)）
<p>
<img src="https://hits.xykt.de/hits_github.svg?action=hit&count_bg=%23FFA552&title_bg=%231D8834&title=Hits!&edge_flat=false"/>
<img src="https://img.shields.io/badge/Version-2025--03--31-green"/>
<img src="https://img.shields.io/badge/Uptime-100%25-green"/>
<img src="https://img.shields.io/badge/Deploy-Serverless-blue"/>
<img src="https://img.shields.io/badge/Cost-FREE-blue"/>
<a href="/LICENSE"><img src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" alt="license" /></a>  
</p> 

Hits! A completely free, serverless, lightweight access counter system based on **Cloudflare Workers** and **D1 SQL Database**, supporting JSON and GitHub ([Shields.io](https://shields.io/)) style SVG images, with quick deployment in just one minute

## ✨ Features

- 🚀 **Quick Deployment** - Deploy in just one minute
- ☁️ **Cloud Hosting** - No server maintenance required
- 💰 **Completely Free** - Utilizes Cloudflare's free plan
- 📊 **Multi-Site Support** - Supports multiple counters via different keywords
- 🔒 **Secure and Reliable** - Powered by Cloudflare's global network
- 🎨 **Colorful Display** - Supports customizable color SVG and JSON output

## 🛠 Quick Deployment Guide

### 1. Create D1 Database

Go to the Cloudflare Dashboard, navigate to **Storage & Databases** > **D1 SQL Database** > **Create**, name it _hits_, and run the following SQL to create the table in Console

```sql
CREATE TABLE counters ( name TEXT PRIMARY KEY, count INTEGER DEFAULT 0 );
```

### 2. Create Workers

Navigate to **Workers & Pages** > **Create application** > **Create Worker**, name it _hits_. Copy the [hit.js](https://github.com/xykt/Hits/blob/main/hits.js) code into the Worker editor. Modify line 7 to change the domain to your counter's domain, and set the keywords in line 8. Each counter corresponds to a keyword. For subsequent counters, simply add new keywords for them.


### 3. Configure Bindings

In the Worker **Settings** > **Bindings** > **Add** > **D1 Database**, enter the variable name as _HITS_, and select the _hits_ database. In **Domains & Routes** - **Add** - **Custom domain**, add your newly configured counter domain.


### 4. How to Use

- SVG Image

```url
https://your.domain/keyword.svg?action=view&count_bg=%233DC8C0&title_bg=%23555555&title=Visits&edge_flat=false
```

| Parameter  | Values               | Description                       | 说明                         |
|------------|----------------------|-----------------------------------|----------------------------|
| action     | view / hit           | View only or hit & view           | 仅展示/点击并展示           |
| count_bg   | %23{colorcode}        | Background color of count area    | 数字部分背景颜色            |
| title_bg   | %23{colorcode}        | Background color of title area    | 标题部分背景颜色            |
| title      | TitleToShow          | Text to display                   | 展示标题                    |
| edge_flat  | true / false        | Sharp or rounded corners        | 尖角/圆角                   |

| [Shields.io](https://shields.io/) [Presets](https://github.com/badges/shields/blob/master/badge-maker/lib/color.js#L6)    | [Aliases](https://github.com/badges/shields/blob/master/badge-maker/lib/color.js#L18)  | Hits! Counter Example | Shields.io Example |
|--------------|-----------|----------------------------|--------------------|
| `count_bg=brightgreen` | `success` | ![brightgreen](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/brightgreen.svg) | ![shields-brightgreen](https://img.shields.io/badge/Shields.io-brightgreen-brightgreen) |
| `count_bg=green`       |  | ![green](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/green.svg) | ![shields-green](https://img.shields.io/badge/Shields.io-green-green) |
| `count_bg=yellow`      |  | ![yellow](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/yellow.svg) | ![shields-yellow](https://img.shields.io/badge/Shields.io-yellow-yellow) |
| `count_bg=yellowgreen` |  | ![yellowgreen](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/yellowgreen.svg) | ![shields-yellowgreen](https://img.shields.io/badge/Shields.io-yellowgreen-yellowgreen) |
| `count_bg=orange`      | `important` | ![orange](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/orange.svg) | ![shields-orange](https://img.shields.io/badge/Shields.io-orange-orange) |
| `count_bg=red`         | `critical` | ![red](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/red.svg) | ![shields-red](https://img.shields.io/badge/Shields.io-red-red) |
| `count_bg=blue`        | `informational` | ![blue](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/blue.svg) | ![shields-blue](https://img.shields.io/badge/Shields.io-blue-blue) |
| `count_bg=grey`        | `gray` | ![grey](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/grey.svg) | ![shields-grey](https://img.shields.io/badge/Shields.io-grey-grey) |
| `count_bg=lightgrey`   | `lightgray` `inactive` | ![lightgrey](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/lightgrey.svg) | ![shields-lightgrey](https://img.shields.io/badge/Shields.io-lightgrey-lightgrey) |

| [Custom](https://github.com/xykt/Hits/blob/main/res/style.md)       | Black | Gray | Blue | Green | Purple | Red |
|---------------|-------|------|------|-------|--------|-----|
| **Red** | ![1](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/11.svg) | ![2](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/12.svg) | ![3](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/13.svg) | ![4](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/14.svg) | ![5](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/15.svg) | ![6](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/16.svg) |
| **Orange** | ![7](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/21.svg) | ![8](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/22.svg) | ![9](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/23.svg) | ![10](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/24.svg) | ![11](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/25.svg) | ![12](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/26.svg) |
| **Yellow** | ![13](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/31.svg) | ![14](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/32.svg) | ![15](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/33.svg) | ![16](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/34.svg) | ![17](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/35.svg) | ![18](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/36.svg) |
| **Green** | ![19](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/41.svg) | ![20](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/42.svg) | ![21](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/43.svg) | ![22](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/44.svg) | ![23](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/45.svg) | ![24](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/46.svg) |
| **Blue** | ![25](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/51.svg) | ![26](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/52.svg) | ![27](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/53.svg) | ![28](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/54.svg) | ![29](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/55.svg) | ![30](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/56.svg) |
| **Purple** | ![31](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/61.svg) | ![32](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/62.svg) | ![33](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/63.svg) | ![34](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/64.svg) | ![35](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/65.svg) | ![36](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/66.svg) |
| **Gray** | ![37](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/71.svg) | ![38](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/72.svg) | ![39](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/73.svg) | ![40](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/74.svg) | ![41](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/75.svg) | ![42](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/76.svg) |


- JSON Result

| Request | Description | 说明 |
|-|-|-|
| ```https://your.domain/keyword?action=view``` | View only | 仅展示 |
| ```https://your.domain/keyword?action=hit``` | Hit & View | 点击并展示 |

JSON Response
```json
{
  "counter": "keyword",
  "action": "hit",
  "total": 1024,
  "daily": 32,
  "date": "2025-03-31",
  "timestamp": "2025-03-31T04:08:16.512Z"
}
```

### Acknowledgements

- Thanks to [酒神@Nodeseek](https://www.nodeseek.com/space/9#/general) for technical support and valuable feedback.

Welcome to submit Pull Request or Issue!
