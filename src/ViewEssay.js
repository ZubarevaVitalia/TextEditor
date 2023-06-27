import React from 'react';
import { useLocation } from 'react-router-dom'
import './ViewEssay.css'
//import 'katex/dist/katex.min.css';
//import renderMathInElement from 'katex/dist/contrib/auto-render';
import {MathJaxContext, MathJax} from 'better-react-mathjax'

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
    renderParagraph = (paragraph) => {
        const extensionType = {
            ['More']: '+',
            ['Link']: '[]',
            ['Example']: ':',
        };
        const extId = `${paragraph.uid}.extension`;
        return paragraph.extension ? <div><div id={paragraph.uid} className='paragraphView' style={{display:'block'}}>
                                        <button onClick={() => this.extensionActive(paragraph.uid)}>
                                            {extensionType[paragraph.extension.type]}</button>
                                            <div className='textView' style={{width:'95%'}} dangerouslySetInnerHTML={{__html: paragraph.basic}}></div> 
                                        </div>
                                        <div id={extId} className='paragraphView' style={{display:"none"}}>
                                            <button onClick={() => this.extensionNonActive(paragraph.uid)}>-</button> 
                                                {this.renderExtensionParagraphs(paragraph.extension.paragraphs, 1)}
                                        </div>
                                    </div>
                                    :
                                    <div className='paragraphView'>
                                        <div className='textView' style={{width:'95%'}} dangerouslySetInnerHTML={{__html: paragraph.basic}}></div>
                                   </div>
    }
    renderExtensionParagraph = (paragraph, i, depth, existExt) => {
        const extensionType = {
            ['More']: '+',
            ['Link']: '[]',
            ['Example']: ':',
        };
        const extId = `${paragraph.uid}.extension`;
        const pad = existExt ? 48 : 0;
        const width = existExt ? 95 : 100;
        const width0 = existExt ? 90 : 95;
        if(i === 0){
            return paragraph.extension ? <span>
                                                <div id={paragraph.uid} className='paragraphView' style={{display:"block"}}>
                                                    <button onClick={() => this.extensionActive(paragraph.uid)}>
                                                        {extensionType[paragraph.extension.type]}</button>
                                                    <div className='textView' style={{width:`95%`}} dangerouslySetInnerHTML={{__html: paragraph.basic}}></div>
                                                </div>
                                                <div id={extId} className='paragraphView' style={{display:"none"}}>
                                                    <button onClick={() => this.extensionNonActive(paragraph.uid)}>-</button> 
                                                    {this.renderExtensionParagraphs(paragraph.extension.paragraphs, depth+1)}
                                                </div>
                                            </span>
                                        : <div className='textView' style={{width:`${width0}%`}} dangerouslySetInnerHTML={{__html: paragraph.basic}}></div>
        }
        else{
            return paragraph.extension ?  <div>
                                                <div id={paragraph.uid} className='paragraphView' style={{display:"block"}}>
                                                    <button onClick={() => this.extensionActive(paragraph.uid)}>
                                                        {extensionType[paragraph.extension.type]}</button>
                                                        <div className='textView' style={{width:`${width}%`}} dangerouslySetInnerHTML={{__html: paragraph.basic}}></div>  
                                                </div>
                                                <div id={extId} className='paragraphView'style={{display:"none"}}>
                                                    <button onClick={() => this.extensionNonActive(paragraph.uid)}>-</button> 
                                                    {this.renderExtensionParagraphs(paragraph.extension.paragraphs, depth+1)}
                                                </div>
                                           </div>
                                        : <div className='paragraphView'>
                                                <div className='textView' style={{width:`${width}%`}} dangerouslySetInnerHTML={{__html: paragraph.basic}}></div>
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
        return (
            <div style={{width:'95%', float: 'right', marginBottom: '10px', marginTop: '15px'}}>
                <div><i>Вопрос: </i>{task.question}</div>
                <div style={{marginLeft:'30px', marginTop:'10px'}}>
                    <ol class='list'>
                        {task.answers.map((answer, i) => <li>{answer.answer}</li>)}
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
                        {this.showOption[partNumber] && <button onClick={() => this.dontShowAnswer(partNumber)}>-</button>}
                        <div className='textView' style={{width:`95%`, marginBottom:'0'}}>
                            Правильный ответ - {task.rightAnswer}
                        </div>
                        {this.showOption[partNumber] &&
                            <div className='textView' style={{width:`95%`, marginTop:'0'}}>{task.option}</div>}
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
                    <div className='textView' style={{width:`95%`}}></div>
                </div>
            )
        }
        else{
            return(
                <div className='paragraphView'>
                    <button onClick={() => this.noTasks(partNumber)}>-</button>
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
}
export default View;