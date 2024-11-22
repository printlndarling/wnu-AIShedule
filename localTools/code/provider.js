async function scheduleHtmlProvider(iframeContent = '', frameContent = '', dom = document) {
  // 加载工具
  await loadTool('AIScheduleTools');

  const loginBtn = dom.getElementById("dl");

  // 检查用户是否已登录
  if (loginBtn !== undefined && loginBtn !== null) {
    await AIScheduleAlert("请您在登录成功后选择 信息查询，点击 “个人课表查询”，进入后再点击 “一键导入” 按钮。\n有问题请联系qq:1193558442");
    return;
  }

  // 检查是否在“个人课表查询”页面
  if (dom.title === "个人课表查询") {
    const userConfirm = await AIScheduleConfirm({
      titleText: '提示',
      contentText: '是否一键导入课程表？',
      cancelText: '取消',
      confirmText: '确认',
    });

    if (userConfirm) {
      const table = dom.querySelector("#table1");
      return table ? table.innerHTML : null;
    } else {
      await AIScheduleAlert('您已取消导入课程表 \n如有问题请联系qq:1193558442');
    }
  } else {
    // 提示用户手动进入“个人课表查询”页面
    await AIScheduleAlert('请您在手动进入“教学管理信息服务平台”后，选择“信息查询”，再点击“个人课表查询”，进入后点击“一键导入”按钮即可。\n有问题请联系qq:1193558442');
  }
}