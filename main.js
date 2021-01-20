// /parcel 会在默认代码外加一个作用域 
// 有了hashmap 没有必要直接写html 可以通过遍历hashmap生成
// 
// 

const $addsitecontainer =$('.add-site-container')
 //  add 最后一个添加按钮
 // 所有的事情都是渲染hashmap 让结构变得简单一些
const $addbuton=$('.addbuton')
const x=localStorage.getItem('x')
const xObject=JSON.parse(x)
const hashMap=xObject || [{
    logo:'G',url:'https://www.google.com/',
    word:'Google'
},{
    logo:'B',url:'www.bing.com',
    word:'必应搜索'
},]
// 移除https方法
const removeWord=(url)=>{
    return url
    .replace('https://','')
    .replace('http://','')
    .replace('www.', '')
    // 删除/开头的内容
    .replace(/\/.*/, '')
    
}
const render=()=>{
    $addsitecontainer.find('div:not(.addbuton)').remove()
    hashMap.forEach((node,index) => {
        const $sitebox= $(`
        <div title="${node.word}" class="site-box">
       
        <div class="word">${node.logo}</div>
       <div>
         <p>${removeWord(node.word)}</p>
         <div class="close"><i class="iconfont icon-guanbi"></i></div>
       </div>
  
      </div> `).insertBefore($addbuton)
      $sitebox.on('click',()=>{
          window.open(node.url)
      })
       $sitebox.on('click','.close',(e)=>{
           console.log('阻止事件冒泡')
           e.stopPropagation()
           hashMap.splice(index,1)
        //    删除完以后重新渲染一下
           render()
       })
    });
}
render()



$('.addbuton')
 .on('click',()=>{
    let url= window.prompt('添加网址是？')
  if(url.indexOf('http')!==0) {
       url='https://'+url
  }

//    console.log($addbuton,'addbuton')
  hashMap.push({
      logo:removeWord(url)[0].toUpperCase(),
      type:'text',
      url:url,
      word:url
    })
   render()
  
 })
//  页面关闭的时候存储
window.onbeforeunload=()=>{
    const string = JSON.stringify(
        hashMap
    )
    window.localStorage.setItem('x',string)
}

$(document).on('keypress',(e)=>{
   const {key}=e
   for(let i=0;i<hashMap.length;i++) {
       if(hashMap[i].logo.toLowerCase()===key) {
         window.open(hashMap[i].url)
       }

   }
})
console.log( xObject)