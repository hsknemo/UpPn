const e={},n=`<h2>\u5207\u7247\u4E0A\u4F20</h2>
<blockquote>
<p>\u524D\u7AEF\u7528vue3 \u8FDB\u884C\u5F00\u53D1\u7F16\u5199, \u540E\u7AEF\u7528Node\u505A\u5BF9\u63A5</p>
</blockquote>
<h3>\u524D\u7AEF\u4EE3\u7801\uFF0C\u76F8\u5173\u7684\u903B\u8F91\u5DF2\u7ECF\u5199\u5165\u5230\u6CE8\u91CA</h3>
<ul>
<li>\u601D\u8DEF\uFF1A
<ul>
<li>\u6BCF\u4E00\u6B21\u70B9\u51FB\u4E0A\u4F20\u6309\u94AE\u7684\u65F6\u5019\uFF0C\u83B7\u53D6\u5230\u5F53\u524D\u7684\u6587\u4EF6</li>
<li>\u591A\u4E2A\u6587\u4EF6\u7684\u8BDD \u90A3\u5C31\u4EE5\u6587\u4EF6\u4E3A\u5355\u4F4D\u8FDB\u884C\u5207\u7247 \u8C03\u7528 <code>up-keyword fileChunkCut </code> \u65B9\u6CD5\u7EC4\u88C5\u6570\u636E</li>
<li>\u6CE8\u610F\uFF1A\u5982\u679C\u9047\u5230\u4E86\u5207\u5272\u5927\u6587\u4EF6\u7684\u6027\u80FD\u95EE\u9898\uFF0C\u53EF\u4EE5\u5C06\u5207\u5272\u7684\u903B\u8F91\u62C6\u5206\u5230 <code>up-keyword WebWorker</code> \u5207\u4E00\u7EC4\u5C31\u4F20\u4E00\u6B21\uFF0C\u6CE8\u610F\u5173\u95ED\u91CA\u653E work \u8C03\u7528 <code>up-keyword work.terminate() </code> \u65B9\u6CD5</li>
<li>\u7EC4\u88C5\u5207\u7247formData,\u6839\u636E \u5207\u7247\u6570\u91CF \u5FAA\u73AF\u8C03\u7528\u63A5\u53E3\u53D1\u9001</li>
<li>\u5982\u679C\u53D1\u9001\u5B8C\u6BD5\u63A5\u6536\u5230\u540E\u53F0\u7684\u4E0A\u4F20\u5B8C\u6BD5\u7684\u72B6\u6001\uFF08\u6BCF\u6B21\u63D0\u4EA4chunk \u7684\u65F6\u5019\u90FD\u8981\u8FD4\u56DE\u8FD9\u4E2A\u72B6\u6001\uFF09\uFF0C\u5219\u8C03\u7528 merge \u63A5\u53E3\u5C06\u6587\u4EF6\u5408\u5E76\uFF0Cmerge \u63A5\u53E3\u4F20\u9012\u5F53\u524D\u4E0A\u4F20\u6587\u4EF6\u7684hash \u503C</li>
</ul>
</li>
</ul>
<pre><code class="language-js">const fileChunkCut = async (file: UploadFile, resolve: (value: boolean) =&gt; void) =&gt; {
  // \u786E\u4FDD file.raw \u5B58\u5728\u4E14\u4E3A File \u7C7B\u578B
  if (!file || !file.raw || !file.size) {
    ElMessage.error('\u65E0\u6548\u7684\u6587\u4EF6')
    return resolve(false)
  }
  // \u6587\u4EF6\u5927\u5C0F
  const fileLen = file.size
  // \u6BCF\u4E2A\u6587\u4EF6\u7247\u7684\u5927\u5C0F
  const chunkSize = 1024 * 1024 * 10
  const chunkArr:Array&lt;ChunkDefine&gt; = []
  const chunkCount = Math.ceil(fileLen / chunkSize)
  for (let i = 0; i &lt; chunkCount; i++) {
    const start = i * chunkSize
    const end = Math.min(fileLen, start + chunkSize)
    const chunk = file.raw.slice(start, end)
    chunkArr.push({
      index: i,
      chunk,
      chunkSize,
      fileName: file.name,
      size: chunk.size,
      fileTotalLen: fileLen,
    })
  }
  // \u5B9A\u4E49\u5F53\u524D\u6587\u4EF6\u7684\u552F\u4E00\u7684\u6807\u8BC6\uFF0C\u540E\u53F0\u8981\u7528\u8FD9\u4E2A\u6807\u8BC6\u8FDB\u884C\u6587\u4EF6\u5408\u5E76
  const md5Key = uuidv4()
  const user = JSON.parse(useLocalStorage('user', '{}').value)
  for (let i = 0; i &lt; chunkArr.length; i++) {
    const item = chunkArr[i]
    if (!item) continue;
    const formData:FormData = new FormData()
    // \u5207\u7247index \u7531\u524D\u53F0\u4F20\u9012\uFF0C\u540E\u53F0\u5408\u5E76\u7684\u65F6\u5019\u9700\u8981\u7528\u8FD9\u4E2Aindex \u8FDB\u884C\u6392\u5E8F
    formData.append('index', String(item.index));
    formData.append('chunk', item.chunk)
    formData.append('fileName', item.fileName)
    formData.append('chunkSize', String(item.size));
    formData.append('fileTotalLen', String(item.fileTotalLen))
    formData.append('toUserId', onLineUserList.curSelectUser)
    formData.append('fromUserId', user.id)
    formData.append('md5Key', md5Key)
    formData.append('chunkSliceNum', String(chunkArr.length))
    try {
      const res = await upChunkFile(formData) as { data: isUploaded }
      if (res.data.isUploaded) {
        ElMessage.success(\`\${file.name} \u4E0A\u4F20\u6210\u529F\`)
        await delay(500)
        console.log('md5Key', md5Key)
        // \u8C03\u7528\u4E86merge \u63A5\u53E3\u8FDB\u884C\u4E4B\u524D\u7684\u6587\u4EF6\u5408\u5E76
        await mergeFile({
          md5Key,
          toUserId: onLineUserList.curSelectUser,
          fromUserId: user.id,
        })
        resolve(true)
      }
    } catch (e) {
      console.log('\u4E0A\u4F20\u5931\u8D25', e)
      ElMessage.error('\u4E0A\u4F20\u5931\u8D25')
      resolve(false)
      break
    }
  }

}
</code></pre>
<h3>Node \u7AEF\u540E\u53F0\u4EE3\u7801</h3>
<ul>
<li>\u8981\u7ED9\u524D\u53F0\u8FD4\u56DE\u6BCF\u4E00\u4E2A\u5207\u7247\u7684\u4E0A\u4F20\u72B6\u6001\uFF0C\u662F\u5426\u4E0A\u4F20\u5B8C\u6BD5 <code>up-keyword isUploaded </code> \u5B57\u6BB5\u4EE3\u66FF</li>
<li>\u601D\u8DEF:
<ul>
<li>1 \u63A5\u6536\u5230\u524D\u53F0\u6BCF\u4E00\u4E2A\u788E\u7247formData</li>
<li>2 \u5229\u7528\u524D\u53F0\u4F20\u9012\u7684\u53D1\u9001\u7528\u6237\uFF08\u56E0\u4E3A\u6211\u8FD9\u8FB9\u7684\u4E1A\u52A1\u662F\u8981\u4F20\u7ED9\u7528\u6237\uFF09 \u6240\u4EE5\u5C31\u7528\u7528\u6237\u7684id \u8FDB\u884C\u6587\u4EF6\u5939\u547D\u540D</li>
<li>3 \u5C06\u788E\u7247\u7684\u540D\u5B57\u5229\u7528  \u6587\u4EF6\u788E\u7247\u7684\u4E0B\u6807 + \u65F6\u95F4\u6233 + md5 \u552F\u4E00\u54C8\u5E0C\u503C\u8FDB\u884C\u547D\u540D</li>
</ul>
</li>
</ul>
<blockquote>
<p>\u9996\u5148\u662F\u8DEF\u7531\u6587\u4EF6</p>
</blockquote>
<pre><code class="language-js">const file_chunk_upload_func = async (req, res) =&gt; {
  try {
    let md5Key = req.body.md5Key
    let userId = req.body.toUserId
    let chunk_index = req.body.index
    let chunk = req.files.chunk
    let fromUserId = req.body.fromUserId
    let fileTotalLen = req.body.fileTotalLen
    let chunkSliceNum = req.body.chunkSliceNum
    let fileName = req.body.fileName

    let time = Date.now()
    const file_path = path.join(process.cwd(), \`/uploads/chunk/\${userId}\`)
    // console.log('\u521B\u5EFA\u6587\u4EF6\u5939\u8DEF\u5F84', file_path)
    fs.mkdirSync(file_path, {recursive: true})
    fs.mkdirSync(file_path + \`/\${md5Key}\`, {recursive: true})
    let lastPosition = file_path + \`/\${md5Key}\`
    // \u4FDD\u5B58\u4E0A\u4F20\u788E\u7247
    const chunk_write_path = path.join(lastPosition, \`/\${chunk_index}_\${md5Key}_\${time}\`)
    fs.writeFileSync(chunk_write_path, chunk.data, 'binary')

    // \u8BB0\u5F55\u5207\u7247\u6570\u636E\u4E0A\u4F20\u72B6\u6001
    let loaded = await fileChunkModel.chunkSaveAndUpdate({
      id: md5Key, // \u6CE8\u610F\u8FD9\u91CC\uFF01\uFF01 \u7528\u5F53\u524D\u552F\u4E00\u7684hash \u8BB0\u5F55\u4E86\u788E\u7247\u4FE1\u606F\uFF0C\u65B9\u4FBF\u540E\u7EED\u5408\u5E76\u6839\u636E\u8FD9\u4E2A\u6807\u8BC6\u8FDB\u884C\u67E5\u8BE2
      toUser: userId,
      fromUser: fromUserId,
      chunkPath: chunk_write_path,
      chunkTotalLen: fileTotalLen,
      chunkSliceNum,
      fileName,
    })
    res.send(SUCCESS({
      chunk_index,
      md5Key,
      time,
      isUploaded: loaded.fileIsUploaded
    }))
  } catch (e) {
    res.send(ERROR(e.message))
  }
}

</code></pre>
<ul>
<li>\u601D\u8DEF:
<ul>
<li>\u8BB0\u5F55\u788E\u7247\u4E0A\u4F20\u7684\u6570\u91CF\u53CA\u5176\u4ED6\u4FE1\u606F\uFF0C\u4E3B\u8981\u662F\u8981\u8BB0\u5F55 <code>up-keyword \u662F\u5426\u4E0A\u4F20\u5B8C\u6BD5 \u6587\u4EF6\u5927\u5C0F \u672C\u6B21\u6587\u4EF6\u7684\u54C8\u5E0C\u503C \u672C\u6B21\u6587\u4EF6\u7684\u788E\u7247\u8DEF\u5F84(\u6570\u7EC4\u683C\u5F0F)</code></li>
<li>\u5224\u65AD\u662F\u5426\u4E0A\u4F20\u5B8C\u6BD5\uFF0C\u7ED9\u524D\u53F0\u72B6\u6001\u8FD4\u56DE\uFF0C\u65B9\u4FBF\u8C03\u7528\u540E\u7EED\u7684\u5408\u5E76\u63A5\u53E3</li>
</ul>
</li>
<li>fileChunkModel.chunkSaveAndUpdate \u4EE3\u7801\u5982\u4E0B \uFF08\u4E0A\u4F20\u788E\u7247\u6570\u636E\uFF09</li>
</ul>
<pre><code class="language-js">async chunkSaveAndUpdate(fileRecord) {
  // \u7528\u6765\u8BB0\u5F55\u662F\u5426\u4E0A\u4F20\u5B8C\u6BD5\uFF1A \u5224\u65AD\u6761\u4EF6\u662F\u6587\u4EF6\u788E\u7247\u957F\u5EA6\u662F\u5426\u548C\u5DF2\u8BB0\u5F55\u4E0A\u4F20\u7684\u788E\u7247\u6570\u91CF\u4E00\u81F4
  let fileIsUploaded = false
  let modelData = await this.getModelData()
  let chunkRecord = modelData.filter(item =&gt; item.id === fileRecord.id)


  // \u7B2C\u4E00\u6B21\u8BB0\u5F55: \u5B58\u572810M\u7247\u4EE5\u4E0B\u7684\u6570\u636E
  if (!chunkRecord.length) {
    let chunkModel = new ChunkDataModel(fileRecord)
    let set = new Set([fileRecord.chunkPath])
    if (Number(fileRecord.chunkSliceNum) === set.size) {
      chunkModel.fileIsUploaded = true
      fileIsUploaded = true
    }
    // \u8BB0\u5F55\u4E0A\u4F20\u788E\u7247
    chunkModel.chunkPathArr = Array.from(set)
    modelData.push(chunkModel)
  } else {
    let set = new Set(chunkRecord[0].chunkPathArr)
    set.add(fileRecord.chunkPath)
    if (Number(fileRecord.chunkSliceNum) === set.size) {
      fileIsUploaded = true
    }
    modelData.forEach(item =&gt; {
      if (item.id === fileRecord.id) {
        // \u8BB0\u5F55\u4E0A\u4F20\u788E\u7247
        item.chunkPathArr = Array.from(set)
        item.updateTime = moment().format('YYYY-MM-DD HH:mm:ss')
        // \u8BB0\u5F55\u6587\u4EF6\u662F\u5426\u4E0A\u4F20\u5B8C\u6BD5
        item.fileIsUploaded = fileIsUploaded
      }
    })
  }
  // \u4FDD\u5B58\u4E0A\u4F20\u8BB0\u5F55
  await this.save(modelData)
  // \u8FD4\u56DE\u662F\u5426\u4E0A\u4F20\u5B8C\u6BD5
  return {
    fileIsUploaded,
  }
}

</code></pre>
<ul>
<li>\u5408\u5E76 \u6587\u4EF6\u63A5\u53E3\u8DEF\u7531\u6587\u4EF6\u4EE3\u7801</li>
<li>\u601D\u8DEF\uFF1A
<ul>
<li>\u524D\u53F0\u4F20\u9012\u672C\u6B21\u5408\u5E76\u6587\u4EF6\u7684\u552F\u4E00\u6807\u8BC6\uFF0C\u540E\u53F0\u6839\u636E\u8FD9\u4E2A\u6807\u8BC6\u8FDB\u884C\u6587\u4EF6\u5408\u5E76</li>
<li>\u5176\u4F59\u7684\u903B\u8F91\u5219\u662F\u4E1A\u52A1\u4E0A\u9762\u8BB0\u5F55\u5230\u5BF9\u5E94\u53D1\u9001\u4EBA\u7684\u6570\u636E\u5E93\u8BB0\u5F55\u4E2D\uFF0C\u8DDF\u672C\u6B21\u5408\u5E76\u4EE3\u7801\u53EF\u4EE5\u5206\u79BB\uFF0C\u65E0\u9700\u5173\u5FC3\uFF0C\u6D89\u53CA\u5230\u901A\u77E5 eventEmitter
\u7684\u4E5F\u53EF\u4EE5\u4E0D\u7528\u5173\u5FC3</li>
</ul>
</li>
</ul>
<pre><code class="language-js">const file_chunk_merge_func = async (req, res) =&gt; {
  try {
    let md5Key = req.body.md5Key
    let userId = req.body.toUserId
    let fromUserId = req.body.fromUserId
    // \u5408\u5E76\u6587\u4EF6\u788E\u7247\u7684\u4E3B\u8981\u903B\u8F91
    let file = await fileChunkModel.chunkMerge({
      md5Key, userId, fromUserId
    })
    // \u8FD9\u4E2A\u5C31\u662F\u8BB0\u5F55\u5230\u63A5\u6536\u4EBA\u6570\u636E\u5E93\u4E2D\u7684\u6570\u636E\uFF0C\u53EF\u4EE5\u5FFD\u7565\u8FD9\u4E2A\u903B\u8F91
    await fileModel.createOrUpdate(new FileDataStruct({
      id: crypto.randomUUID(),
      fileName: file.fileName,
      toUser: userId,
      fromUser: fromUserId,
      insertTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    }))
    // \u5C06\u65B0\u6587\u4EF6\u901A\u77E5\u5230\u7528\u6237
    eventEmitter.emit(PROFILE_MESSAGE_EVENT, {
      user: {
        id: userId
      }
    })
    res.send(SUCCESS(file.msg))
  } catch (e) {
    res.send(ERROR(e.message))
  }
}
</code></pre>
<ul>
<li>fileChunkModel.chunkMerge \u4E3B\u8981\u4EE3\u7801</li>
<li>\u601D\u8DEF\uFF1A
<ul>
<li>\u4F20\u9012\u5408\u5E76\u7684\u4FE1\u606F\u5982 <code>up-keyword [\u5408\u5E76\u6807\u8BC6]mergeConfig.md5Key</code></li>
<li>\u6839\u636E <code>up-keyword [\u5408\u5E76\u6807\u8BC6]mergeConfig.md5Key</code> \u83B7\u53D6\u5BF9\u5E94\u788E\u7247\u6570\u636E \u4ECE\u8BB0\u5F55\u8868\u8BFB\u53D6\u4EE5\u552F\u4E00hash\u547D\u540D\u7684\u8BB0\u5F55\u6570\u636E</li>
<li>\u627E\u5230\u788E\u7247\u6570\u636E\uFF0C\u5E76\u6392\u5E8F</li>
<li>\u521B\u5EFA\u7528\u6237\u6587\u4EF6\u5939</li>
<li>\u521B\u5EFA\u5199\u5165\u6D41</li>
<li>\u6839\u636E\u6392\u5E8F\u5FAA\u73AF\u5199\u5165\u788E\u7247\u6570\u636E</li>
<li>\u5C06\u5408\u5E76\u7ED3\u679C\u5B58\u5165\u5230\u6307\u5B9A\u6587\u4EF6\u5939\u4E2D</li>
</ul>
</li>
</ul>
<pre><code class="language-js"> async chunkMerge(mergeConfig) {
  let modelData = await this.getModelData()
  let chunkRecord = modelData.filter(item =&gt; item.id === mergeConfig.md5Key)
  if (!chunkRecord.length) {
    throw new Error('\u5408\u5E76\u6587\u4EF6\u4E0D\u5B58\u5728\uFF01')
  }
  if (!chunkRecord[0].fileIsUploaded) {
    throw new Error('\u6587\u4EF6\u4E0A\u4F20\u4E0D\u5B8C\u6574\uFF01\u65E0\u6CD5\u5408\u5E76')
  }
  let fileName = chunkRecord[0].fileName
  let pathArray = chunkRecord[0].chunkPathArr
  if (!pathArray &amp;&amp; !pathArray.length) {
    throw new Error('\u7CFB\u7EDF\u9519\u8BEF\uFF0C \u5206\u7247\u5931\u8D25\uFF0C\u8BF7\u8054\u7CFB\u5F00\u53D1\u8005\uFF01')
  }
  // \u521B\u5EFA\u7528\u6237\u6587\u4EF6\u5939
  let user_upload_file_path = path.join(process.cwd(), \`/uploads/\${mergeConfig.userId}\`)
  fs.mkdirSync(\`\${user_upload_file_path}\`, {recursive: true})
  let now = Date.now()
  try {
    let writeFileName = \`\${now}_\${fileName}\`
    let writeStream = fs.createWriteStream(user_upload_file_path + '/' + writeFileName)

    pathArray.sort((a, b) =&gt; {
      return a.split('_')[0] - b.split('_')[0]
    })
    console.log('\u6839\u636E\u8DEF\u5F84\u521B\u5EFA\u8BFB\u53D6')
    for (let i = 0; i &lt; pathArray.length; i++) {
      const chunkBuffer = fs.readFileSync(pathArray[i]);
      writeStream.write(chunkBuffer); // \u6570\u636E\u53EF\u80FD\u8FD8\u5728\u7F13\u51B2\u533A
    }

    writeStream.end();
    // \u5220\u9664chunk \u6587\u4EF6
    let chunk_record_id = chunkRecord[0].id
    let chunk_path_dir = path.join(process.cwd(), \`/uploads/chunk/\${chunkRecord[0].toUser}/\${chunk_record_id}\`)
    fs.rmdirSync(chunk_path_dir, {recursive: true})

    // chunk \u8BB0\u5F55\u6E05\u7406
    modelData = modelData.filter(item =&gt; item.id !== chunkRecord[0].id)
    await this.save(modelData)
    return {
      msg: '\u5408\u5E76\u6210\u529F',
      fileName: writeFileName
    }
  } catch (e) {
    console.log(\`\u3010error: \u3011\${fileName}------\u5408\u5E76\u5931\u8D25\`)
    throw new Error('\u5408\u5E76\u5931\u8D25')
  }

}
</code></pre>
<ul>
<li>\u6587\u7AE0\u4F7F\u7528\u6280\u672F</li>
</ul>
<pre><code class="language-up-\u52A0\u7C97\u6587\u672C">Node Express
</code></pre>
<pre><code class="language-up-\u52A0\u7C97\u6587\u672C">Vue3
</code></pre>
<blockquote>
<p>\u6CE8\u610F\uFF1A express \u4E0A\u4F20\u4E2D\u95F4\u4EF6\u4E3A <code>up-keyword express-fileupload</code>, \u4ED6\u4F1A\u5C06form \u4E2D\u7684\u6587\u4EF6\u6570\u636E\u5B57\u6BB5\u5B58\u5230 req.files \u4E2D\uFF0C\u53EF\u4EE5\u4E2D\u8FD9\u91CC\u9762\u8FDB\u884C\u8BFB\u53D6</p>
</blockquote>
<p><code> \u7F16\u8F91\u4E8E 2025\u5E7411\u670824\u65E515:40:08</code></p>
`;export{e as attributes,n as html};
