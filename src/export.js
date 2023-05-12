function replacer(match, p1, offset, string){
    if(match.indexOf('<div contenteditable="true" class="editorSheet">')!=-1){
        match = match.replace(/<div contenteditable="true" class="editorSheet">/gm, "<Basic>");
        match = match.replace(/<\x2Fdiv>/gm, "</Basic>");
    }
    else if(match.indexOf('<div class="board-row">')!=-1){
        match = match.replace(/<div class="board-row">/gm, "");
        match = match.replace(/<\x2Fdiv>/gm, "");
    }
    /*else if(match.indexOf('<div style="text-align: left;">'!=-1)){
        match = match.replace(/<div style="text-align: left;">/gm, "<left>");
        match = match.replace(/<\x2Fdiv>/gm, "</left>");
    }
    else if(match.indexOf('<div style="text-align: center;">'!=-1)){
        match = match.replace(/<div style="text-align: center;">/gm, "<center>");
        match = match.replace(/<\x2Fdiv>/gm, "</center>");
    }
    else if(match.indexOf('<div style="text-align: right;">'!=-1)){
        match = match.replace(/<div style="text-align: right;">/gm, "<right>");
        match = match.replace(/<\x2Fdiv>/gm, "</right>");
    }
    else if(match.indexOf('<div style="text-align: justify;">'!=-1)){
        match = match.replace(/<div style="text-align: justify;">/gm, "<justify>");
        match = match.replace(/<\x2Fdiv>/gm, "</justify>");
    }*/
    else if(match.indexOf('<div class="paragraph">')!=-1){
        match = match.replace(/<div class="paragraph">/gm, "<Paragraph>");
        match = match.replace(/<\x2Fdiv>/gm, "</Paragraph>");
    }
    else if(match.indexOf('<div class="board" id="More">')!=-1){
        match = match.replace(/<div class="board" id="More">/gm, '<Extension type="More">');
        match = match.replace(/<\x2Fdiv>/gm, "</Extension>");
    }
    else if(match.indexOf('<div class="board" id="Example">')!=-1){
        match = match.replace(/<div class="board" id="Example">/gm, '<Extension type="Example">');
        match = match.replace(/<\x2Fdiv>/gm, "</Extension>");
    }
    else if(match.indexOf('<div class="board" id="Link">')!=-1){
        match = match.replace(/<div class="board" id="Link">/gm, '<Extension type="Cite">');
        match = match.replace(/<\x2Fdiv>/gm, "</Extension>");
    }
    else {
        match = match.replace(/<div class="board" id="main">/gm, "");
        match = match.replace(/<\x2Fdiv>/gm, "");
    }
    return match
}

let exportXML = (html) =>{
    //fs=require("fs")
//fs.writeFileSync("txt.txt", html,  "ascii")
    let xml = '<?xml version="1.0" encoding="utf-8"?> <?xml-stylesheet type="text/xsl" href="ExtEss/ExtEss.xsl"?><Essay><Parts><Part>';
    html = html.replace(/<button.{1,750}<\x2Fbutton>/gm, '');
    let indxend = html.indexOf("</div>");
    let indxbegin = html.lastIndexOf("<div", indxend);
    while(indxbegin!=-1){
        let len = indxend - indxbegin - 4;
        var re = new RegExp('<div.{' + len + '}<\x2Fdiv>');
        html = html.replace(re, replacer);
        indxend = html.indexOf("</div>");
        indxbegin = html.lastIndexOf("<div", indxend);
    }
    xml += html;
    xml += '</Part></Parts></Essay>';
    return xml
}

export default exportXML;