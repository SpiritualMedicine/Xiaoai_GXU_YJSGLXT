function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
    //除函数名外都可编辑
    //以下为示例，您可以完全重写或在此基础上更改
                                
//const ifrs = dom.getElementsByTagName("iframe"); //dom.querySelector("#tabCT tbody")
const ifrs = dom.getElementsByTagName("iframe");

//ifrs[0].src = "/Difference/GXDX/ArrangeCourse/DisplayCourseTable.aspx";

let res = ifrs[0].contentWindow.document.getElementById("tabCT");
let tds = ifrs[0].contentWindow.document.querySelectorAll("#tabCT tbody td")
let ccc = Array.from(ifrs[0].contentWindow.document.querySelectorAll("#tabCT th")).slice(2,9)
//let usefulnodes = []
//let result = []
if (res.childElementCount) {
     for (let u = 0; u < tds.length; u++) {
         if(tds[u].rowSpan === 1)
         {
             continue
         }
        
        //let re = { sections: [], weeks: [] }

        let element = tds[u]
        let text = element.innerText.split("\n")
        //re.name = text[0]
        element.setAttribute("name", text[0])
        element.setAttribute("position", text[4].split("：")[1])
        element.setAttribute("teacher", text[3].split("：")[1].slice(0,-1))
        element.setAttribute("day", ccc.findIndex((item) => (item.offsetLeft === element.offsetLeft)) + 1)
        

        //re.position = text[4].split("：")[1]
        //re.teacher = text[3].split("：")[1]
        //re.day = ccc.findIndex((item) => (item.offsetLeft === element.offsetLeft)) + 1

        

        let sectionsStart = element.parentNode.rowIndex;
        //re.sections = Array.from(Array(element.rowSpan), (v,k) =>k).map(item => {return {"section":item + sectionsStart}})
        element.setAttribute("sections", [...Array(sectionsStart + element.rowSpan).keys()].slice(sectionsStart))
        
        
        let weeks = []
        let weekStrings = text[2].slice(text[2].indexOf('第')+1,text[2].lastIndexOf('周')).split("、")  
        weekStrings.forEach(function(e){
            
            if(e.indexOf("-") === -1){
                weeks.push(parseInt(e))
            }
            else{
                let temp = e.split("-")
                let start = parseInt(temp[0])
                let end = parseInt(temp[1])
                weeks = weeks.concat([...Array(end + 1).keys()].slice(start))
            }
        })
        //re.weeks = weeks
        element.setAttribute("weeks", weeks)
        //result.push(re)
        
     }
    
    return res.outerHTML;
} 

}