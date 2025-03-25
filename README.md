# Hits! - General purpose hits counter based on Cloudflare Workers （[中文说明](https://github.com/xykt/Hits/blob/main/README_CN.md)）
<p>
<img src="https://hits.xykt.de/hits_github.svg?action=hit&count_bg=%23FFA552&title_bg=%231D8834&title=Visits&edge_flat=false&ts=${new Date().getTime()}"/> 
<a href="/LICENSE"><img src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" alt="license" /></a>  
</p> 

Hits! A completely free, serverless, lightweight access counter system based on **Cloudflare Workers** and **D1 SQL Database**, supporting JSON and GitHub-style SVG images, with quick deployment in just one minute

## ✨ Features

- 🚀 **Quick Deployment** - Deploy in just one minute
- ☁️ **Cloud Hosting** - No server maintenance required
- 💰 **Completely Free** - Utilizes Cloudflare's free plan
- 📊 **Multi-Site Support** - Supports multiple counters via different keywords
- 🔒 **Secure and Reliable** - Powered by Cloudflare's global network
- 👀 **Colorful Display** - Supports customizable color SVG and JSON output

## 🛠 Quick Deployment Guide

### 1. Create D1 Database

Go to the Cloudflare Dashboard, navigate to **Storage & Databases** > **D1 SQL Database** > **Create**, name it _hits_, and run the following SQL to create the table in Console

```sql
CREATE TABLE counters ( name TEXT PRIMARY KEY, count INTEGER DEFAULT 0 );
```

### 2. Create Workers

Navigate to **Workers & Pages** > **Create application** > **Create Worker**, name it _hits_. Copy the [hit.js](https://github.com/xykt/Hits/blob/main/hits.js) code into the Worker editor. Modify line 7 to change the domain to your counter's domain, and set the keyword. Each counter corresponds to a keyword. For subsequent counters, simply add a new keyword.


### 3. Configure Bindings

In the Worker **Settings** > **Bindings** > **Add** > **D1 Database**, enter the variable name as _HITS_, and select the _hits_ database. In **Domains & Routes** - **Add** - **Custom domain**, add your newly configured counter domain.


#### 4. How to Use

- SVG Image

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

| Example       | Black | Gray | Blue | Green | Purple | Red |
|---------------|-------|------|------|-------|--------|-----|
| **Red** | ![1](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23F27D85&title_bg=%23222222&title=Black&edge_flat=false) | ![2](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23F27D85&title_bg=%236A737D&title=Gray&edge_flat=false) | ![3](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23F27D85&title_bg=%2300599C&title=Blue&edge_flat=false) | ![4](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23F27D85&title_bg=%231D8834&title=Green&edge_flat=false) | ![5](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23F27D85&title_bg=%23552C95&title=Purple&edge_flat=false) | ![6](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23F27D85&title_bg=%23BD2C00&title=Red&edge_flat=false) |
| **Orange** | ![7](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFA552&title_bg=%23222222&title=Black&edge_flat=false) | ![8](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFA552&title_bg=%236A737D&title=Gray&edge_flat=false) | ![9](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFA552&title_bg=%2300599C&title=Blue&edge_flat=false) | ![10](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFA552&title_bg=%231D8834&title=Green&edge_flat=false) | ![11](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFA552&title_bg=%23552C95&title=Purple&edge_flat=false) | ![12](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFA552&title_bg=%23BD2C00&title=Red&edge_flat=false) |
| **Yellow** | ![13](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFD166&title_bg=%23222222&title=Black&edge_flat=false) | ![14](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFD166&title_bg=%236A737D&title=Gray&edge_flat=false) | ![15](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFD166&title_bg=%2300599C&title=Blue&edge_flat=false) | ![16](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFD166&title_bg=%231D8834&title=Green&edge_flat=false) | ![17](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFD166&title_bg=%23552C95&title=Purple&edge_flat=false) | ![18](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23FFD166&title_bg=%23BD2C00&title=Red&edge_flat=false) |
| **Green** | ![19](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396E6A7&title_bg=%23222222&title=Black&edge_flat=false) | ![20](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396E6A7&title_bg=%236A737D&title=Gray&edge_flat=false) | ![21](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396E6A7&title_bg=%2300599C&title=Blue&edge_flat=false) | ![22](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396E6A7&title_bg=%231D8834&title=Green&edge_flat=false) | ![23](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396E6A7&title_bg=%23552C95&title=Purple&edge_flat=false) | ![24](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396E6A7&title_bg=%23BD2C00&title=Red&edge_flat=false) |
| **Blue** | ![25](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396BFF9&title_bg=%23222222&title=Black&edge_flat=false) | ![26](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396BFF9&title_bg=%236A737D&title=Gray&edge_flat=false) | ![27](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396BFF9&title_bg=%2300599C&title=Blue&edge_flat=false) | ![28](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396BFF9&title_bg=%231D8834&title=Green&edge_flat=false) | ![29](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396BFF9&title_bg=%23552C95&title=Purple&edge_flat=false) | ![30](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%2396BFF9&title_bg=%23BD2C00&title=Red&edge_flat=false) |
| **Purple** | ![31](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23A889FF&title_bg=%23222222&title=Black&edge_flat=false) | ![32](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23A889FF&title_bg=%236A737D&title=Gray&edge_flat=false) | ![33](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23A889FF&title_bg=%2300599C&title=Blue&edge_flat=false) | ![34](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23A889FF&title_bg=%231D8834&title=Green&edge_flat=false) | ![35](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23A889FF&title_bg=%23552C95&title=Purple&edge_flat=false) | ![36](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23A889FF&title_bg=%23BD2C00&title=Red&edge_flat=false) |
| **Gray** | ![37](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23BFBFBF&title_bg=%23222222&title=Black&edge_flat=false) | ![38](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23BFBFBF&title_bg=%236A737D&title=Gray&edge_flat=false) | ![39](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23BFBFBF&title_bg=%2300599C&title=Blue&edge_flat=false) | ![40](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23BFBFBF&title_bg=%231D8834&title=Green&edge_flat=false) | ![41](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23BFBFBF&title_bg=%23552C95&title=Purple&edge_flat=false) | ![42](https://hits.xykt.de/hits_github.svg?action=view&count_bg=%23BFBFBF&title_bg=%23BD2C00&title=Red&edge_flat=false) |

- JSON Result

| Request | Description | 说明 |
|-|-|-|
| ```https://your.domain/keyword?action=view``` | View only | 仅展示 |
| ```https://your.domain/keyword?action=hit``` | Hit & View | 点击并展示 |

Return JSON 返回JSON结果
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

### Acknowledgements 贡献

Welcome to submit Pull Request or Issue! 欢迎提交Pull Request或Issue！
