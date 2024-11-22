async function scheduleHtmlProvider(iframeContent = '', frameContent = '', dom = document) {
  // 内嵌loadTool工具，传入工具名即可引用公共工具函数(暂未确定公共函数，后续会开放)
  await loadTool('AIScheduleTools')

  const loginBtn = dom.getElementById("dl");

  if(loginBtn !== "undefined" && loginBtn !== null){
    await AIScheduleAlert("请您先登录~")
  }else{

      if(dom.title === "个人课表查询"){
        let userConfrim = await AIScheduleConfirm({
          titleText: '提示', // 标题内容，字体比较大，超过10个字不给显示的喔，也可以不传就不显示
          contentText: '是否一键导入课程表？', // 提示信息，字体稍小，支持使用``达到换行效果，具体使用效果建议真机测试，为必传，不传显示版本号
          cancelText: '取消', // 取消按钮文字，可不传默认为取消
          confirmText: '确认', // 确认按钮文字，可不传默认为确认
        })

        if(userConfrim){
          var table = dom.querySelector("#table1")
          return table.innerHTML
        }else{
          await AIScheduleAlert('您已取消导入课程表')
        }
      }else{

        let userConfrim = await AIScheduleConfirm({
          titleText: '提示', // 标题内容，字体比较大，超过10个字不给显示的喔，也可以不传就不显示
          contentText: '页面不正确，是否需要为您重定向到课程表页面？', // 提示信息，字体稍小，支持使用``达到换行效果，具体使用效果建议真机测试，为必传，不传显示版本号
          cancelText: '取消', // 取消按钮文字，可不传默认为取消
          confirmText: '确认', // 确认按钮文字，可不传默认为确认
        })

        if(userConfrim){
          window.location.href = "/kbcx/xskbcx_cxXskbcxIndex.html?gnmkdm=N2151&layout=default"

          
        }else{
          await AIScheduleAlert('您已取消,请手动在"教学管理信息服务平台"页面出现后，选择 信息查询 ，然后点击个人课表查询，进入后点击一键导入\n有问题请联系qq:1193558442')
        }
      }
  }
  
}