const n={},e=`<h1>\u571F\u6CD5\u9020\u70AE</h1>
<br>
<h3>JS \u7684\u5F02\u6B65\u95EE\u9898, \u53EF\u80FD\u5E38\u5E38\u4F34\u968F\u7740\u6211\u4EEC, \u8BA9\u6211\u4EEC\u5728\u5F00\u53D1\u4E2D\u611F\u5230\u5934\u75BC,  \u63A5\u4E0B\u6765\u770B\u770B\u6211\u5728\u65E5\u5E38\u4F7F\u7528\u4E2D\u662F\u5982\u4F55\u89E3\u51B3\u5F02\u6B65\u7684</h3>
<br>
<p>\u6CE8:  \u4EE5\u4E0B fetch \u4E0D\u4E00\u5B9A\u662F\u6D4F\u89C8\u5668\u539F\u751F api, \u4E5F\u53EF\u80FD\u662F\u6211\u4EEC\u81EA\u5DF1\u5C01\u88C5\u7684</p>
<br>
<ul>
<li>Promise, \u8FD9\u4E2A\u4E0D\u5728\u8D58\u8FF0, \u76F4\u63A5\u4E0A\u4EE3\u7801</li>
</ul>
<pre><code class="language-js">  \u4F60\u53EF\u80FD\u9047\u5230\u8FD9\u6837\u7684\u4E00\u4E2A\u60C5\u51B5, \u4E00\u4E2A\u63A5\u53E3\u8BF7\u6C42\u5B8C\u4E4B\u540E\u4F60\u518D\u53BB\u8BF7\u6C42\u53E6\u5916\u4E00\u4E2A\u63A5\u53E3,
  \u4EE3\u7801\u9700\u8981\u5199\u5728\u4E00\u4E2A\u4E2A\u7684 then \u91CC\u9762,\u4ECE\u800C\u8FBE\u5230\u540C\u6B65\u7684\u6548\u679C

  fetch(url)
  .then(res =&gt; res.json())
  .then(
    fetch(url2)
  )
  ..then()

</code></pre>
<ul>
<li>async await
\u8FD9\u53EF\u662F\u4E00\u4E2A\u975E\u5E38\u975E\u5E38\u5B9E\u7528\u7684\u4E00\u4E2A\u65B9\u6CD5</li>
</ul>
<pre><code class="language-js">  async function() {
    var reuslt = await fetch(url).then(res =&gt; res.json())
    var result2 = await fetch(url2).then(res =&gt; res.json())
  }

</code></pre>
<ul>
<li>\u7528\u6570\u7EC4\u53BB\u4FDD\u8BC1\u5F02\u6B65\u7684\u6267\u884C\u987A\u5E8F</li>
</ul>
 <br>
<p>\u573A\u666F Vue \u9875\u9762: \u6211\u4EEC\u6709\u4FE9\u7EC4\u6570\u636E, \u9875\u9762\u4F9D\u8D56\u4E8E\u8FD9\u4E24\u4E2A\u6570\u636E\u7684\u663E\u793A, \u5982\u679C\u8FD9\u4E24\u4E2A\u6570\u636E\u6CA1\u6709\u53CA\u65F6\u8FC7\u6765, \u90A3\u4E48
\u9875\u9762, \u53EF\u80FD\u51FA\u6765\u4F46\u662F\u53EF\u80FD\u4E5F\u62A5\u9519, \u8FD9\u6837\u5C31\u4F1A\u5BFC\u81F4\u9875\u9762\u7684\u663E\u793A\u4E0D\u6B63\u5E38, \u6240\u4EE5\u6211\u4EEC\u9700\u8981\u4E00\u4E2A\u89E3\u51B3\u65B9\u6CD5</p>
<pre><code class="language-html">&lt;div v-if='showPage'&gt;{{ a[b.name] }}&lt;/div&gt;
</code></pre>
<pre><code class="language-js">   data() {
     return {
       a: {}
       b: {}
     }
   }

  // \u89E3\u51B3\u529E\u6CD5\u5C31\u5F88\u7B80\u5355
  // \u5229\u7528 Map + callback
  this.action()
  async action() {
    var tableArray = ['a', 'b']

    // \u5B58\u50A8\u6BCF\u6B21\u63A5\u53E3\u8BF7\u6C42\u7684\u7ED3\u679C\u53CA\u53EF\u4EE5\u62FF\u5230\u662F\u5426\u6839\u636E tableArray \u8BF7\u6C42\u5B8C\u7684\u957F\u5EA6
    var isValideCapture = new Map()

    // \u8865\u4E01\u51FD\u6570 \u6700\u540E\u6267\u884C\u7684
    var patchNotice = _ =&gt; {
      this.showPage = true
      // \u8FD9\u6837\u5728\u9875\u9762\u91CC\u9762\u5C31\u4E0D\u4F1A\u518D\u6709\u63A7\u5236\u53F0\u62A5\u9519\u4E86
    }

    var successCapture =  item =&gt; {
      log('\u6BCF\u6B21\u5FAA\u73AF\u8FC7\u6765\u7684\u6570\u636E', item)

      //  \u4E3A\u4E86\u4E0D\u91CD\u590D\u6570\u636E, \u5B58\u50A8\u6BCF\u6B21\u8BF7\u6C42\u8C03\u7528
      isValideCapture.set(item, item)

      // \u91CD\u70B9      
      if (isValideCapture.size === tableArray.length) {
        //  \u5B8C\u5168\u52A0\u8F7D\u597D\u4E4B\u540E\u624D\u4F1A\u901A\u77E5\u7A0B\u5E8F\u8D70\u8BE5\u8D70\u7684\u903B\u8F91
        patchNotice()
      }
    }

    var fetch = function(item, callback) {
      item()
      callback(item)
    }

    for (let i = 0; i &lt; tableArray.length; i++) {
      const tableName = tableArray[i]
      // \u6BCF\u4E00\u6B21\u5FAA\u73AF\u90FD\u4F1A\u6267\u884C\u8FD9\u4E2A \u56DE\u8C03\u51FD\u6570
      await fetch(tableName, successCapture)
    }
  },

</code></pre>
<br >
<p>\u6301\u7EED\u66F4\u65B0\u4E2D...</p>
`;export{n as attributes,e as html};
