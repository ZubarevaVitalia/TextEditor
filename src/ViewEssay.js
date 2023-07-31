import React from 'react';
import { useLocation } from 'react-router-dom'
import './ViewEssay.css'
//import 'katex/dist/katex.min.css';
//import renderMathInElement from 'katex/dist/contrib/auto-render';
import {MathJaxContext, MathJax} from 'better-react-mathjax'
import getHTML from './GetHTML';

/*<Link to="/" state={{essay: this.location.state}}>
                <button className="textbut">
                    Назад
                </button>
            </Link>*/

var essay;

class ViewEssay extends React.Component {
    randNumb = () => {
        let temp = {}
        for(let i=0; i<essay.parts.length; i++){
            temp[i] = -1;
        }
        return temp;
    };
    answer = () => {
        let temp = {}
        for(let i=0; i<essay.parts.length; i++){
            temp[i] = false;
        }
        return temp;
    }
    option = () => {
        let temp = {}
        for(let i=0; i<essay.parts.length; i++){
            temp[i] = false;
        }
        return temp;
    }
    randNumbTask = this.randNumb();
    showAnswer = this.answer();
    showOption = this.option();
    
    

    extensionActive = (uid) => {
        let extId = `${uid}.extension`;
        document.getElementById(extId).style.display='block';
        document.getElementById(uid).style.display='none';
    }
    extensionNonActive = (uid) => {
        let extId = `${uid}.extension`;
        document.getElementById(uid).style.display='block';
        document.getElementById(extId).style.display='none';
    }

    replaceAll(find, replace, str) {
        while( str.indexOf(find) !== -1) {
          str = str.replace(find, replace);
        }
        return str;
    }

    renderParagraph = (paragraph) => {
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
        let basic = paragraph.basic.slice();
        basic = this.replaceAll('\\~', '~', basic);
        basic = this.replaceAll('\\\\', '\\', basic);
        basic = this.replaceAll('~', '&nbsp;', basic);
        basic = this.replaceAll('---', '&#8212;', basic);
        basic = this.replaceAll('--', '&#8211;', basic);
        basic = this.replaceAll('``', '“', basic);
        basic = this.replaceAll('\'\'', '”', basic);
        basic = this.replaceAll('&lt;&lt;', '«', basic);
        basic = this.replaceAll('&gt;&gt;', '»', basic);
        const extId = `${paragraph.uid}.extension`;
        return paragraph.extension ? <div><div id={paragraph.uid} className='paragraphView' style={{display:'block'}}>
                                        <button onClick={() => this.extensionActive(paragraph.uid)}>
                                            {extensionType[paragraph.extension.type]}</button>
                                            <div className='textView' dangerouslySetInnerHTML={{__html: basic}}></div> 
                                        </div>
                                        <div id={extId} className='paragraphView' style={{display:"none"}}>
                                            <button onClick={() => this.extensionNonActive(paragraph.uid)} dangerouslySetInnerHTML={{__html: '&larr;'}}></button> 
                                                {this.renderExtensionParagraphs(extension, 1)}
                                        </div>
                                    </div>
                                    :
                                    <div className='paragraphView'>
                                        <div className='textView' dangerouslySetInnerHTML={{__html: basic}}></div>
                                   </div>
    }
    renderExtensionParagraph = (paragraph, i, depth, existExt) => {
        const extensionType = {
            ['More']: '+',
            ['Link']: '[ ]',
            ['Example']: ':',
            ['MoreAdd']: '+',
            ['LinkAdd']: '[ ]',
            ['ExampleAdd']: ':',
        };
        const extId = `${paragraph.uid}.extension`;
        const pad = existExt ? 48 : 0;
        const width = existExt ? 95 : 100;
        const width0 = existExt ? 90 : 95;
        let extension = [];
        if(paragraph.extension){
            extension = paragraph.extension.paragraphs.slice();
            if(paragraph.extension.type.indexOf('Add')!==-1 && extension.length){
                extension[0].basic = `${paragraph.basic}<div>
                ${extension[0].basic}</div>`;
            }
        }
        let basic = paragraph.basic.slice();
        basic = this.replaceAll('\\~', '~', basic);
        basic = this.replaceAll('\\\\', '\\', basic);
        basic = this.replaceAll('~', '&nbsp;', basic);
        basic = this.replaceAll('---', '&#8212;', basic);
        basic = this.replaceAll('--', '&#8211;', basic);
        basic = this.replaceAll('``', '“', basic);
        basic = this.replaceAll('\'\'', '”', basic);
        basic = this.replaceAll('&lt;&lt;', '«', basic);
        basic = this.replaceAll('&gt;&gt;', '»', basic);
        if(i === 0){
            return paragraph.extension ? <span>
                                                <div id={paragraph.uid} className='paragraphView' style={{display:"block"}}>
                                                    <button onClick={() => this.extensionActive(paragraph.uid)}>
                                                        {extensionType[paragraph.extension.type]}</button>
                                                    <div className='textView' dangerouslySetInnerHTML={{__html: basic}}></div>
                                                </div>
                                                <div id={extId} className='paragraphView' style={{display:"none"}}>
                                                    <button onClick={() => this.extensionNonActive(paragraph.uid)} dangerouslySetInnerHTML={{__html: '&larr;'}}></button> 
                                                    {this.renderExtensionParagraphs(extension, depth+1)}
                                                </div>
                                            </span>
                                        : <div className='textView' dangerouslySetInnerHTML={{__html: basic}}></div>
        }
        else{
            return paragraph.extension ?  <div>
                                                <div id={paragraph.uid} className='paragraphView' style={{display:"block"}}>
                                                    <button onClick={() => this.extensionActive(paragraph.uid)}>
                                                        {extensionType[paragraph.extension.type]}</button>
                                                        <div className='textView' dangerouslySetInnerHTML={{__html: basic}}></div>  
                                                </div>
                                                <div id={extId} className='paragraphView'style={{display:"none"}}>
                                                    <button onClick={() => this.extensionNonActive(paragraph.uid)} dangerouslySetInnerHTML={{__html: '&larr;'}}></button> 
                                                    {this.renderExtensionParagraphs(extension, depth+1)}
                                                </div>
                                           </div>
                                        : <div className='paragraphView'>
                                                <div className='textView' dangerouslySetInnerHTML={{__html: basic}}></div>
                                        </div>
        }

    }

    renderParagraphs = (paragraphs) => {
        return paragraphs.map((paragraph, i) => this.renderParagraph(paragraph)) 
    }
    renderExtensionParagraphs = (paragraphs, depth) =>{
        let existExt = false;
        for(let i = 0; i<paragraphs.length; i++){
            if(paragraphs[i].extension){
                existExt = true;
                break;
            }
        }
        return paragraphs.map((paragraph, i) => this.renderExtensionParagraph(paragraph, i, depth, existExt))
    }

    addTasks = (tasks, partNumber) => {
        this.randNumbTask[partNumber] = Math.floor(Math.random()* tasks.length)
        this.forceUpdate();

    }
    noTasks = (partNumber) => {
        this.randNumbTask[partNumber] = -1;
        this.showAnswer[partNumber] = false;
        this.showOption[partNumber] = false;
        this.forceUpdate();
    }

    changeShowAnswer = (partNumber) => {
        this.showAnswer[partNumber] = true;
        this.forceUpdate();
    }
    changeShowOption = (partNumber) => {
        this.showOption[partNumber] = true;
        this.forceUpdate();
    }
    dontShowAnswer = (partNumber) => {
        this.showAnswer[partNumber] = false;
        this.showOption[partNumber] = false;
        this.forceUpdate();
    }
    renderTask = (task, partNumber) => {
        let questionHtml = `<i>Вопрос: </i>${task.question}`
        return (
            <div style={{width:'95%', float: 'right', marginBottom: '10px', marginTop: '15px'}}>
                <div dangerouslySetInnerHTML={{__html: questionHtml}}></div>
                <div style={{marginLeft:'30px', marginTop:'10px'}}>
                    <ol class='list'>
                        {task.answers.map((answer, i) => <li dangerouslySetInnerHTML={{__html: answer.answer}}></li>)}
                    </ol>
                </div>
                <div><i>Выберите ответ: </i>
                    <select onChange={e => this.changeShowAnswer(partNumber)}>
                        <option selected disabled hidden></option>
                        {task.answers.map((answer, i) => <option>{i+1}</option>)}
                    </select>
                </div>
                {this.showAnswer[partNumber] && 
                    <div className='paragraphView'>
                        {!this.showOption[partNumber] && <button onClick={() => this.changeShowOption(partNumber)}>+</button>}
                        {this.showOption[partNumber] && <button onClick={() => this.dontShowAnswer(partNumber)} dangerouslySetInnerHTML={{__html: '&larr;'}}></button>}
                        <div className='textView' style={{marginBottom:'0'}}>
                            Правильный ответ - {task.rightAnswer}
                        </div>
                        {this.showOption[partNumber] &&
                            <div className='textView' style={{marginTop:'0'}} dangerouslySetInnerHTML={{__html: task.option}}></div>}
                    </div>
                }
            </div>
        )
    }

    renderTasks = (tasks, partNumber) => {
        if(this.randNumbTask[partNumber] === -1){
            return(
                <div className='paragraphView'>
                    <button onClick={() => this.addTasks(tasks, partNumber)}>T</button>
                    <div className='textView'></div>
                </div>
            )
        }
        else{
            return(
                <div className='paragraphView'>
                    <button onClick={() => this.noTasks(partNumber)} dangerouslySetInnerHTML={{__html: '&larr;'}}></button>
                    {this.renderTask(tasks[this.randNumbTask[partNumber]], partNumber)}
                </div>
            )
        }
    }

    render(){
        return(
            <MathJaxContext config = {{tex: {inlineMath: [['$', '$'], ['\\(', '\\)']]}}}>
            <div className='essay'>
                <div className='titleView'>{essay.title}</div>
                <div className='authorView'>{essay.author}</div>
                <div className='partsView'>
                    {essay.parts.map((part, i) =>
                        <React.Fragment key={i}>
                            <MathJax>
                                <div className='partView'>
                                    <div className='partTitleView'>{part.partTitle}</div>
                                    {this.renderParagraphs(part.paragraphs)}
                                    {part.tasks && this.renderTasks(part.tasks, i)}
                                </div>
                            </MathJax>
                        </React.Fragment>)
                    }
                </div>
            </div>
            </MathJaxContext>
        )
    }
}
/**/

const View = props => {
    const location = useLocation();
    console.log(location)
    essay = JSON.parse(localStorage.getItem("essay")) || null;
    return <ViewEssay/>
    //return <div dangerouslySetInnerHTML={{__html: ${getHTML(essay)}`}}></div>;
}
export default View;