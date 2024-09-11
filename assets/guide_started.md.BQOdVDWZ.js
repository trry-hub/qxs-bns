import{ax as s,q as a,p as n,aQ as p}from"./chunks/framework.sJGiPiD7.js";const b=JSON.parse('{"title":"快速上手","description":"","frontmatter":{},"headers":[],"relativePath":"guide/started.md","filePath":"guide/started.md"}'),e={name:"guide/started.md"},l=p(`<h1 id="快速上手" tabindex="-1">快速上手 <a class="header-anchor" href="#快速上手" aria-label="Permalink to &quot;快速上手&quot;">​</a></h1><blockquote><p>⚠ 建议在初次开发的时候详细阅读该文档</p></blockquote><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># install qxs-bns</span></span>
<span class="line"><span>npm  i -g qxs-bns</span></span>
<span class="line"><span></span></span>
<span class="line"><span># clone starter</span></span>
<span class="line"><span>qxs-bns trry-hub/qxs-bns [your project name]</span></span>
<span class="line"><span></span></span>
<span class="line"><span># switch to your project directory</span></span>
<span class="line"><span>cd [your project name]</span></span>
<span class="line"><span></span></span>
<span class="line"><span># install dependence</span></span>
<span class="line"><span>pnpm i</span></span>
<span class="line"><span></span></span>
<span class="line"><span># open docs</span></span>
<span class="line"><span>pnpm docs:dev</span></span></code></pre></div><h2 id="scripts命令介绍" tabindex="-1">scripts命令介绍 <a class="header-anchor" href="#scripts命令介绍" aria-label="Permalink to &quot;scripts命令介绍&quot;">​</a></h2><ul><li><code>pnpm build</code>: 对组件库进行打包。</li><li><code>pnpm docs:dev</code>: 开启说明文档服务。</li><li><code>pnpm docs:build</code>: 打包说明文档。</li></ul><p>自动化脚本：</p><ul><li><code>pnpm comp:create [component name]</code>: 创建组件文件，并自动引入到导出根文件。</li><li><code>pnpm comp:new [component name]</code>: 创建测试环境组件文件。</li><li><code>pnpm docs:new [component name]</code>: 创建新的组件说明文档。</li><li><code>pnpm component:create [component name]</code>: <code>pnpm comp:create</code>、<code>pnpm comp:new</code>、<code>pnpm docs:new</code>合并命令，推荐使用。</li></ul><h2 id="env配置介绍" tabindex="-1">env配置介绍 <a class="header-anchor" href="#env配置介绍" aria-label="Permalink to &quot;env配置介绍&quot;">​</a></h2><p>⚠在初次开发的时候需要对根目录的.env文件进行配置修改</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># CSS预处理器 默认支持sass</span></span>
<span class="line"><span>CSS_PREPROCESSOR = &#39;scss&#39;</span></span>
<span class="line"><span># 用于添加组件命名前缀，建议采用首字母大写格式，最后生成的组件会采取类似这种格式:&lt;qxs-button&gt;&lt;/qxs-button&gt;</span></span>
<span class="line"><span>COMPONENT_NAME = &#39;Qxs&#39;</span></span></code></pre></div><h2 id="组件开发约定" tabindex="-1">组件开发约定 <a class="header-anchor" href="#组件开发约定" aria-label="Permalink to &quot;组件开发约定&quot;">​</a></h2><p>组件开发建议采用以下目录结构：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>├─packages</span></span>
<span class="line"><span>|    ├─components</span></span>
<span class="line"><span>|    |     ├─style</span></span>
<span class="line"><span>|    |     |   └index.scss          // 组件库全局样式</span></span>
<span class="line"><span>|    |     ├─src</span></span>
<span class="line"><span>|    |     |  ├─components.ts       // 导出所有组件</span></span>
<span class="line"><span>|    |     |  ├─index.ts            // 全局注册所有组件</span></span>
<span class="line"><span>|    |     |  ├─button              // 组件文件</span></span>
<span class="line"><span>|    |     |  |   ├─index.ts        // 在此进行导出和局部注册</span></span>
<span class="line"><span>|    |     |  |   ├─src             // ❗实际开发中只需要关注到src下的文件</span></span>
<span class="line"><span>|    |     |  |   |  ├─button.vue</span></span>
<span class="line"><span>|    |     |  |   |  ├─style</span></span>
<span class="line"><span>|    |     |  |   |  |   └index.scss</span></span></code></pre></div><p>建议采用命令<code>pnpm component:create [component name]</code>来创建新组件，帮助自动完成繁琐的引入和创建步骤。</p><p>如果不采用自动命令，则按照模板已创建的示例组件的模式来进行开发，这种方法会相当繁琐，因此强烈建议使用命令的方式进行新组件创建！</p><h2 id="说明文档开发约定" tabindex="-1">说明文档开发约定 <a class="header-anchor" href="#说明文档开发约定" aria-label="Permalink to &quot;说明文档开发约定&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>├─docs</span></span>
<span class="line"><span>|  ├─index.md               // 文档首页内容</span></span>
<span class="line"><span>|  ├─guide</span></span>
<span class="line"><span>|  |   ├─features.md        // 特性</span></span>
<span class="line"><span>|  |   ├─started.md         // 快速上手</span></span>
<span class="line"><span>|  |   ├─components         // 各组件的具体说明</span></span>
<span class="line"><span>|  |   |     └button.md</span></span></code></pre></div><p>只需要关注 <code>docs/guide/components/</code> 下 md 文件的编写，会自动创建新的侧边栏内容以及路由，不需要关注其它的配置文件。</p><p>⚠️注意，需要在md文件采用以下的格式来确定侧边栏的名称：</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">---</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">sider_text=&quot;按钮 button&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">---</span></span></code></pre></div><p>组件说明文档具体内容可参考示例组件。</p><h2 id="自动化部署" tabindex="-1">自动化部署 <a class="header-anchor" href="#自动化部署" aria-label="Permalink to &quot;自动化部署&quot;">​</a></h2><p>具体文件在 <code>./.github/workflows/deploy.yaml</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>示例：</span></span>
<span class="line"><span>git tag docs@v0.0.1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>git add .</span></span>
<span class="line"><span></span></span>
<span class="line"><span>git commit -m &#39;chore: update&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>git push</span></span>
<span class="line"><span></span></span>
<span class="line"><span>git push origin docs@v0.0.1</span></span></code></pre></div>`,25),i=[l];function t(c,o,d,r,h,u){return n(),a("div",null,i)}const g=s(e,[["render",t]]);export{b as __pageData,g as default};
