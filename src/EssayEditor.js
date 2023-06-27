import React from 'react';
import './EssayEditor.css';
import Options  from './Options';
import ContentEditable from 'react-contenteditable';
import { useLocation } from 'react-router-dom'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { library} from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

class EssayEditor extends React.Component {
    uid = 3;
    moveFocus = -1;
    state = {
        dialog: false,
        essay: {
            uid: 3,
            title: 'Название эссе',
            author: 'Автор эссе',
            parts: [
                {
                    partTitle: 'Название части',
                    paragraphs: [
                        {
                            basic: 'Basic',
                            uid: 1,
                            extension: {
                                type: 'More',
                                paragraphs: [
                                    {
                                        basic: 'Extension',
                                        uid: 2,
                                    }
                                ],
                            }
                        },
                    ],
                },
            ],
        },
    };

    componentDidUpdate(prevProps, prevState){
        if(this.moveFocus >= 0){
            let e = document.getElementById(`paragraph${this.moveFocus}`);
            console.log(e);
            e.focus();
            //this.refs[this.moveFocus].focus();
            this.moveFocus = -1;
        }
    }

    titleChangeHandler = (event) =>{
        let newEssay = this.state.essay;
        newEssay.title = event.target.value;
        this.setState({essay: newEssay});
    }
    authorChangeHandler = (event) =>{
        let newEssay = this.state.essay;
        newEssay.author = event.target.value;
        this.setState({essay: newEssay});
    }
    partTitleChangeHandler = (event, part) =>{
        part.partTitle = event.target.value;
        this.setState({essay: this.state.essay});
    }

    paragraphChangeHandler = (paragraph, basic, e) =>{
        paragraph.basic = basic;
        this.setState({essay: this.state.essay});
        //this.forceUpdate();
    }

    paragraphAddExtension(paragraph, type){
        this.setState({dialog: false})
        paragraph.extension={
            type: type,
            paragraphs: [
                {
                    basic: '',
                    uid: this.uid++,
                }
            ],
        }
        let newEssay = this.state.essay;
        newEssay.uid = this.uid;
        this.setState({essay: newEssay});
    }

    addNewParagraph = (paragraph, paragraphs, e) =>{
        let i = paragraphs.indexOf(paragraph);
        let newUid = this.uid++;
        paragraphs.splice(i+1, 0, {basic:'', uid: newUid,});
        let newEssay = this.state.essay;
        newEssay.uid = this.uid;
        this.setState({essay: newEssay});
        this.moveFocus = newUid;
        e.preventDefault();
        console.log(this.state.essay);
    }

    deleteParagraph = (paragraph, paragraphs, depth, parent) =>{
        if(paragraphs.length > 1){
            let i = paragraphs.indexOf(paragraph);
            paragraphs.splice(i, 1);
            this.setState({essay: this.state.essay});
        }
        else if(depth > 0){
            parent.extension = null;
            this.setState({essay: this.state.essay});
        }
    }

    renderParagraph = (paragraph, depth, paragraphs, parent) =>{
        const extensionType = {
            ['More']: '+',
            ['Link']: '[ ]',
            ['Example']: ':',
        };
        return (
            <React.Fragment>
                <div style={{marginLeft: depth*30}} className='paragraph'>
                    <div className='board-row'>
                    { paragraph.extension 
                        ? <button className="extension">{extensionType[paragraph.extension.type]}</button> 
                        : <button onClick={()=>this.setState({dialog: paragraph.uid})}>
                            <FontAwesomeIcon icon="fa-solid fa-plus"/>
                          </button>}
                    {this.state.dialog===paragraph.uid && <dialog open>
                      <p>Какое расширение хотите добавить?</p>
                      <button onClick={() => this.paragraphAddExtension(paragraph, 'More')} className="tooltip">+
                        <span className="tooltiptext">Подробнее</span>
                      </button>
                      <button onClick={() => this.paragraphAddExtension(paragraph, 'Example')} className="tooltip">:
                        <span className="tooltiptext">Пример</span>
                      </button>
                      <button onClick={() => this.paragraphAddExtension(paragraph, 'Link')} className="tooltip">[ ]
                        <span className="tooltiptext">Ссылка</span>
                      </button>
                      <button onClick={() => this.setState({dialog: false})} className="textbut">Отмена</button>
                      </dialog>}
                        <button onClick={()=>this.deleteParagraph(paragraph, paragraphs, depth, parent)}>
                            <FontAwesomeIcon icon="fa-solid fa-trash-can"/>
                        </button>
                        <ContentEditable className="editorSheet" 
                            html={paragraph.basic}
                            onChange={(e)=>this.paragraphChangeHandler(paragraph, e.target.value, e)}
                            onKeyPress={(e)=>{e.code==="Enter" && this.addNewParagraph(paragraph, paragraphs, e)}}
                            id={'paragraph'+paragraph.uid}
                        ></ContentEditable>
                        </div>
                    { paragraph.extension ? this.renderParagraphs(paragraph.extension.paragraphs, depth+1, paragraph) : null}
                    
                </div>
            </React.Fragment>
        );
    }

    renderParagraphs = (paragraphs, depth = 0, parent) =>{
        return (
                <div className='board'>
                    {
                        paragraphs.map((paragraph, i) => 
                        <React.Fragment key={i}>
                            {this.renderParagraph(paragraph, depth, paragraphs, parent)}
                        </React.Fragment>)
                    }
                </div>
        );
    }

    questionChangeHandler = (event, task) => {
        task.question = event.target.value;
        this.setState({essay: this.state.essay});
    }
    rigthAnswerChangeHandler = (event, task) => {
        let numb = event.target.value;
        if(!isNaN(+numb)){
            task.rightAnswer = Number(numb);
            this.setState({essay: this.state.essay});
        }
    }
    optionChangeHandler = (event, task) => {
        task.option = event.target.value;
        this.setState({essay: this.state.essay});
    }
    answerChangeHandler = (event, answer) => {
        answer.answer = event.target.value;
        this.setState({essay: this.state.essay});
    }

    renderAnswer = (answer, task, i) => {
        return (
            <div className='answer'>
                <button onClick={()=>this.deleteAnswer(answer, task)}>
                    <FontAwesomeIcon icon="fa-solid fa-trash-can"/>
                </button>
                <button onClick={()=>this.addAnswer(answer, task)}>
                    <FontAwesomeIcon icon="fa-solid fa-plus"/>
                </button>
                <div>
                    Введите ответ №{i+1}: 
                    <input type="text" value={answer.answer} onChange={(e) => this.answerChangeHandler(e, answer)}></input>
                </div>
            </div>
        )
    }

    deleteAnswer(answer, task){
        if(task.answers.length > 1){
            let ind = task.answers.indexOf(answer);
            task.answers.splice(ind, 1);
            this.setState({essay: this.state.essay});
        }
    }
    addAnswer(answer, task){
        let ind = task.answers.indexOf(answer);
        task.answers.splice(ind, 0, {answer:''});
        this.setState({essay: this.state.essay});
    }

    renderTask = (task, part) => {
        return (
            <div className='task'>
                <button className='textbut' onClick={() => this.deleteTask(task, part)}>Удалить вопрос</button>
                <div className='question'>
                    Введите вопрос: 
                    <input type="text" value={task.question} onChange={(e) => this.questionChangeHandler(e, task)}></input>
                </div>
                {task.answers.map((answer, i) => this.renderAnswer(answer, task, i))}
                <div className='rigthAnswer'>
                    Введите порядковый номер правильного ответа: 
                    <input type="text" value={task.rightAnswer} onChange={(e) => this.rigthAnswerChangeHandler(e, task)}></input>
                </div>
                <div className='option'>
                    Введите комментарий к ответу: 
                    <input type="text" value={task.option} onChange={(e) => this.optionChangeHandler(e, task)}></input>
                </div>
            </div>
        )
    }
    renderTasks =(part) => {
        return(
            <div className='tasks'>
                {part.tasks.map((task, i) => this.renderTask(task, part))}
                <div>
                    <button className='textbut' onClick={() => this.addTask(part)}>
                        Добавить вопрос
                    </button>
                </div>
            </div>
        )
    }

    addTask = (part) => {
        part.tasks.push({
            question: '',
            answers: [{
                answer:''
            }],
            rightAnswer: 0,
            option: ''
        });
        this.setState({essay: this.state.essay});
    }
    deleteTask = (task, part) => {
        if(part.tasks.length > 1){
            let ind = part.tasks.indexOf(task);
            part.tasks.splice(ind, 1);
        }
        else{
            part.tasks = null;
        }
        this.setState({essay: this.state.essay});
    }

    addTasks = (part) => {
        part.tasks = [{
            question: '',
            answers: [{
                answer:''
            }],
            rightAnswer: 0,
            option: ''
        }];
        this.setState({essay: this.state.essay});
    }
    deleteTasks = part => {
        part.tasks = null;
        this.setState({essay: this.state.essay});
    }

    deletePart = (part) =>{
        if(this.state.essay.parts.length > 1){
            let i = this.state.essay.parts.indexOf(part);
            this.state.essay.parts.splice(i, 1);
            this.setState({essay: this.state.essay});
        }
    }
    addPart = (part) =>{
        let i = this.state.essay.parts.indexOf(part);
        let newUid = this.uid++;
        let newPart = {
            partTitle: '',
            paragraphs:[
                {
                    basic: '',
                    uid: newUid,
                },
            ]
        }
        let newEssay = this.state.essay;
        newEssay.uid = this.uid;
        this.state.essay.parts.splice(i+1, 0, newPart);
        this.setState({essay: newEssay});
        this.moveFocus = newUid;
    }

    readURL = file => {
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = e => res(e.target.result);
            reader.onerror = e => rej(e);
            reader.readAsText(file);
        });
    };
    handleImport = async event =>{
        const file = event.target.files[0];
        const text = await this.readURL(file);
        let newEssay = JSON.parse(text);
        this.uid = newEssay.uid;
        this.setState({essay: newEssay});
    }

    render(){
        return (
            <div className='container'>
                <div className="opt">
                    <Options onChange = {(text) => this.handleImport(text)} essay = {this.state.essay}/>
                </div>
                <input type="text" className="title" value={this.state.essay.title} onChange={this.titleChangeHandler}></input>
                <input type="text" className="author" value={this.state.essay.author} onChange={this.authorChangeHandler}></input>
                <div className='parts'>
                    {
                        this.state.essay.parts.map((part, i) => (
                            <React.Fragment key={i}>
                                <div className='part'>
                                    <p style={{fontSize:'large', marginLeft:'50px'}}>{i+1}.  
                                    <input type="text" className='partTitle' onChange={(e) => this.partTitleChangeHandler(e, part)} value={part.partTitle}></input>
                                    <button className="partdelete" onClick={() => this.deletePart(part)}>
                                        Удалить главу
                                    </button>
                                    </p>
                                    {this.renderParagraphs(part.paragraphs)}
                                    
                                    {part.tasks ?
                                        <button className="partadd" onClick={() => this.deleteTasks(part)}>Удалить вопросы</button>
                                        :
                                        <button className="partadd" onClick={() => this.addTasks(part)}>Добавить вопросы</button>
                                    }
                                    {part.tasks && this.renderTasks(part)}
                                    <button className="partadd" onClick={() => this.addPart(part)}>Добавить главу</button>
                                </div>
                            </React.Fragment>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default EssayEditor;