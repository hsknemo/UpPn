const n={},t=`<h1>蛇形曲线图带节点</h1>
<h3>1. 图片</h3>
<pre><code class="language-up-img">/img/she-qu.jpg
</code></pre>
<h3>html 结构</h3>
<pre><code class="language-html"> &lt;div class=&quot;wrapper&quot;&gt;
            &lt;slot name=&quot;title&quot;&gt;&lt;/slot&gt;
            
            &lt;div class=&quot;control_p_u&quot;&gt;
            &lt;main class=&quot;p_u&quot;&gt;
               &lt;template v-for=&quot;(item, index) in stepInfo&quot;&gt;
                  &lt;div class=&quot;dashe_line_box &quot;
                  :class=&quot;getClassNameBy(item)&quot;
                  &gt;
                      &lt;div class=&quot;node_txt&quot;&gt;{{ item.name }} &lt;/div&gt;
                      &lt;div class=&quot;dashe_point&quot;&gt;&lt;/div&gt;
                      &lt;div class=&quot;dashe_line&quot;&gt;&lt;/div&gt;
                      &lt;div class=&quot;node_txt time&quot;&gt;
                        &lt;div class=&quot;l&quot;&gt;处理人:&lt;/div&gt;
                        &lt;div class=&quot;r&quot;&gt;{{ item.process_man }} &lt;/div&gt;
                      &lt;/div&gt;
                      &lt;div class=&quot;node_txt time&quot;&gt;
                         &lt;div class=&quot;l&quot;&gt;开始时间:&lt;/div&gt;
                        &lt;div class=&quot;r&quot;&gt;{{ item.process_startTime }} &lt;/div&gt;
                      &lt;/div&gt;
                      &lt;div class=&quot;node_txt time&quot;&gt;
                         &lt;div class=&quot;l&quot;&gt;结束时间:&lt;/div&gt;
                        &lt;div class=&quot;r&quot;&gt;{{ item.process_endTime }} &lt;/div&gt;
                      &lt;/div&gt;
                 &lt;/div&gt;
               
                &lt;/template&gt;
             &lt;/main&gt;
            &lt;/div&gt;
            
            
        &lt;/div&gt;


</code></pre>
<h3>scss 结构</h3>
<pre><code class="language-scss">@mixin flexStyle($align-items:unset, $justify-content:unset) {
  display: flex;
  align-items: $align-items;
  justify-content: $justify-content;
}


// U型流程信息组件样式
.control_p_u {
  margin-top: 10px;
  @include flexStyle(center, center)
}

.p_u {
  @include flexStyle();
  width: 602px;
  flex-wrap: wrap;

  .dashe_line_box {
    --activeColor: #11B254;
    --activeColorAlpha: rgba(17,178,84,0.2);

    &amp;.noneHighlight {
      --activeColor: #A0ACAB;
      --activeColorAlpha: rgba(160,172,171,0.3);
    }

    &amp;.stopList {
      &amp;:before, &amp;:after {
        content: unset !important
      }
      .dashe_line {
        border-color: transparent
      }
    }

    position: relative;
    width: 187px;
    height: 100%;
    &amp;.assBorderLeft {
      &amp;:before {
        position: absolute;
        content: '';
        width: 187px;
        height: 68px;
        left: -25px;
        top: -50%;
        border-left: 2px dashed var(--activeColor);
        border-radius: 35px 0px 35px 35px;
      }
    }


    &amp;.assBorderRight {

      &amp;:after {
        position: absolute;
        content: '';
        width: 187px;
        height: 77px;
        border-radius: 0 35px 35px 0;
        right: -25px;
        top: 50%;
        border-right: 2px dashed var(--activeColor);
      }
    }

    .dashe_line {
      width: 100%;
      height: 3px;
      border-top: 2px dashed var(--activeColor);
    }

    .node_txt {
      color: #454545;
      //margin-bottom: 5px;
      width: fit-content;
      padding: 6px;
      height: 30px;
      font-size: 14px;
      text-align: center;
      border-radius: var(--borderRadius);
      background-color: rgba(31,139,125,0.1);

      &amp;.time {
        margin-top: 5px;
        text-align: left;
        width: 184px;
        background-color: unset;
      }
    }
    .dashe_point {
      --bR: 100%;
      --size: 12px;
      width: calc(var(--size) / 2);
      height: calc(var(--size) / 2);
      background-color: var(--activeColor);
      border-radius: var(--bR);
      position: relative;
      top: 4px;
      &amp;:before {
        position: absolute;
        left: -50%;
        top: -50%;
        content: &quot;&quot;;
        width: var(--size);
        height: var(--size);
        background: var(--activeColorAlpha);
        border-radius: var(--bR);
      }
    }
  }
} 

</code></pre>
<h3>vue</h3>
<pre><code class="language-js">
let prop = {
  // props: {
  //   stepInfo: {
  //     type: Array,
  //     default: []
  //   }
  // },

  data() {
    return {
      stepInfo: [
        {
          name: 'xxxx',
          isActive: true, // 决定当前节点是否是高亮状态
          // OpeningDirection: false, // 开口方向
          process_man: 'xxxx',
          process_startTime: '2024-09-14 06:00:00',
          process_endTime: '2024-09-14 06:00:00',
        },
        {
          name: 'xxxxx',
          process_man: '处理人',
          process_startTime: '2024-09-14 06:00:00',
          process_endTime: '2024-09-14 06:00:00',
          isActive: true, // 决定当前节点是否是高亮状态
          // OpeningDirection: false, // 开口方向
        },


        {
          name: 'xxxxx',
          process_man: '处理人',
          process_startTime: '2024-09-14 06:00:00',
          process_endTime: '2024-09-14 06:00:00',
          isActive: true, // 决定当前节点是否是高亮状态
          OpeningDirection: 'right', // 开口方向
        },

        {
          name: 'xxxx',
          process_man: '处理人',
          process_startTime: '2024-09-14 06:00:00',
          process_endTime: '2024-09-14 06:00:00',
          isActive: true, // 决定当前节点是否是高亮状态
        },
        {
          name: 'xxxxx',
          process_man: '处理人',
          process_startTime: '2024-09-14 06:00:00',
          process_endTime: '2024-09-14 06:00:00',
          isActive: true, // 决定当前节点是否是高亮状态
        },
        {
          name: '(xxxx)',
          process_man: '处理人',
          process_startTime: '2024-09-14 06:00:00',
          process_endTime: '2024-09-14 06:00:00',
          isActive: true, // 决定当前节点是否是高亮状态
        },

        {
          name: '(xxxxx)',
          process_man: 'xxx',
          process_startTime: '2024-09-14 06:00:00',
          process_endTime: '2024-09-14 06:00:00',
          isActive: true, // 决定当前节点是否是高亮状态
          OpeningDirection: 'left', // 开口方向
        },

        {
          name: 'xxxx',
          process_man: 'xxxx',
          process_startTime: '2024-09-14 06:00:00',
          process_endTime: '2024-09-14 06:00:00',
          isActive: true, // 决定当前节点是否是高亮状态
          stopList: true,
        },



      ],
      OpeningDirection: {
        'left': 'assBorderLeft',
        'right': 'assBorderRight',
      }
    }
  },

  methods: {
    getClassNameBy(row) {
      let classNameArray = []
      if (!row.isActive) {
        classNameArray.push('noneHighlight')
      }

      if (row.OpeningDirection) {
        classNameArray.push(this.OpeningDirection[row.OpeningDirection])
      }

      if (row.stopList) {
        classNameArray.push('stopList')
      }


      return classNameArray
    }
  }
}




// 核心方法 TODO 待完善 (处理成想要的节点数据) 用了一个loadsh 库 注意！
uiProcessForTips(arr) {
  if (!Array.isArray(arr)) return arr
  let jumpNum = 3;
  let jumpArray = [];
  // 设置开口方向
  let dir = [&quot;right&quot;, &quot;left&quot;];
  let dirIndex = 0;

  // 分数据 分成二维数组
  for (let i = 0; i &lt; arr.length; i += jumpNum) {
    jumpArray.push(arr.slice(i, i + jumpNum));
  }


  // 处理数据
  for (let i = 0; i &lt; jumpArray.length; i++) {
    // 不够3个要前插入数据
    if (jumpArray[i].length &lt; jumpNum) {
      // 如果不够3个一行的数据 进行补录数据
      for (let j = 0; j &lt;= jumpNum - jumpArray[i].length; j++) {
        let o = Object.assign({}, {
          isOpacityZero: true,
        }, {
          // 拿有数据的内容进行填充
          ...jumpArray[i][jumpArray[i].length - 1],
        });
        jumpArray[i].push(o);
      }

      if (i % 2 === 1) {
        jumpArray[i].reverse();
      }

    }

    let next = jumpArray[i + 1];

    // 隔行设置开口方向
    // 偶数行因为用了样式及补数据的逻辑进行隐藏所以不用关心，只关心奇数行处理即可
    if ((i + 1) % 2 === 1) {
      // 数组中的最后一个
      let last = jumpArray[i][jumpArray[i].length - 1];
      // 数组第一个
      let prev = jumpArray[i][0];
      console.log({
        dirIndex,
        i
      })
      // 设置奇数行开口方向
      if (dirIndex === 1) {
        prev.OpeningDirection = dir[dirIndex]
        if ((i + 1) % 2 == 1) {
          last.OpeningDirection = dir[0]
        }

      } else {
        last.OpeningDirection = dir[dirIndex]
        if (i != 0 &amp;&amp; (i + 1) % 2 == 1) {
          prev.OpeningDirection = dir[1]
        }
      }



      if (!next) {
        // 相邻节点间是否出现指示线
        for (let j = 0; j &lt; jumpNum; j++) {
          let rowNextNode = jumpArray[i][j + 1]
          if (rowNextNode &amp;&amp; rowNextNode.isOpacityZero) {
            jumpArray[i][j].stopList = true
          }
        }

        // 隐藏虚线指示线
        jumpArray[i][jumpArray[i].length - 1].stopList = true
      }

      dirIndex += 1;
      if (dirIndex &gt; 1) {
        dirIndex = 0;
      }

    }



  }


  // _.flattenDepth([1,23, [123,1231, 54535232], [[[234, [1313], 1321, [1231]]]]],Infinity)
  // ([1, 23, 123, 1231, 54535232, 234, 1313, 1321, 1231]

  return _.flattenDepth(jumpArray,Infinity)
},

let arr = [{
  node: &quot;5&quot;,
},
  {
    node: &quot;6&quot;,
  },
  {
    node: &quot;7&quot;,
  },
  {
    node: &quot;8&quot;,
  },
  {
    node: &quot;9&quot;,
  },
  {
    node: &quot;10&quot;,
  },
  {
    node: &quot;11&quot;,
  },
  {
    node: &quot;12&quot;,
  },
  {
    node: &quot;13&quot;,
  },
  {
    node: &quot;14&quot;,
  },
];
uiProcessForTips(arr);


</code></pre>
`;export{n as attributes,t as html};
