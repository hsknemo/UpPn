const e={},n=`<h2>切片上传</h2>
<blockquote>
<p>前端用vue3 进行开发编写, 后端用Node做对接</p>
</blockquote>
<h3>前端代码，相关的逻辑已经写入到注释</h3>
<ul>
<li>思路：
<ul>
<li>每一次点击上传按钮的时候，获取到当前的文件</li>
<li>多个文件的话 那就以文件为单位进行切片 调用 <code>up-keyword fileChunkCut </code> 方法组装数据</li>
<li>注意：如果遇到了切割大文件的性能问题，可以将切割的逻辑拆分到 <code>up-keyword WebWorker</code> 切一组就传一次，注意关闭释放 work 调用 <code>up-keyword work.terminate() </code> 方法</li>
<li>组装切片formData,根据 切片数量 循环调用接口发送</li>
<li>如果发送完毕接收到后台的上传完毕事件，则调用 merge 接口将文件合并，merge 接口传递当前上传文件的hash 值</li>
</ul>
</li>
</ul>
<pre><code class="language-js">const fileChunkCut = async (file: UploadFile, resolve: (value: boolean) =&gt; void) =&gt; {
  // 确保 file.raw 存在且为 File 类型
  if (!file || !file.raw || !file.size) {
    ElMessage.error('无效的文件')
    return resolve(false)
  }
  // 文件大小
  const fileLen = file.size
  // 每个文件片的大小
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
  // 定义当前文件的唯一的标识，后台要用这个标识进行文件合并
  const md5Key = uuidv4()
  const user = JSON.parse(useLocalStorage('user', '{}').value)
  for (let i = 0; i &lt; chunkArr.length; i++) {
    const item = chunkArr[i]
    if (!item) continue;
    const formData:FormData = new FormData()
    // 切片index 由前台传递，后台合并的时候需要用这个index 进行排序
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
        ElMessage.success(\`\${file.name} 上传成功\`)
        await delay(500)
        console.log('md5Key', md5Key)
        // 调用了merge 接口进行之前的文件合并
        await mergeFile({
          md5Key,
          toUserId: onLineUserList.curSelectUser,
          fromUserId: user.id,
        })
        resolve(true)
      }
    } catch (e) {
      console.log('上传失败', e)
      ElMessage.error('上传失败')
      resolve(false)
      break
    }
  }

}
</code></pre>
<h3>Node 端后台代码</h3>
<ul>
<li>要给前台返回每一个切片的上传状态，是否上传完毕 <code>up-keyword isUploaded </code> 字段代替</li>
<li>思路:
<ul>
<li>1 接收到前台每一个碎片formData</li>
<li>2 利用前台传递的发送用户（因为我这边的业务是要传给用户） 所以就用用户的id 进行文件夹命名</li>
<li>3 将碎片的名字利用  文件碎片的下标 + 时间戳 + md5 唯一哈希值进行命名</li>
</ul>
</li>
</ul>
<blockquote>
<p>首先是路由文件</p>
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
    // console.log('创建文件夹路径', file_path)
    fs.mkdirSync(file_path, {recursive: true})
    fs.mkdirSync(file_path + \`/\${md5Key}\`, {recursive: true})
    let lastPosition = file_path + \`/\${md5Key}\`
    // 保存上传碎片
    const chunk_write_path = path.join(lastPosition, \`/\${chunk_index}_\${md5Key}_\${time}\`)
    fs.writeFileSync(chunk_write_path, chunk.data, 'binary')

    // 记录切片数据上传状态
    let loaded = await fileChunkModel.chunkSaveAndUpdate({
      id: md5Key, // 注意这里！！ 用当前唯一的hash 记录了碎片信息，方便后续合并根据这个标识进行查询
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
<li>思路:
<ul>
<li>记录碎片上传的数量及其他信息，主要是要记录 <code>up-keyword 是否上传完毕 文件大小 本次文件的哈希值 本次文件的碎片路径(数组格式)</code></li>
<li>判断是否上传完毕，给前台状态返回，方便调用后续的合并接口</li>
</ul>
</li>
<li>fileChunkModel.chunkSaveAndUpdate 代码如下 （上传碎片数据）</li>
</ul>
<pre><code class="language-js">async chunkSaveAndUpdate(fileRecord) {
  // 用来记录是否上传完毕： 判断条件是文件碎片长度是否和已记录上传的碎片数量一致
  let fileIsUploaded = false
  let modelData = await this.getModelData()
  let chunkRecord = modelData.filter(item =&gt; item.id === fileRecord.id)


  // 第一次记录: 存在10M片以下的数据
  if (!chunkRecord.length) {
    let chunkModel = new ChunkDataModel(fileRecord)
    let set = new Set([fileRecord.chunkPath])
    if (Number(fileRecord.chunkSliceNum) === set.size) {
      chunkModel.fileIsUploaded = true
      fileIsUploaded = true
    }
    // 记录上传碎片
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
        // 记录上传碎片
        item.chunkPathArr = Array.from(set)
        item.updateTime = moment().format('YYYY-MM-DD HH:mm:ss')
        // 记录文件是否上传完毕
        item.fileIsUploaded = fileIsUploaded
      }
    })
  }
  // 保存上传记录
  await this.save(modelData)
  // 返回是否上传完毕
  return {
    fileIsUploaded,
  }
}

</code></pre>
<ul>
<li>合并 文件接口路由文件代码</li>
<li>思路：
<ul>
<li>前台传递本次合并文件的唯一标识，后台根据这个标识进行文件合并</li>
<li>其余的逻辑则是业务上面记录到对应发送人的数据库记录中，跟本次合并代码可以分离，无需关心，涉及到通知 eventEmitter
的也可以不用关心</li>
</ul>
</li>
</ul>
<pre><code class="language-js">const file_chunk_merge_func = async (req, res) =&gt; {
  try {
    let md5Key = req.body.md5Key
    let userId = req.body.toUserId
    let fromUserId = req.body.fromUserId
    // 合并文件碎片的主要逻辑
    let file = await fileChunkModel.chunkMerge({
      md5Key, userId, fromUserId
    })
    // 这个就是记录到接收人数据库中的数据，可以忽略这个逻辑
    await fileModel.createOrUpdate(new FileDataStruct({
      id: crypto.randomUUID(),
      fileName: file.fileName,
      toUser: userId,
      fromUser: fromUserId,
      insertTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    }))
    // 将新文件通知到用户
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
<li>fileChunkModel.chunkMerge 主要代码</li>
<li>思路：
<ul>
<li>传递合并的信息如 <code>up-keyword [合并标识]mergeConfig.md5Key</code></li>
<li>根据 <code>up-keyword [合并标识]mergeConfig.md5Key</code> 获取对应碎片数据 从记录表读取以唯一hash命名的记录数据</li>
<li>找到碎片数据，并排序</li>
<li>创建用户文件夹</li>
<li>创建写入流</li>
<li>根据排序循环写入碎片数据</li>
<li>将合并结果存入到指定文件夹中</li>
</ul>
</li>
</ul>
<pre><code class="language-js"> async chunkMerge(mergeConfig) {
  let modelData = await this.getModelData()
  let chunkRecord = modelData.filter(item =&gt; item.id === mergeConfig.md5Key)
  if (!chunkRecord.length) {
    throw new Error('合并文件不存在！')
  }
  if (!chunkRecord[0].fileIsUploaded) {
    throw new Error('文件上传不完整！无法合并')
  }
  let fileName = chunkRecord[0].fileName
  let pathArray = chunkRecord[0].chunkPathArr
  if (!pathArray &amp;&amp; !pathArray.length) {
    throw new Error('系统错误， 分片失败，请联系开发者！')
  }
  // 创建用户文件夹
  let user_upload_file_path = path.join(process.cwd(), \`/uploads/\${mergeConfig.userId}\`)
  fs.mkdirSync(\`\${user_upload_file_path}\`, {recursive: true})
  let now = Date.now()
  try {
    let writeFileName = \`\${now}_\${fileName}\`
    let writeStream = fs.createWriteStream(user_upload_file_path + '/' + writeFileName)

    pathArray.sort((a, b) =&gt; {
      return a.split('_')[0] - b.split('_')[0]
    })
    console.log('根据路径创建读取')
    for (let i = 0; i &lt; pathArray.length; i++) {
      const chunkBuffer = fs.readFileSync(pathArray[i]);
      writeStream.write(chunkBuffer); // 数据可能还在缓冲区
    }

    writeStream.end();
    // 删除chunk 文件
    let chunk_record_id = chunkRecord[0].id
    let chunk_path_dir = path.join(process.cwd(), \`/uploads/chunk/\${chunkRecord[0].toUser}/\${chunk_record_id}\`)
    fs.rmdirSync(chunk_path_dir, {recursive: true})

    // chunk 记录清理
    modelData = modelData.filter(item =&gt; item.id !== chunkRecord[0].id)
    await this.save(modelData)
    return {
      msg: '合并成功',
      fileName: writeFileName
    }
  } catch (e) {
    console.log(\`【error: 】\${fileName}------合并失败\`)
    throw new Error('合并失败')
  }

}
</code></pre>
<ul>
<li>文章使用技术</li>
</ul>
<pre><code class="language-up-加粗文本">Node Express
</code></pre>
<pre><code class="language-up-加粗文本">Vue3
</code></pre>
<blockquote>
<p>注意： express 上传中间件为 <code>up-keyword express-fileupload</code>, 他会将form 中的文件数据字段存到 req.files 中，可以中这里面进行读取</p>
</blockquote>
<p><code> 编辑于 2025年11月24日15:40:08</code></p>
`;export{e as attributes,n as html};
