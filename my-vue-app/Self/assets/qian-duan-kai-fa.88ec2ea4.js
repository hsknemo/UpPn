const n={},e=`<h1>\u5F00\u53D1\u79EF\u6512\u7684\u5957\u8DEF \u{1F416}</h1>
<h2>Vue2 \u76F8\u5173\u5957\u8DEF</h2>
<h3>\u573A\u666F 1 \u53CC\u7EC4\u4EF6\u5E73\u884C\u4F20\u503C</h3>
<p>\u63CF\u8FF0: \u5047\u8BBE component1 \u7EC4\u4EF6\u7684\u6570\u636E\u60F3\u8BA9 \u7EC4\u4EF6 2 \u4E5F\u6536\u5230, \u8BE5\u5982\u4F55\u4F20\u503C</p>
<ul>
<li>\u89E3\u51B3\u529E\u6CD5 1  \u4E0A\u5C42\u7EC4\u4EF6\u5305\u88F9 \u5229\u7528 <code>v-model</code></li>
</ul>
<pre><code class="language-html">  &lt;OutSideCompo&gt; 
    &lt;compoent1 v-model='form' /&gt;

    &lt;compoent2  v-model='form' /&gt;

  &lt;/OutSideCompo&gt;
  &lt;!-- \u7EC4\u4EF6\u5185\u90E8\u5229\u7528 props value \u53BB\u63A5\u6536 --&gt;
</code></pre>
<pre><code class="language-js">  data() {
    return {
      form: {}
    }
  }
</code></pre>
<ul>
<li>\u89E3\u51B3\u529E\u6CD5 2 \u5B50\u7EC4\u4EF6 \u5411 \u7236\u7EC4\u4EF6\u4F20\u503C</li>
</ul>
<pre><code class="language-html">  &lt;OutSideCompo&gt; 
    &lt;compoent1 @\u5B50\u7EC4\u4EF6\u6253\u51FA\u7684\u4E8B\u4EF6='onChange' /&gt;

    &lt;compoent2  v-model='form' /&gt;

  &lt;/OutSideCompo&gt;
  &lt;!-- \u7EC4\u4EF6\u5185\u90E8\u5229\u7528 props value \u53BB\u63A5\u6536 --&gt;
</code></pre>
<pre><code class="language-js">  data() {
    return {
      form: {}
    }
  },
  methods: {
    onChange(val) {
      this.form = val
    }
  }
</code></pre>
<ul>
<li>\u89E3\u51B3\u529E\u6CD5 3 vue-happy-bus
\u8FD9\u4E2A\u9700\u8981\u5B89\u88C5\u5E93 \u9488\u5BF9 vue2 \u5B89\u88C5</li>
</ul>
<pre><code class="language-sh">  # pnpm \u5B89\u88C5\u65B9\u5F0F
  pnpm install vue-happy-bus

  # yarn \u5B89\u88C5\u65B9\u5F0F
  yarn add vue-happy-bus

  # npm \u5B89\u88C5\u65B9\u5F0F
  npm install vue-happy-bus
</code></pre>
<ul>
<li>\u5982\u4F55\u5582\u98DF? \u{1F36D}</li>
</ul>
<pre><code class="language-js"> // main.js

 import busFactory from 'vue-happy-bus'

 Vue.prototype.$busFactory = busFactory
 
</code></pre>
<ul>
<li>\u7EC4\u4EF6\u5185\u90E8\u5982\u4F55\u4F7F\u7528</li>
</ul>
<pre><code class="language-html">&lt;component1&gt;
</code></pre>
<pre><code class="language-js">  data() {
    return {
      bus: this.$busFactory(this)
    }
  }

  methods: {
    onChange(val) {
      this.bus.$emit('change', val)
    }
  }
</code></pre>
<ul>
<li>\u53E6\u5916\u4E00\u4E2A\u7EC4\u4EF6\u5185\u90E8\u63A5\u6536\u{1F36C}</li>
</ul>
<pre><code class="language-html">    &lt;compoent2 /&gt;

</code></pre>
<pre><code class="language-js">  created() {
    this.bus.$on('change', (val) =&gt; {
      this.form = val
    })
  },
  data() {
    return {
      bus: this.$busFactory(this)
    }
  }
</code></pre>
<pre><code class="language-js">  // \u5B9E\u73B0\u65B9\u6CD5\u591A\u79CD\u591A\u6837, vuex \u4E5F\u53EF\u4EE5, \u4F46\u662F\u6BD4\u8F83\u9EBB\u70E6\u4E86
</code></pre>
`;export{n as attributes,e as html};
