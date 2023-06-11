function replacer(match, p1, offset, string){
    console.log(match)
    if(match.indexOf('<div contenteditable="true" class="editorSheet">')!=-1){
        match = match.replace(/<div contenteditable="true" class="editorSheet">/, "<Basic>");
        match = match.replace(/<\x2Fdiv>/, "</Basic>");
    }
    else if(match.indexOf('<div class="board-row">')!=-1){
        match = match.replace(/<div class="board-row">/, "");
        match = match.replace(/<\x2Fdiv>/, "");
    }
    else if(match.indexOf('<div class="optionRow">')!=-1){
        match = match.replace(/<div class="optionRow">/, "");
        match = match.replace(/<\x2Fdiv>/, "");
    }
    else if(match.indexOf('<div class="formula">')!=-1){
        match = match.replace(/<div class="formula">/, "<Formula>");
        match = match.replace(/<\x2Fdiv>/, "</Formula>");
        match = match.replace(/&/gm, "&amp;")
    }
    else if(match.indexOf('<div class="form">')!=-1){
        match = "";
    }
    else if(match.indexOf('<div class="parts" id="essay">')!=-1){
        match = match.replace(/<div class="parts" id="essay">/, "<Parts>");
        match = match.replace(/<\x2Fdiv>/, "</Parts>");
    }
    else if(match.indexOf('<div class="part">')!=-1){
        match = match.replace(/<div class="part">/, "<Part>");
        match = match.replace(/<\x2Fdiv>/, "</Part>");
    }
    else if(match.indexOf('<div class="tasks">')!=-1){
        match = match.replace(/<div class="tasks">/, "<Tasks>");
        match = match.replace(/<\x2Fdiv>/, "</Tasks>");
    }
    else if(match.indexOf('<div class="task">')!=-1){
        match = match.replace(/<div class="task">/, "<Task>");
        match = match.replace(/<\x2Fdiv>/, "</Task>");
    }
    else if(match.indexOf('<div class="options">')!=-1){
        match = match.replace(/<div class="options">/, "<Options>");
        match = match.replace(/<\x2Fdiv>/, "</Options>");
    }
    else if(match.indexOf('<div class="option" contenteditable="true">')!=-1){
        match = match.replace(/<div class="option" contenteditable="true">/, "<Option>");
        match = match.replace(/<\x2Fdiv>/, "</Option>");
    }
    else if(match.indexOf('<div class="question" contenteditable="true">')!=-1){
        match = match.replace(/<div class="question" contenteditable="true">/, "<Question>");
        match = match.replace(/<\x2Fdiv>/, "</Question>");
    }
    else if(match.indexOf('<div class="answer" contenteditable="true">')!=-1){
        match = match.replace(/<div class="answer" contenteditable="true">/, "<Answer>");
        match = match.replace(/<\x2Fdiv>/, "</Answer>");
    }
    else if(match.indexOf('<div class="comment" contenteditable="true">')!=-1){
        match = match.replace(/<div class="comment" contenteditable="true">/, "<Comment>");
        match = match.replace(/<\x2Fdiv>/, "</Comment>");
    }
    else if(match.indexOf('<div style="text-align: left;">')!=-1){
        match = match.replace(/div[-a-z;":=\s]*left[;"\s]*>/, "<left>");
        match = match.replace(/<\x2Fdiv>/, "</left>");
    }   
    else if(match.indexOf('<div style="text-align: right;">')!=-1){
        match = match.replace(/<div style="text-align: right;">/, "<right>");
        match = match.replace(/<\x2Fdiv>/, "</right>");
    }
    else if(match.indexOf('<div style="text-align: justify;">')!=-1){
        match = match.replace(/<div style="text-align: justify;">/, "<justify>");
        match = match.replace(/<\x2Fdiv>/, "</justify>");
    }
    else if(match.indexOf('<div style="text-align: center;">')!=-1){
        match = match.replace(/<div style="text-align: center;">/, "<center>");
        match = match.replace(/<\x2Fdiv>/, "</center>");
    }
    else if(match.indexOf('<div class="paragraph">')!=-1){
        match = match.replace(/<div class="paragraph">/, "<Paragraph>");
        match = match.replace(/<\x2Fdiv>/, "</Paragraph>");
    }
    else if(match.indexOf('<div class="board" id="More">')!=-1){
        match = match.replace(/<div class="board" id="More">/, '<Extension type="More">');
        match = match.replace(/<\x2Fdiv>/, "</Extension>");
    }
    else if(match.indexOf('<div class="board" id="Example">')!=-1){
        match = match.replace(/<div class="board" id="Example">/, '<Extension type="Example">');
        match = match.replace(/<\x2Fdiv>/, "</Extension>");
    }
    else if(match.indexOf('<div class="board" id="Link">')!=-1){
        match = match.replace(/<div class="board" id="Link">/, '<Extension type="Cite">');
        match = match.replace(/<\x2Fdiv>/, "</Extension>");
    }
    else if(match.indexOf('<div class="board" id="main">')!=-1){
        match = match.replace(/<div class="board" id="main">/, "");
        match = match.replace(/<\x2Fdiv>/, "");
    }
    console.log(match)
    return match
}

function deleter(match, p1, offset, string){
    match = "";
    return match
}

let exportXML = (html, title, author) =>{
    let xml = '<?xml version="1.0" encoding="utf-8"?> <?xml-stylesheet type="text/xsl" href="ExtEss/ExtEss.xsl"?>'
    xml += '<Essay><Title>' + title + '</Title><Author>' + author + '</Author>';
    //html = html.replace(/<button.{1,750}<\x2Fbutton>/gm, '');
    //console.log(html)
    let indxend = html.indexOf("</button>");
    let indxbegin = html.lastIndexOf("<button", indxend);
    while(indxbegin!=-1){
        let len = indxend - indxbegin - 7;
        var re = new RegExp('<button.{' + len + '}<\x2Fbutton>');
        html = html.replace(re, deleter);
        indxend = html.indexOf("</button>");
        indxbegin = html.lastIndexOf("<button", indxend);
    }
    indxend = html.indexOf("</div>");
    indxbegin = html.lastIndexOf("<div", indxend);
    while(indxbegin!=-1){
        let len = indxend - indxbegin - 4;
        var re = new RegExp('<div.{' + len + '}<\x2Fdiv>');
        html = html.replace(re, replacer);
        //console.log(html)
        indxend = html.indexOf("</div>");
        indxbegin = html.lastIndexOf("<div", indxend);
    }
    xml += html;
    xml += '</Essay>';
    return xml
}

export default exportXML;