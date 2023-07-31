export default function getHTML(essay){
    let html = `<!DOCTYPE html>
    <!-- saved from url=(0026)http://localhost:3000/view -->
    <html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <head>
        <script type="text/javascript"
            src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
        </script>
    </head>
    <script type="text/javascript">
        function extensionActive(uid){
            let extId = \`\${uid}-extension\`;
            document.getElementById(extId).style.display='block';
            document.getElementById(uid).style.display='none';
        }
    </script>
    <script type="text/javascript">
        function extensionNonActive(uid){
            let extId = \`\${uid}-extension\`;
            document.getElementById(extId).style.display='none';
            document.getElementById(uid).style.display='block';
        }
    </script>
    <script type="text/javascript">
        function randomNumb(n){
            return Math.floor(Math.random()* n);
        }
    </script>
    <script type="text/javascript">
        function addTasks(partNumb, taskNumb){
            let noneId = \`notSeeTask\${partNumb}\`;
            let seeId = \`seeTask\${partNumb}\`;
            let taskId = \`task\${partNumb}-\${taskNumb}\`;
            document.getElementById(noneId).style.display='none';
            document.getElementById(seeId).style.display='block';
            document.getElementById(taskId).style.display='block';
        }
    </script>
    <script type="text/javascript">
        function dontTasks(partNumb, len){
            let seeId = \`notSeeTask\${partNumb}\`;
            let noneId = \`seeTask\${partNumb}\`;
            document.getElementById(noneId).style.display='none';
            document.getElementById(seeId).style.display='block';
            for(let i=0; i<len; i++){
                let taskId = \`task\${partNumb}-\${i}\`;
                let answerId = \`taskAnswer\${partNumb}-\${i}\`;
                let optionId = \`taskAnswerOption\${partNumb}-\${i}\`;
                document.getElementById(taskId).style.display='none';
                document.getElementById(answerId).style.display='none';
                document.getElementById(optionId).style.display='none';
            }
            
        }
    </script>
    <script type="text/javascript">
        function changeShowAnswer(partNumb, taskNumb){
            let answId = \`taskAnswer\${partNumb}-\${taskNumb}\`
            document.getElementById(answId).style.display='block';
        }
    </script>
    <script type="text/javascript">
        function changeShowOption(partNumb, taskNumb){
            let answId = \`taskAnswer\${partNumb}-\${taskNumb}\`
            let optId = \`taskAnswerOption\${partNumb}-\${taskNumb}\`
            document.getElementById(answId).style.display='none';
            document.getElementById(optId).style.display='block';
        }
    </script>
    <script type="text/javascript">
        function dontShowAnswer(partNumb, taskNumb){
            let answId = \`taskAnswer\${partNumb}-\${taskNumb}\`
            let optId = \`taskAnswerOption\${partNumb}-\${taskNumb}\`
            document.getElementById(answId).style.display='none';
            document.getElementById(optId).style.display='none';
        }
    </script>
        <style>
        body {
        background-color: #DEB887;
        }
        button {
        height: 40px;
        width: 40px;
        margin: 3px;
        margin-left: 0px;
        place-items: center;
        border: solid;
        border-width: 1px;
        border-radius: 5px;
        background-color: #FAFAD2;
        outline: none;
        color: #020929;
        font-weight: 700;
        }
    
        button:hover{
        background-color: #FFE4B5;
        }
    
        button:active{
        background-color: #d3cfcf;
        }

        .essay {
            background-color: #ffffff;
            min-height: 10vw;
            width: 98%;
            padding: 40px 30px;
            position: absolute;
            left: 1%;
            top: 2%;
            border-radius: 10px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
            /*text-align: center;*/
          }
          .titleView {
            margin:7px auto;
            margin-top: 40px;
            width: 95%;
            border-radius: 7px;
            text-align: center;
            font-size: 45px;
          }
          .authorView {
            margin:7px auto;
            margin-top: 30px;
            width: 85%;
            border-radius: 7px;
            text-align: center;
            font-size: 30px;
          }
          .partTitleView {
            margin:7px auto;
            margin-top: 30px;
            margin-bottom: 20px;
            width: 85%;
            border-radius: 7px;
            text-align: center;
            font-size: 23px;
          }
          .textView{
            float: right;
            width: calc(100% - 50px);
            text-indent: 10px;
            margin-bottom: 10px;
            margin-top: 15px;
          }
          .paragraphView{
            width: calc(100% - 50px);
            float: right;
          }
        </style>
    
    <body> 
        <div id="root">
            ${renderEssay(essay)}
        </div>
        <script type="text/x-mathjax-config">
            MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
        </script>
    </body>`;
    return html;
};

function renderEssay(essay){
    let html = `<div class='essay'>
        <div class='titleView'>${essay.title}</div>
        <div class='authorView'>${essay.author}</div>
        <div class='partsView'>`
    let temp = essay.parts.map((part, i) => renderPart(part, i))
    for(let i = 0; i<temp.length; i++){
        html += temp[i]
    }
    html+=   `</div>
    </div>`
    //html = replaceAll('\\~', '~', html);
    //html = replaceAll('\\\\', '\\', html);
    html = replaceAll('~', '&nbsp;', html);
    html = replaceAll('---', '&#8212;', html);
    html = replaceAll('--', '&#8211;', html);
    html = replaceAll('``', '“', html);
    html = replaceAll('\'\'', '”', html);
    html = replaceAll('&lt;&lt;', '«', html);
    html = replaceAll('&gt;&gt;', '»', html);
    html = replaceAll('<<', '«', html);
    html = replaceAll('>>', '»', html);
    //html = replaceAll('(', '&#40;', html);
    //html = replaceAll(')', '&#41;', html);
    return html;
};

function renderPart(part, i){
    if(part.tasks){
        return `<div class='partView'>
        <div class='partTitleView'>${part.partTitle}</div>
        ${renderParagraphs(part.paragraphs)}
        ${renderTasks(part.tasks, i)}
    </div>`
    }
    else{
        return `<div class='partView'>
                    <div class='partTitleView'>${part.partTitle}</div>
                    ${renderParagraphs(part.paragraphs)}
                </div>`
    }
}
//
function renderParagraphs(paragraphs){
    let temp = paragraphs.map((paragraph, i) => renderParagraph(paragraph, i));
    let html = '';
    for(let i = 0; i<temp.length; i++){
        html += temp[i]
    }
    return html
}
function renderExtensionParagraphs(paragraphs){
    let existExt = false;
        for(let i = 0; i<paragraphs.length; i++){
            if(paragraphs[i].extension){
                existExt = true;
                break;
            }
    }
    let temp = paragraphs.map((paragraph, i) => renderExtensionParagraph(paragraph, i, existExt));
    let html = '';
    for(let i = 0; i<temp.length; i++){
        html += temp[i]
    }
    return html
}

function replaceAll(find, replace, str) {
    while( str.indexOf(find) !== -1) {
      str = str.replace(find, replace);
    }
    return str;
}

function renderParagraph(paragraph){
    const extensionType = {
        ['More']: '+',
        ['Link']: '[ ]',
        ['Example']: ':',
        ['MoreAdd']: '+',
        ['LinkAdd']: '[ ]',
        ['ExampleAdd']: ':',
    };
    let extension = [];
    if(paragraph.extension){
        extension = paragraph.extension.paragraphs.slice();
        if(paragraph.extension.type.indexOf('Add')!==-1 && extension.length){
            extension[0].basic = `${paragraph.basic}
            <div>${extension[0].basic}</div>`;
        }
    }
    const extId = `${paragraph.uid}-extension`
    let html = paragraph.extension ? `
                                        <div id="${paragraph.uid}" class='paragraphView' style="display:block">
                                            <button onClick="extensionActive(${paragraph.uid})">
                                                ${extensionType[paragraph.extension.type]}</button>
                                            <div class='textView'>${paragraph.basic}</div>  
                                        </div>
                                        <div id="${extId}" class='paragraphView' style="display:none">
                                            <button onClick="extensionNonActive(${paragraph.uid})">&larr;</button> 
                                            ${renderExtensionParagraphs(extension)}
                                        </div>
                                    ` 
                                : `<div class='paragraphView'>
                                        <div class='textView'>
                                            ${paragraph.basic}
                                        </div>
                                  </div>`
    return html
}

function renderExtensionParagraph(paragraph, i, existExt){
    const extensionType = {
        ['More']: '+',
        ['Link']: '[ ]',
        ['Example']: ':',
        ['MoreAdd']: '+',
        ['LinkAdd']: '[ ]',
        ['ExampleAdd']: ':',
    };
    let extension = [];
    if(paragraph.extension){
        extension = paragraph.extension.paragraphs.slice();
        if(paragraph.extension.type.indexOf('Add')!==-1 && extension.length){
            extension[0].basic = `${paragraph.basic}
            <div>${extension[0].basic}</div>`;
        }
    }
    const extId = `${paragraph.uid}-extension`;
    const width = existExt ? 95 : 100;
    const width0 = existExt ? 90 : 95;
    if(i === 0){
        let html = paragraph.extension ? `<span>
                                            <div id="${paragraph.uid}" class='paragraphView' style="display:block">
                                                <button onClick="extensionActive(${paragraph.uid})">
                                                    ${extensionType[paragraph.extension.type]}</button>
                                                    <div class='textView'>${paragraph.basic}</div>  
                                            </div>
                                            <div id="${extId}" class='paragraphView' style="display:none">
                                                <button onClick="extensionNonActive(${paragraph.uid})">&larr;</button> 
                                                ${renderExtensionParagraphs(extension)}
                                            </div>
                                            </span>` 
                                    : `<div class='textView'>${paragraph.basic}</div>`

        return html
    }
    else{
        let html = paragraph.extension ? `<div>
                                            <div id="${paragraph.uid}" class='paragraphView' style="display:block">
                                                <button onClick="extensionActive(${paragraph.uid})">
                                                    ${extensionType[paragraph.extension.type]}</button>
                                                    <div class='textView'>${paragraph.basic}</div>  
                                            </div>
                                            <div id="${extId}" class='paragraphView'style="display:none">
                                                <button onClick="extensionNonActive(${paragraph.uid})">&larr;</button> 
                                                ${renderExtensionParagraphs(extension)}
                                            </div>
                                        </div>` 
                                    : `<div class='paragraphView'>
                                            <div class='textView'>
                                                ${paragraph.basic}
                                            </div>
                                    </div>`
        return html
    }
}

function renderTasks(tasks, partNumb){
    let temp = tasks.map((task, i) => renderTask(task, partNumb, i));
    let html = `<div>
                    <div id="notSeeTask${partNumb}" class='paragraphView' style="display:block">
                        <button onClick="addTasks(${partNumb}, randomNumb(${tasks.length}))">T</button>
                        <div class='textView'></div>
                    </div>
                    <div id="seeTask${partNumb}" class='paragraphView' style="display:none">
                        <button onClick="dontTasks(${partNumb}, ${tasks.length})">&larr;</button>
                    `
    for(let i = 0; i<temp.length; i++){
         html += temp[i];
    }
    html += `</div>
    </div>`;         
    return html;
}

function renderTask(task, partNumb, taskNumb){
    let tempAnswer = task.answers.map((answer, i) => `<li>${answer.answer}</li>`);
    let answer = "";
    for(let i = 0; i<tempAnswer.length; i++){
        answer += tempAnswer[i];
    }
    let tempOption = task.answers.map((answer, i) => `<option>${i+1}</option>`);
    let option = "";
    for(let i = 0; i<tempOption.length; i++){
        option += tempOption[i];
    }
    let html = `<div id="task${partNumb}-${taskNumb}" style="display:none; width:95%; float:right; margin-bottom:10px; margin-top:15px">
                    <div><i>Вопрос: </i>${task.question}</div>
                    <div style="margin-left:30px; margin-top:10px">
                        <ol class='list'>
                            ${answer}
                        </ol>
                    </div>
                    <div><i>Выберите ответ: </i>
                        <select onchange="changeShowAnswer(${partNumb}, ${taskNumb})">
                            <option selected disabled hidden></option>
                            ${option}
                        </select>
                    </div>
                        <div class='paragraphView' id="taskAnswer${partNumb}-${taskNumb}" style="display:none">
                            <button onClick="changeShowOption(${partNumb}, ${taskNumb})">+</button>
                            <div class='textView' style="margin-bottom:0">
                                Правильный ответ - ${task.rightAnswer}
                            </div>      
                        </div>
                        <div class='paragraphView' id="taskAnswerOption${partNumb}-${taskNumb}" style="display:none">
                            <button onClick="dontShowAnswer(${partNumb},${taskNumb})">&larr;</button>
                            <div class='textView' style="margin-bottom:0">
                                Правильный ответ - ${task.rightAnswer}
                            </div>
                            <div class='textView' style="margin-top:0">
                                ${task.option}
                            </div>
                        </div>
                </div>`
    return html
}