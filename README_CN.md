# Hits! - 基于Cloudflare Workers的综合访问计数器
<p>
<img src="https://hits.xykt.de/hits_github.svg?action=hit&count_bg=%23FFA552&title_bg=%231D8834&title=Hits!&edge_flat=false"/>
<img src="https://img.shields.io/badge/Version-2025--06--08-green"/>
<img src="https://img.shields.io/badge/Uptime-100%25-green"/>
<img src="https://img.shields.io/badge/Deploy-Serverless-blue"/>
<img src="https://img.shields.io/badge/Cost-FREE-blue"/>
<a href="/LICENSE"><img src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" alt="license" /></a>  
</p> 

Hits! 一款完全免费、无需服务器、基于 **Cloudflare Workers** 和 **D1 SQL Database** 的轻量级访问计数器系统，支持JSON及GitHub（[Shields.io](https://shields.io/)）风格SVG图片，一分钟快速部署

## ✨ 功能特性

- 🚀 **快速部署** - 一分钟即可完成部署
- ☁️ **云端托管** - 无需维护服务器
- 💰 **完全免费** - 使用Cloudflare免费套餐
- 📊 **多站点支持** - 通过不同keyword支持多个计数器
- 🔒 **安全可靠** - 基于Cloudflare全球网络
- 🎨 **多彩展示** - 支持自定义色彩的SVG及JSON输出

## 🛠 快速部署指南

### 1. 创建D1数据库

进入Cloudflare Dashboard，导航至 **Storage & Databases** > **D1 SQL Database** - **Create**，命名为hits，在 **Console** 中执行以下SQL创建表:

```sql
CREATE TABLE counters ( name TEXT PRIMARY KEY, count INTEGER DEFAULT 0 );
```

### 2. 创建Workers

导航至 **Workers & Pages** > **Create application** > **Create Worker**，命名为 _hits_，复制[hit.js](https://github.com/xykt/Hits/blob/main/hits.js)代码到Worker编辑器中，修改第七行domain为你的计数器域名，并设置keyword，每个计数器对应一个keyword，后续新增计数器只需要新增keyword即可


### 3. 配置绑定

在Worker的 **Settings** > **Bindings** > **Add** > **D1 Database**中，变量名称输入 _HITS_，数据库选择 _hits_。在Worker的 **Domains & Routes** - **Add** - **Custom domain**中添加您的刚才设定的计数器域名


### 4. 使用方法

- SVG图片

```url
https://your.domain/keyword.svg?action=view&count_bg=%233DC8C0&title_bg=%23555555&title=Visits&edge_flat=false
```

- 仓库访问统计

```url
![访问统计](https://你的服务地址/readme.svg?repo=yourname/yourrepo&action=hit)
```

| 参数        | 值                   | Description                       | 说明                         |
|------------|----------------------|-----------------------------------|----------------------------|
| action     | view / hit           | View only or hit & view           | 仅展示/点击并展示           |
| count_bg   | %23{colorcode}        | Background color of count area    | 数字部分背景颜色            |
| title_bg   | %23{colorcode}        | Background color of title area    | 标题部分背景颜色            |
| title      | TitleToShow          | Text to display                   | 展示标题                    |
| edge_flat  | true / false        | Sharp or rounded corners        | 尖角/圆角                   |

| [Shields.io](https://shields.io/) [预设](https://github.com/badges/shields/blob/master/badge-maker/lib/color.js#L6)    | [别名](https://github.com/badges/shields/blob/master/badge-maker/lib/color.js#L18)  | Hits! 示例 | Shields.io 示例 |
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

| [自定义](https://github.com/xykt/Hits/blob/main/res/style.md)       | 黑色 | 灰色 | 蓝色 | 绿色 | 紫色 | 红色 |
|---------------|-------|------|------|-------|--------|-----|
| **红色** | ![1](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/11.svg) | ![2](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/12.svg) | ![3](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/13.svg) | ![4](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/14.svg) | ![5](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/15.svg) | ![6](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/16.svg) |
| **橘色** | ![7](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/21.svg) | ![8](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/22.svg) | ![9](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/23.svg) | ![10](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/24.svg) | ![11](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/25.svg) | ![12](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/26.svg) |
| **黄色** | ![13](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/31.svg) | ![14](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/32.svg) | ![15](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/33.svg) | ![16](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/34.svg) | ![17](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/35.svg) | ![18](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/36.svg) |
| **绿色** | ![19](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/41.svg) | ![20](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/42.svg) | ![21](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/43.svg) | ![22](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/44.svg) | ![23](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/45.svg) | ![24](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/46.svg) |
| **蓝色** | ![25](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/51.svg) | ![26](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/52.svg) | ![27](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/53.svg) | ![28](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/54.svg) | ![29](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/55.svg) | ![30](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/56.svg) |
| **紫色** | ![31](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/61.svg) | ![32](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/62.svg) | ![33](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/63.svg) | ![34](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/64.svg) | ![35](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/65.svg) | ![36](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/66.svg) |
| **灰色** | ![37](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/71.svg) | ![38](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/72.svg) | ![39](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/73.svg) | ![40](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/74.svg) | ![41](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/75.svg) | ![42](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/76.svg) |


- JSON结果

| 请求 | Description | 说明 |
|-|-|-|
| ```https://your.domain/keyword?action=view``` | View only | 仅展示 |
| ```https://your.domain/keyword?action=hit``` | Hit & View | 点击并展示 |

返回JSON结果
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

- 历史统计图

```url
https://your.domain/history/keyword.svg?days=31&chartType=bar&title=Chart%20Title&width=1024&height=400&color=green
```

| 参数       | 值                   | Description                       | 说明                        |
|------------|----------------------|-----------------------------------|----------------------------|
| days       | {days_number}        | Statistical days                  | 统计天数                    |
| chartType  | bar / scatter        | Chart type: bar / scaater         | 图表类型：柱状图 / 散点图     |
| title      | {title_text}         | Chart title                       | 图表标题                    |
| width      | {width_pixels}       | Chart width                       | 图表宽度                    |
| height     | {height_pixels}      | Chart height                      | 图表高度                    |
| color      | %23{colorcode}       | Chart color                       | 图表颜色                    |

| 图表类型    | 示例                 |
|------------|----------------------|
| 散点图      | ![scatter](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/scatter.svg)|
| 柱状图      | ![bar](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/bar.svg)        |

### 🤝 贡献

- 感谢[酒神@Nodeseek](https://www.nodeseek.com/space/9#/general)，你为本项目提供了技术支持及宝贵建议

欢迎提交Pull Request或Issue！
