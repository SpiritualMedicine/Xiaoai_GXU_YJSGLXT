function scheduleHtmlParser(html) {
    //除函数名外都可编辑
    //传入的参数为上一步函数获取到的html
    //可使用正则匹配
    //可使用解析dom匹配，工具内置了$，跟jquery使用方法一样，直接用就可以了，参考：https://juejin.im/post/5ea131f76fb9a03c8122d6b9
    //以下为示例，您可以完全重写或在此基础上更改

    let result = []
    let bbb = $('#tabCT tbody td')
    let ccc = $("#tabCT th").slice(2,9).toArray()
    for (let u = 0; u < bbb.length; u++) {

        if(!bbb[u].attribs.rowspan){
            continue
        }

        let re = { sections: [], weeks: [] }

        let element = bbb[u]
        re.name = element.attribs.name
        re.position = element.attribs.position
        re.teacher = element.attribs.teacher
        re.day = parseInt(element.attribs.day)


        let sections = element.attribs.sections.split(",")
        re.sections = sections.map(item => {return {"section" : parseInt(item)}})


        re.weeks = element.attribs.weeks.split(",").map((item) => parseInt(item))

        result.push(re)
    }
    console.log(result)

    return { courseInfos: result , sectionTimes: _sectionTimes()}


    function _sectionTimes(){
        return [
      {
        "section": 1,
        "startTime": "08:00",
        "endTime": "08:45"
      },
      {
        "section": 2,
        "startTime": "08:45",
        "endTime": "09:40"
      },
      {
        "section": 3,
        "startTime": "10:00",
        "endTime": "10:45"
      },
      {
        "section": 4,
        "startTime": "10:55",
        "endTime": "11:40"
      },
      {
        "section": 5,
        "startTime": "14:30",
        "endTime": "15:15"
      },
      {
        "section": 6,
        "startTime": "15:20",
        "endTime": "16:05"
      },
      {
        "section": 7,
        "startTime": "16:25",
        "endTime": "17:10"
      },
      {
        "section": 8,
        "startTime": "17:15",
        "endTime": "18:00"
      },
      {
        "section": 9,
        "startTime": "19:40",
        "endTime": "20:25"
      },
      {
        "section": 10,
        "startTime": "20:30",
        "endTime": "21:15"
      },
      {
        "section": 11,
        "startTime": "21:20",
        "endTime": "22:05"
      }
    ]
    }
}