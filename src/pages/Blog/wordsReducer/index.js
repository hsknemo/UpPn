const Template = function (o) {
  this.template = `<span class="${o.name}">${o.name}</span>`
}

const Tesu = function (o) {
  this.template = `<span class="${o.orginClass}">${o.orginTxt}</span>`
}


const getTemplateBy = function (obj) { 
  var o = {
    name: obj.name
  }

  if (obj?.teshu) { 
    return new Tesu(obj).template
  }
  return new Template(obj).template
}

const matchArray = function () {
  var match = [
    'async',
    'await',
    'then',
    'switch',
    'Vue',
    'prototype',
    'import',
    'from',
    'case', 'log', 'function', 'console', 'let', 'const', 'if', 'else']
  var list = []
  match.forEach(item => { 
    list.push({
      key: item,
      reg: new RegExp(`${item}`, 'g'),
      template: getTemplateBy({
        name: item
      })
    })
  })
  list.push({
    key: '(',
    reg: /\(/g,
    template: getTemplateBy({
      name: '(',
      teshu: true,
      orginTxt: '(',
      orginClass: 'zkh'
    })
  },
    {
      key: ')',
      reg: /\)/g,
      template: getTemplateBy({
        name: ')',
        teshu: true,
        orginTxt: ')',
        orginClass: 'ykh'
      })
    },
    {
      key: '{',
      reg: /\{/g,
      template: getTemplateBy({
        name: '{',
        teshu: true,
        orginTxt: '{',
        orginClass: 'fun_zkh'
      })
    },
    {
      key: '}',
      reg: /\}/g,
      template: getTemplateBy({
        name: '}',
        teshu: true,
        orginTxt: '}',
        orginClass: 'fun_zkh'
      })
    },
    {
      key: '}',
      reg: /\}/g,
      template: getTemplateBy({
        name: '}',
        teshu: true,
        orginTxt: '}',
        orginClass: 'fun_zkh'
      })
    },
    {
      key: '.',
      reg: /([\.])/g,
      template: getTemplateBy({
        name: '.',
        teshu: true,
        orginTxt: '.'.match(/([\.])/g),
        orginClass: 'dot'
      })
    },
  ) 
  return list
}

export const markdown = function (html) {
  const keyword = matchArray()
  // 匹配声明的变量
  var matchArr = html.match(/(?<=let).+(?=\=)|(?<=const).+(?=\=)|(?<=function).+(\s)(?=\()/ig) || []
  matchArr.forEach(item => { 
    html = html.replace(new RegExp(item, 'g'), `<span class='bl'>${item}</span>`)
  })
 
  var s = html
  keyword.forEach(item => { 
    s = s.replace(item.reg, item.template)
  })
  return s
}
