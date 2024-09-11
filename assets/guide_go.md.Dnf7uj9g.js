import{ax as s,q as a,p as n,aQ as e}from"./chunks/framework.sJGiPiD7.js";const b=JSON.parse('{"title":"开发攻略","description":"","frontmatter":{},"headers":[],"relativePath":"guide/go.md","filePath":"guide/go.md"}'),p={name:"guide/go.md"},t=e(`<h1 id="开发攻略" tabindex="-1">开发攻略 <a class="header-anchor" href="#开发攻略" aria-label="Permalink to &quot;开发攻略&quot;">​</a></h1><h3 id="_1、修改环境变量" tabindex="-1">1、修改环境变量 <a class="header-anchor" href="#_1、修改环境变量" aria-label="Permalink to &quot;1、修改环境变量&quot;">​</a></h3><p><code>./.env</code>文件下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># CSS预处理器 默认支持sass</span></span>
<span class="line"><span>CSS_PREPROCESSOR = &#39;scss&#39;</span></span>
<span class="line"><span># 用于添加组件命名前缀，建议采用首字母大写格式，最后生成的组件会变成&lt;qxs-button&gt;&lt;/qxs-button&gt;这种格式</span></span>
<span class="line"><span>COMPONENT_NAME = &#39;Vc&#39;</span></span></code></pre></div><h3 id="_2、创建约定文件" tabindex="-1">2、创建约定文件 <a class="header-anchor" href="#_2、创建约定文件" aria-label="Permalink to &quot;2、创建约定文件&quot;">​</a></h3><p>建议运行 <code>pnpm component:create [组件名]</code>命令来创建组件开发需要用到的文件。</p><p>详细介绍上述这条命令做了哪些操作（以创建button组件为例）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>├─packages</span></span>
<span class="line"><span>|    ├─components</span></span>
<span class="line"><span>|    |     ├─style</span></span>
<span class="line"><span>|    |     |   └index.scss       // 自动引入&#39;button/src/style/index.scss&#39;的样式，作为全局样式</span></span>
<span class="line"><span>|    |     ├─src</span></span>
<span class="line"><span>|    |     |  ├─components.ts          // 自动引入&#39;button/src/index.ts&#39;导出的组件</span></span>
<span class="line"><span>|    |     |  ├─index.ts</span></span>
<span class="line"><span>|    |     |  ├─button</span></span>
<span class="line"><span>|    |     |  |   ├─index.ts           // 自动引入src下的组件，并且对组件进行注册</span></span>
<span class="line"><span>|    |     |  |   ├─src    // 自动创建组件开发使用到的文件</span></span>
<span class="line"><span>|    |     |  |   |  ├─button.vue</span></span>
<span class="line"><span>|    |     |  |   |  ├─style</span></span>
<span class="line"><span>|    |     |  |   |  |   └index.scss</span></span>
<span class="line"><span>├─docs</span></span>
<span class="line"><span>|  ├─guide</span></span>
<span class="line"><span>|  |   ├─components</span></span>
<span class="line"><span>|  |   |     └button.md        // 自动创建组件文档说明需要的文件</span></span></code></pre></div><ul><li>我们在组件开发的过程中只需要关注 <code>button/src</code> 下文件的编写。</li><li>在编写说明文档的时候只需要关注 <code>docs/guide/components/</code>下的文档内容。</li></ul><h3 id="_3、组件测试" tabindex="-1">3、组件测试 <a class="header-anchor" href="#_3、组件测试" aria-label="Permalink to &quot;3、组件测试&quot;">​</a></h3><p>qxs-bns已经帮助全局引入packages下的组件，我们只需要在文档中直接编写就可以看到组件。</p><p>也可以使用内置的测试环境对组件进行测试，我们已经对运行环境做了约定式路由处理，直接在pages下创建文件就可以自动映射对应的路由，类似于Nuxt。</p>`,12),l=[t];function c(i,o,d,r,u,h){return n(),a("div",null,l)}const g=s(p,[["render",c]]);export{b as __pageData,g as default};
