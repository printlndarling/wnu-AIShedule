function scheduleHtmlParser(html) {


  //可使用解析dom匹配，工具内置了$，跟jquery使用方法一样，直接用就可以了，参考：https://juejin.im/post/5ea131f76fb9a03c8122d6b9
  let result = []
  /**@type {import('cheerio').CheerioAPI} */
  let $ = cheerio.load(html, {
    decodeEntities: false
    
  })

// 解析表格内容
$('tbody tr').each((trIndex, tr) => {
  // 跳过前两个tr表头
  if (trIndex < 2) return;
  // console.log(`Processing row ${trIndex}`); // 调试输出
  let dayCount = 1; // 重置每行的日期计数
  $(tr).children('td.td_wrap').each((tdindex, td) => {
      const day = dayCount; // 使用dayCount而不是tdindex
      dayCount++; // 增加日期计数
      const $td = $(td);
      // console.log(`Processing day ${day}`); // 调试输出
      const divs = $td.children('div.timetable_con');
      if (divs.length === 0) {
          // console.log(`Empty slot on day ${day}`);
          return;
      }
      divs.each((divIndex, div) => {
          const course = {
              name: "",
              position: "",
              teacher: "",
              weeks: [],
              day: day,
              sections: []
          };
          const $div = $(div);
          course.name = $div.find('.title').text().replace(/★|☆/g, '').trim();
          $div.find('p').each((index, p) => {
              const $p = $(p);
              const text = $p.text().trim();
              // console.log(`Processing text: ${text}`); // 调试输出
              if ($p.find('.glyphicon-map-marker').length) {
                  course.position = text.replace(/.*?）/, '').trim().split(/\s+/).slice(1).join(' ');
              } else if ($p.find('.glyphicon-user').length) {
                  course.teacher = text.replace(/.*?）/, '').trim();
              } else if ($p.find('.glyphicon-time').length) {
                  const timeInfo = text.replace(/.*?）/, '').trim();
                  const [sectionInfo, weekInfo] = timeInfo.split(')');
                  const sectionMatch = sectionInfo.match(/\d+/g);
                  if (sectionMatch) {
                      course.sections = sectionMatch.map(Number);
                  }
                  const weekMatch = weekInfo.match(/\d+/g);
                  if (weekMatch) {
                      if (weekInfo.includes('-')) {
                          const [start, end] = weekMatch.map(Number);
                          course.weeks = Array.from({length: end - start + 1}, (_, i) => i + start);
                      } else {
                          course.weeks = weekMatch.map(Number);
                      }
                  }
                  if (weekInfo.includes('单')) {
                      course.weeks = course.weeks.filter(w => w % 2 !== 0);
                  } else if (weekInfo.includes('双')) {
                      course.weeks = course.weeks.filter(w => w % 2 === 0);
                  }
              }
          });
          // console.log("Processed course:", course); // 调试输出
          if (course.name) {
              result.push(course)
              // console.log(course);
          } else {
              // console.log(`Empty course found on day ${day}`);
          }
      });
  });
});

  return result
}