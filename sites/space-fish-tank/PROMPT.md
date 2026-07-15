# Prompt

## Original Page Prompt

再来一个新页面：使用React、Tailwind CSS和Lucide React图标为一家名为“Foldcraft”的创意工作室创建全屏英雄登陆页面。该页面只有一个viewport-height部分，包含一个循环的背景视频、一个响应式导航条、一个移动菜单和交错动画的英雄文本。

视频背景：

- URL: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4
- 属性：自动播放，静音，循环，playsInline
- 样式：绝对定位，全宽度/高度，对象覆盖，对象位置在70%水平中心
- 视频位于所有内容后面（没有z-index或z-0）

字体：

- 谷歌字体：Geist（权重300-700），通过 `<link>` 在 `index.html` 中加载
- Tailwind配置扩展fontFamily与Geist：`['Geist', 'sans-serif']`
- 应用于根容器上的 `font-geist`
- `-moz-osx-font-smoothing: grayscale`

Root Container：

- `relative h-screen w-full overflow-hidden bg-black font-geist`

Navbar (z-30)：

- Flex, space-between， padding: `px-6 py-5 md:px-12 lg:px-16`
- 左侧：Logo文本“Foldcraft”（`text-lg font-semibold tracking-tight text-white sm:text-xl`）然后是桌面导航链接（在移动设备上隐藏，在md+上伸缩）
- 导航链接：Home， Projects, Studio, Reach Us （`text-sm text-white/80`，悬停：`text-white`，过渡色）
- 右侧（桌面）：“Let's Talk”按钮（`rounded-lg bg-white px-5 py-2 text-sm font-medium text-black hover:scale-105 transition-transform`）
- 右侧（移动端）：汉堡包切换按钮（40x40, z-50），带有lucide-react的动画Menu/X图标。菜单向外旋转90度，X向内旋转，不透明度和缩放过渡（持续时间300）。按钮处于活动状态：scale为90。

Mobile Overlay Menu：

- 过渡：`duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`
- 在 `h-screen opacity-100` 和 `h-0 opacity-0 pointer-events-none` 之间切换
- 内部内容：垂直居中（`flex h-full flex-col justify-center px-8`），带有延迟淡出+translate动画（`delay-100`, `translate-y-8`）
- 链接：Home， Projects, Studio, Reach Us （`text-3xl font-medium text-white/90 hover:text-white`）
- 按钮：“Let's Talk”（`mt-6 rounded-full bg-white px-8 py-3.5 text-base font-medium text-black hover:scale-105`）
- 所有链接/按钮调用 `setMobileMenuOpen(false)` on click

Hero Content (z-10)：

- Flex column, justify-between，fill剩余高度：`h-[calc(100vh-80px)]`
- Padding: `px-6 pb-10 pt-12 sm:px-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16`

Top Section (max-w-3xl)：

- Badge：“Brand & Visual Storytelling”（`text-xs sm:text-sm text-white/90`），with `animate-[fadeSlideUp_0.8s_ease_0.2s_both]`, margin-bottom 4（sm:6）
- 标题 h1: `Shaping Visual / narratives, / one pixel at a time.` with `<br/>` 换行符
- Sizing: `text-3xl sm:text-5xl md:text-6xl lg:text-7xl`
- Style: `font-medium leading-[1.1] tracking-tight text-white`
- Animation: `animate-[fadeSlideUp_0.8s_ease_0.4s_both]`

Bottom Section：

- 段落：“通过工艺、动作和对美的无尽追求，将愿景变为现实。”
- 样式：`text-sm sm:text-base md:text-lg leading-relaxed text-white/60 max-w-sm sm:max-w-lg mb-5 sm:mb-6`
- 动画：`animate-[fadeSlideUp_0.8s_ease_0.7s_both]`
- CTA按钮：“Explore Work” with ArrowRight图标（大小16）
- 样式：`rounded-lg bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-black hover:scale-105 transition-transform inline-flex items-center gap-2`
- 动画：`animate-[fadeSlideUp_0.8s_ease_0.9s_both]`

CSS动画（in `index.css`）：

```css
@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

CSS重置（in `index.css`）：

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

依赖：React，lucide-react（右箭头，菜单，X），Tailwind CSS，谷歌字体Geist。

## Follow-Up Requests

- 我生成重复了，现在我已经删除了一个，现在我希望你帮我重新命名这个站点，它的名字是空间鱼缸。
- 同时把站点中依赖的视频资源下载到本地避免失效。
