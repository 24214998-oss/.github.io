# 公元九里两个月实习的认识与思考

根据《华润实习的认识与思考.docx》制作的静态报告网站，可直接放到 GitHub Pages，也可以在电脑上双击 `index.html` 阅读。

## 内容与板块

原文部分保留原稿的标题、七个章节、全部段落、标点和顺序，没有改写。原稿中用于排版的空段落由网页间距替代。原文之后另设“个人见闻—产生的思考—结合项目的设想”补充板块，结合个人提供的马来西亚小区照片及五项服务建议，不计入原文。下载的 Word 仍为原始文件，未加入网页补充内容。

为方便阅读，网站额外提供三组导览、章节目录、组织关系图、测算流程图和阅读进度。这些是独立的阅读辅助界面，不属于原文；图示已明确标注。高亮段落仍为原文全文。

1. 组织与职责
2. 人力与行政
3. 制度与执行
4. 统筹与成本
5. 测算与经营
6. 企业与文化
7. 收获与不足

补充板块：个人见闻 → 产生的思考 → 结合项目的设想。服务设想包含家庭小聚支持、换季居家维护、家庭设备维护记录、临时办公与安静空间、长者数字生活帮助。

## 在本地查看

解压网站包，保留所有文件的位置，然后双击 `index.html`。不需要安装软件依赖；字体使用设备已有的中文字体。不同设备的字体外观可能略有差异。

## 界面与动效

- 章节使用独立卡片，当前阅读章节会联动突出边框、编号和目录。
- 导览卡片支持鼠标跟随光晕、轻微倾斜、浮起和边框展开。
- 标题、重点段落随滚动轻柔入场；组织关系图和测算图依次呈现节点，并支持重播。
- 顶部细线和侧栏共同提示阅读进度。
- 页眉提供动效开关；系统启用“减少动态效果”时自动关闭动效。手机触屏不启用鼠标倾斜。
- 无需动画即可阅读全部原文；关闭 JavaScript 也保留正文、章节跳转和原稿下载。

## 上传到 GitHub 并启用 Pages

1. 在 GitHub 建立一个用于展示本报告的仓库。
2. 选择 **Add file → Upload files**，上传本文件夹内的所有文件和 `assets` 文件夹，然后提交。请确保 `index.html` 位于仓库根目录，不要只上传 ZIP，也不要在外面再套一层文件夹。
3. 打开仓库的 **Settings → Pages**。
4. 在 **Build and deployment → Source** 选择 **Deploy from a branch**。
5. 选择保存网站文件的分支（通常为 `main`），文件夹选择 **/(root)**，点击 **Save**。
6. 等待部署完成，使用 Pages 页面显示的网址访问网站。

操作依据：[GitHub 官方说明：配置发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

本交付包尚未上传或发布到任何 GitHub 仓库。

## 文件说明

```text
index.html                  完整报告与网页结构
styles.css                  电脑、手机和打印样式
ui-enhancements.css         卡片、动态边框和新版界面样式
script.js                   当前章节提示与阅读进度
motion.js                   滚动入场、图示动效及动效开关
.nojekyll                   静态文件发布标记
assets/
  original-report.docx      原始 Word 文件的完整副本
  source-report.json        原文段落与原稿校验值
  malaysia-community-lounge.jpg  个人提供的公共休闲区照片
CONTENT_CHECK.md            原文一致性核对结果
README.md                   本说明
```

全部网站资源使用相对路径，无外部字体、图床、接口、追踪脚本或构建步骤。JavaScript 关闭时仍可阅读全部正文，并使用章节链接和原稿下载。

## 后续修改

调整界面时主要编辑 `ui-enhancements.css`，基础排版位于 `styles.css`。原文元素都带有 `data-source-index`，对应 `assets/source-report.json` 的 Word 段落序号。若要更新报告正文，应同步更新网页、原稿副本和原文记录，并重新核对，避免版本不一致。
