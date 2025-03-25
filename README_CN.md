# Hits! - 基于Workers的综合访问计数器
<p>
<img src="https://hits.xykt.de/hits_github.svg?action=hit&count_bg=%2396E6A7&title_bg=%23555555&title=Visits&edge_flat=false&ts=${new Date().getTime()}"/> 
<a href="/LICENSE"><img src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" alt="license" /></a>  
</p> 

Hits! 一款完全免费、无需服务器、基于 **Cloudflare Workers** 和 **D1 SQL Database** 的轻量级访问计数器系统，支持JSON及GitHub风格svg图片，一分钟快速部署

## ✨ 功能特性

- 🚀 **快速部署** - 一分钟即可完成部署
- ☁️ **云端托管** - 无需维护服务器
- 💰 **完全免费** - 使用Cloudflare免费套餐
- 📊 **多站点支持** - 通过不同keyword支持多个计数器
- 🔒 **安全可靠** - 基于Cloudflare全球网络
- 👀 **多彩展示** - 支持自定义色彩的svg及JSON输出

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


#### 4. 使用方法

- svg图片

```
https://your.domain/hits_github.svg?action=view&count_bg=%233DC8C0&title_bg=%23555555&title=Visits&edge_flat=false
```

| Parameter  | Values               | Description                       | 说明                         |
|------------|----------------------|-----------------------------------|----------------------------|
| action     | view / hit           | View only or hit & view           | 仅展示/点击并展示           |
| count_bg   | %23{colorcode}        | Background color of count area    | 数字部分背景颜色            |
| title_bg   | %23{colorcode}        | Background color of title area    | 标题部分背景颜色            |
| title      | TitleToShow          | Text to display                   | 展示标题                    |
| edge_flat  | true / false        | Sharp or rounded corners        | 尖角/圆角                   |

| Example       | Black | Gray | Blue | Green | Purple | Red |
|---------------|-------|------|------|-------|--------|-----|
| **Red** | ![1](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23F27D85&title_bg=%23222222&title=Black&edge_flat=false) | ![2](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23F27D85&title_bg=%236A737D&title=Gray&edge_flat=false) | ![3](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23F27D85&title_bg=%2300599C&title=Blue&edge_flat=false) | ![4](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23F27D85&title_bg=%231D8834&title=Green&edge_flat=false) | ![5](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23F27D85&title_bg=%23552C95&title=Purple&edge_flat=false) | ![6](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23F27D85&title_bg=%23BD2C00&title=Red&edge_flat=false) |
| **Orange** | ![7](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFA552&title_bg=%23222222&title=Black&edge_flat=false) | ![8](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFA552&title_bg=%236A737D&title=Gray&edge_flat=false) | ![9](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFA552&title_bg=%2300599C&title=Blue&edge_flat=false) | ![10](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFA552&title_bg=%231D8834&title=Green&edge_flat=false) | ![11](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFA552&title_bg=%23552C95&title=Purple&edge_flat=false) | ![12](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFA552&title_bg=%23BD2C00&title=Red&edge_flat=false) |
| **Yellow**<br> | ![13](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFD166&title_bg=%23222222&title=Black&edge_flat=false) | ![14](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFD166&title_bg=%236A737D&title=Gray&edge_flat=false) | ![15](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFD166&title_bg=%2300599C&title=Blue&edge_flat=false) | ![16](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFD166&title_bg=%231D8834&title=Green&edge_flat=false) | ![17](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFD166&title_bg=%23552C95&title=Purple&edge_flat=false) | ![18](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFD166&title_bg=%23BD2C00&title=Red&edge_flat=false) |
| **Green**<br> | ![19](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396E6A7&title_bg=%23222222&title=Black&edge_flat=false) | ![20](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396E6A7&title_bg=%236A737D&title=Gray&edge_flat=false) | ![21](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396E6A7&title_bg=%2300599C&title=Blue&edge_flat=false) | ![22](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396E6A7&title_bg=%231D8834&title=Green&edge_flat=false) | ![23](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396E6A7&title_bg=%23552C95&title=Purple&edge_flat=false) | ![24](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396E6A7&title_bg=%23BD2C00&title=Red&edge_flat=false) |
| **Blue**<br> | ![25](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396BFF9&title_bg=%23222222&title=Black&edge_flat=false) | ![26](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396BFF9&title_bg=%236A737D&title=Gray&edge_flat=false) | ![27](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396BFF9&title_bg=%2300599C&title=Blue&edge_flat=false) | ![28](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396BFF9&title_bg=%231D8834&title=Green&edge_flat=false) | ![29](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396BFF9&title_bg=%23552C95&title=Purple&edge_flat=false) | ![30](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396BFF9&title_bg=%23BD2C00&title=Red&edge_flat=false) |
| **Purple**<br> | ![31](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23A889FF&title_bg=%23222222&title=Black&edge_flat=false) | ![32](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23A889FF&title_bg=%236A737D&title=Gray&edge_flat=false) | ![33](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23A889FF&title_bg=%2300599C&title=Blue&edge_flat=false) | ![34](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23A889FF&title_bg=%231D8834&title=Green&edge_flat=false) | ![35](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23A889FF&title_bg=%23552C95&title=Purple&edge_flat=false) | ![36](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23A889FF&title_bg=%23BD2C00&title=Red&edge_flat=false) |
| **Gray**<br> | ![37](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23BFBFBF&title_bg=%23222222&title=Black&edge_flat=false) | ![38](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23BFBFBF&title_bg=%236A737D&title=Gray&edge_flat=false) | ![39](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23BFBFBF&title_bg=%2300599C&title=Blue&edge_flat=false) | ![40](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23BFBFBF&title_bg=%231D8834&title=Green&edge_flat=false) | ![41](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23BFBFBF&title_bg=%23552C95&title=Purple&edge_flat=false) | ![42](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23BFBFBF&title_bg=%23BD2C00&title=Red&edge_flat=false) |

- JSON结果

| Request | Description | 说明 |
|-|-|-|
| ```https://your.domain/hits_github.svg?action=view``` | View only | 仅展示 |
| ```https://your.domain/hits_github.svg?action=hit``` | Hit & View | 点击并展示 |

返回JSON结果
```
{
  "counter": "counter_name",
  "action": "hit",
  "total": 135062,
  "daily": 1091,
  "date": "2025-03-25",
  "timestamp": "2025-03-25T09:50:53.096Z"
}
```

### 🤝 贡献

欢迎提交Pull Request或Issue！
