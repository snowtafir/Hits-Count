# Hits! - 基于Cloudflare Workers的综合访问计数器
<p>
<img src="https://hits.xykt.de/hits_github.svg?action=hit&count_bg=%23FFA552&title_bg=%231D8834&title=Visits&edge_flat=false&ts=${new Date().getTime()}"/> 
<a href="/LICENSE"><img src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" alt="license" /></a>  
</p> 

Hits! 一款完全免费、无需服务器、基于 **Cloudflare Workers** 和 **D1 SQL Database** 的轻量级访问计数器系统，支持JSON及GitHub风格svg图片，一分钟快速部署

## ✨ 功能特性

- 🚀 **快速部署** - 一分钟即可完成部署
- ☁️ **云端托管** - 无需维护服务器
- 💰 **完全免费** - 使用Cloudflare免费套餐
- 📊 **多站点支持** - 通过不同keyword支持多个计数器
- 🔒 **安全可靠** - 基于Cloudflare全球网络
- 🎨 **多彩展示** - 支持自定义色彩的svg及JSON输出

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

- svg图片

```
https://your.domain/keyword.svg?action=view&count_bg=%233DC8C0&title_bg=%23555555&title=Visits&edge_flat=false
```

| Parameter  | Values               | Description                       | 说明                         |
|------------|----------------------|-----------------------------------|----------------------------|
| action     | view / hit           | View only or hit & view           | 仅展示/点击并展示           |
| count_bg   | %23{colorcode}        | Background color of count area    | 数字部分背景颜色            |
| title_bg   | %23{colorcode}        | Background color of title area    | 标题部分背景颜色            |
| title      | TitleToShow          | Text to display                   | 展示标题                    |
| edge_flat  | true / false        | Sharp or rounded corners        | 尖角/圆角                   |

| [Style](https://github.com/xykt/Hits/blob/main/res/style.md)       | Black | Gray | Blue | Green | Purple | Red |
|---------------|-------|------|------|-------|--------|-----|
| **Red** | ![1](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/11.svg) | ![2](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/12.svg) | ![3](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/13.svg) | ![4](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/14.svg) | ![5](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/15.svg) | ![6](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/16.svg) |
| **Orange** | ![7](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/21.svg) | ![8](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/22.svg) | ![9](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/23.svg) | ![10](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/24.svg) | ![11](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/25.svg) | ![12](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/26.svg) |
| **Yellow** | ![13](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/31.svg) | ![14](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/32.svg) | ![15](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/33.svg) | ![16](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/34.svg) | ![17](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/35.svg) | ![18](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/36.svg) |
| **Green** | ![19](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/41.svg) | ![20](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/42.svg) | ![21](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/43.svg) | ![22](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/44.svg) | ![23](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/45.svg) | ![24](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/46.svg) |
| **Blue** | ![25](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/51.svg) | ![26](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/52.svg) | ![27](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/53.svg) | ![28](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/54.svg) | ![29](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/55.svg) | ![30](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/56.svg) |
| **Purple** | ![31](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/61.svg) | ![32](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/62.svg) | ![33](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/63.svg) | ![34](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/64.svg) | ![35](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/65.svg) | ![36](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/66.svg) |
| **Gray** | ![37](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/71.svg) | ![38](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/72.svg) | ![39](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/73.svg) | ![40](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/74.svg) | ![41](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/75.svg) | ![42](https://raw.githubusercontent.com/xykt/Hits/refs/heads/main/res/76.svg) |


- JSON结果

| Request | Description | 说明 |
|-|-|-|
| ```https://your.domain/keyword?action=view``` | View only | 仅展示 |
| ```https://your.domain/keyword?action=hit``` | Hit & View | 点击并展示 |

返回JSON结果
```
{
  "counter": "keyword",
  "action": "hit",
  "total": 1024,
  "daily": 64,
  "date": "2025-03-25",
  "timestamp": "2025-03-25T09:50:53.096Z"
}
```

### 🤝 贡献

- 感谢[酒神@Nodeseek](https://www.nodeseek.com/space/9#/general)，你为本项目提供了技术支持及宝贵建议

欢迎提交Pull Request或Issue！
