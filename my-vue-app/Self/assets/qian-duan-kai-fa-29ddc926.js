const n={},e=`<h1>开发积攒的套路 🐖</h1>
<h2>Vue2 相关套路</h2>
<h3>场景 1 双组件平行传值</h3>
<p>描述: 假设 component1 组件的数据想让 组件 2 也收到, 该如何传值</p>
<ul>
<li>解决办法 1  上层组件包裹 利用 <code>v-model</code></li>
</ul>
<pre><code class="language-html">  &lt;OutSideCompo&gt; 
    &lt;compoent1 v-model='form' /&gt;

    &lt;compoent2  v-model='form' /&gt;

  &lt;/OutSideCompo&gt;
  &lt;!-- 组件内部利用 props value 去接收 --&gt;
</code></pre>
<pre><code class="language-js">  data() {
    return {
      form: {}
    }
  }
</code></pre>
<ul>
<li>解决办法 2 子组件 向 父组件传值</li>
</ul>
<pre><code class="language-html">  &lt;OutSideCompo&gt; 
    &lt;compoent1 @子组件打出的事件='onChange' /&gt;

    &lt;compoent2  v-model='form' /&gt;

  &lt;/OutSideCompo&gt;
  &lt;!-- 组件内部利用 props value 去接收 --&gt;
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
<li>解决办法 3 vue-happy-bus
这个需要安装库 针对 vue2 安装</li>
</ul>
<pre><code class="language-sh">  # pnpm 安装方式
  pnpm install vue-happy-bus

  # yarn 安装方式
  yarn add vue-happy-bus

  # npm 安装方式
  npm install vue-happy-bus
</code></pre>
<ul>
<li>如何喂食? 🍭</li>
</ul>
<pre><code class="language-js"> // main.js

 import busFactory from 'vue-happy-bus'

 Vue.prototype.$busFactory = busFactory
 
</code></pre>
<ul>
<li>组件内部如何使用</li>
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
<li>另外一个组件内部接收🍬</li>
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
<pre><code class="language-js">  // 实现方法多种多样, vuex 也可以, 但是比较麻烦了
</code></pre>
`;export{n as attributes,e as html};
