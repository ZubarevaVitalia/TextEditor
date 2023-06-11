import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { library, text } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import exportXML from './../src/export.js';
//import { emulateTab } from 'emulate-tab';
import $ from "jquery";
library.add(fas)

class Edit extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      dialog:false,
      value: false,
      more: false,
      example: false,
      link: false
      //editor: 
    };
    //this.addValueToArray = this.addValueToArray.bind(this);
    this.addMore = this.addMore.bind(this);
    this.addExample = this.addExample.bind(this);
    this.addLink = this.addLink.bind(this);
  }
  deleteBoard=()=>{
    this.setState({value: false});
    this.setState({more: false});
    this.setState({example: false});
    this.setState({link: false});
  };
  focus() {
    this.state.editor.focus();
  }
  /*addValueToArray(e) {
    const textContent = e.currentTarget;
    const { values } = this.state;
    console.log(textContent);
  }*/
  addMore(){
    this.setState({value:true});
    this.setState({more:true});
    this.setState({dialog:false})
  }
  addExample(){
    this.setState({value:true});
    this.setState({example:true});
    this.setState({dialog:false})
  }
  addLink(){
    this.setState({value:true});
    this.setState({link:true});
    this.setState({dialog:false})
  }
  render() { 
    return (
      <div className="paragraph">
        <div className="board-row">
          {!this.state.value &&
              <button className="tooltip" onClick={() => this.setState({dialog:true})}>
                <FontAwesomeIcon icon="fa-solid fa-plus"/>
                <span className="tooltiptext">Добавить расширение</span>
              </button>
          }
          {this.state.dialog && <dialog open>
                      <p>Какое расширение хотите добавить?</p>
                      <button onClick={() => this.addMore()} className="tooltip">+
                        <span className="tooltiptext">Подробнее</span>
                      </button>
                      <button onClick={() => this.addExample()} className="tooltip">:
                        <span className="tooltiptext">Пример</span>
                      </button>
                      <button onClick={() => this.addLink()} className="tooltip">[ ]
                        <span className="tooltiptext">Ссылка</span>
                      </button>
                      <button onClick={() => this.setState({dialog:false})} className="textbut">Отмена</button>
                      </dialog>}
          {
            this.state.more && <button className="extension">
                                  <FontAwesomeIcon icon="fa-solid fa-plus"/>
                                </button>
          }
          {
            this.state.example && <button className="extension">
                                    :
                                  </button>
          }
          {
            this.state.link && <button className="extension">
                                  [ ]
                                </button>
          }
          <button className="trash" onClick={() => this.props.onClick()}>
          <FontAwesomeIcon icon="fa-solid fa-trash-can"/>
          </button>
          <div contentEditable="true" className="editorSheet" onKeyPress = {(e) => this.props.onKeyPress(e)}></div>
          </div>
          {this.state.more && <Board depth="11" id="More" deleteBoard={this.deleteBoard}/>}
          {this.state.example && <Board depth="11" id="Example" deleteBoard={this.deleteBoard}/>}
          {this.state.link && <Board depth="11" id="Link" deleteBoard={this.deleteBoard}/>}
       </div>
    );
  }
}



class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      k:0,
      editors: [{id:0, items:<Edit />}]
    };
  }
  handleKeyPress = (event, i) => {
    if(event.key === 'Enter'){
      var $ = require('jquery');
      const newPr1 = this.state.editors;
      const k = this.state.k + 1;
      this.setState({k: k})
      const newPr11 = newPr1.splice(i+1, 0, {id:k, items:<Edit />});
      this.setState({editors: newPr1});
      //const idPr = this.state.editors[i+1].id;
      //console.log(idPr);
      //document.getElementById('${idPr}').focus();
      //this.state.editors[i+1].focus();
      event.preventDefault();
      
      //$.emulateTab();
      //$.emulateTab();
      //for (let i = 0; i < 3; i++) { // выведет 0, затем 1, затем 2
      //  emulateTab();
      //}
      //emulateTab();
      //emulateTab.backwards();
      //emulateTab();
      //emulateTab.backwards();
    }
  }
  deleteParagraph = (i) =>{
    if(this.state.editors.length>1){
      const newPr = this.state.editors;
      console.log(i);
        newPr.splice(i, 1);  
        this.setState({editors: newPr})
    }
    else{
      if(this.props.depth!=="1"){
        this.props.deleteBoard();
      }
    }
  }

  renderEdit(i){
    return (
      <Edit
        onKeyPress = {(e) => this.handleKeyPress(e, i)}
        onClick = {(i) => this.deleteParagraph(i)}
      />
    );
  }
  render() {
    const pressEnter = true; 
    return (
      <div className="board" id={this.props.id}>
        {this.state.editors.map((edit, index) => <Edit
            key={edit.id}
            onKeyPress = {(e) => this.handleKeyPress(e, index)}
            onClick = {() => this.deleteParagraph(index)}
        />)}
      </div>
    );
  }
}

class Options extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    selectedH : null,
    selectedSize: 3,
    selectedName: "Arial",
  };
  handleLink(button, defaultUi, value){
    let userLink = prompt("Enter a URL");
    if (/http/i.test(userLink)) {
      document.execCommand(button, false, userLink);
    } else {
      userLink = "http://" + userLink;
      document.execCommand(button, false, userLink);
    }
  }
  handleForm(){
    let formula = prompt("Введите формулу");
    if(formula!==null){
      if(formula[0]!=="$"){
        formula = `$${formula}$`;
      }
      let html = `<div class=\"formula\">${formula}</div><div class="form">${formula}</div>`;
      document.execCommand("insertHTML", false, html);
      renderMathInElement(document.body, {
        delimiters: [
          {left: "$$", right: "$$", display: false},
          {left: "$", right: "$", display: false},
          //{left: "\\(", right: "\\)", display: false},
          //{left: "\\[", right: "\\]", display: true},
        ],
        throwOnError : false,
        ignoredClasses: ["formula"]
      })
    }
    
  }
  //handleImg(){

  //}
  handleChangeF(formula){
    formula = prompt("Введите формулу", formula);
  }
  handleChangeH(selectedH){
    this.setState({selectedH}, () =>
    document.execCommand("formatBlock", false, this.state.selectedH));
  }
  handleChangeSize(selectedSize){
    this.setState({selectedSize}, () =>
    document.execCommand("fontSize", false, this.state.selectedSize));
  }
  handleChangeName(selectedName){
    this.setState({selectedName}, () =>
    document.execCommand("fontName", false, this.state.selectedSize));
  }
  render() {
    return (
      <div>
        <button id="bold" onClick={()=>document.execCommand("bold", false, null)}>
          <FontAwesomeIcon icon="fa-solid fa-bold" />
        </button>
        <button id="italic" onClick={()=>document.execCommand("italic", false, null)}>
          <FontAwesomeIcon icon="fa-solid fa-italic" />
        </button>
        <button id="underline" onClick={()=>document.execCommand("underline", false, null)}>
          <FontAwesomeIcon icon="fa-solid fa-underline"/>
        </button>
        <button id="strikethrough" onClick={()=>document.execCommand("strikethrough", false, null)}>
          <FontAwesomeIcon icon="fa-solid fa-strikethrough"/>
        </button>
        <button id="superscript" onClick={()=>document.execCommand("superscript", false, null)}>
          <FontAwesomeIcon icon="fa-solid fa-superscript"/>
        </button>
        <button id="subscript" onClick={()=>document.execCommand("subscript", false, null)}>
          <FontAwesomeIcon icon="fa-solid fa-subscript"/>
        </button>

        <button id="function" onClick={()=>this.handleForm()}>
          <FontAwesomeIcon icon="fa-solid fa-square-root-variable" />
        </button> 

        <button id="undo" onClick={()=>document.execCommand("undo", false, null)}>
          <FontAwesomeIcon icon="fa-solid fa-rotate-left"/>
        </button>
        <button id="redo" onClick={()=>document.execCommand("redo", false, null)}>
          <FontAwesomeIcon icon="fa-solid fa-rotate-right"/>
        </button>

        <button id="justifyLeft" onClick={()=>document.execCommand("justifyLeft", false, null)}>
          <FontAwesomeIcon icon="fa-solid fa-align-left"/>
        </button>
        <button id="justifyCenter" onClick={()=>document.execCommand("justifyCenter", false, null)}>
          <FontAwesomeIcon icon="fa-solid fa-align-center"/>
        </button>
        <button id="justifyRight" onClick={()=>document.execCommand("justifyRight", false, null)}>
          <FontAwesomeIcon icon="fa-solid fa-align-right"/>
        </button>
        <button id="justifyFull" onClick={()=>document.execCommand("justifyFull", false, null)}>
          <FontAwesomeIcon icon="fa-solid fa-align-justify"/>
        </button>

        <select id="fontSize" onChange={e => this.handleChangeSize(e.target.value)} value={this.state.selectedSize}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                      </select>
        <button className="textbut" onClick={() => this.props.onClick()}>
          Экспорт
          <span className="tooltiptext">Скачать эссе в формате XML</span>
        </button>
        <button className="textbut" onClick={() => this.props.onClick()}>
          XSLT
          <span className="tooltiptext">Скачать XSLT-преобразователь</span>
        </button>
        <button className="textbut">
          Импорт
        </button>

      </div>
    );
  }
}

/*    
<button id="function" onClick={()=>renderMathInElement(document.body, {
                                                                delimiters: [
                                                                  {left: "$$", right: "$$", display: true},
                                                                  {left: "$", right: "$", display: false},
                                                                  {left: "\\(", right: "\\)", display: false},
                                                                  {left: "\\[", right: "\\]", display: true},
                                                                  {left: "\begin{equation}", right: "\end{equation}", display: true},
                                                                  {left: "\begin{matrix}", right: "\end{matrix}", display: true},
                                                                ],
                                                                throwOnError : false
                                            })}>
          <FontAwesomeIcon icon="fa-solid fa-square-root-variable" />
        </button> 
<button id="createLink" onClick={()=>this.handleLink("createLink", false, null)}>
          <FontAwesomeIcon icon="fa fa-link"/>
        </button>
        <button id="unlink" onClick={()=>document.execCommand("unlink", false, null)}>
          <FontAwesomeIcon icon="fa fa-unlink"/>
        </button>
<button id="indent" onClick={()=>document.execCommand("indent", false, null)}>
          <FontAwesomeIcon icon="fa-solid fa-indent"/>
        </button>
        <button id="outdent" onClick={()=>document.execCommand("outdent", false, null)}>
          <FontAwesomeIcon icon="fa-solid fa-outdent"/>
        </button>   
        <select id="formatBlock" onChange={e => this.handleChangeH(e.target.value)} value={this.state.selectedH}>
                        <option value="H1">H1</option>
                        <option value="H2">H2</option>
                        <option value="H3">H3</option>
                        <option value="H4">H4</option>
                        <option value="H5">H5</option>
                        <option value="H6">H6</option>
                      </select>
<select id="fontName" onChange={e => this.handleChangeName(e.target.value)} value={this.state.selectedName}>
                        <option value="Arial">Arial</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Garamond">Garamond</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Courier New">Courier New</option>
                      </select> */
class Option extends React.Component{
  render(){
    return(
      <div className="optionRow">
          <button className="tooltip" onClick={() => this.props.onClick()}>
                <FontAwesomeIcon icon="fa-solid fa-plus"/>
                <span className="tooltiptext">Добавить вариант ответа</span>
          </button>
          <button className="trash" onClick={() => this.props.onDelete()}>
          <FontAwesomeIcon icon="fa-solid fa-trash-can"/>
          </button>
        <div className="option" contentEditable="true">Вариант ответа</div>
      </div>
    )
  }
}
class Task extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      k:0,
      option: [{id:0, items:<Option />}]
    };
  }
  handleKeyPress = (i) => {
    const newPr1 = this.state.option;
    const k = this.state.k + 1;
    this.setState({k: k})
    const newPr11 = newPr1.splice(i+1, 0, {id:k, items:<Option />});
    this.setState({option: newPr1});
}
deleteOption = (i) =>{
  if(this.state.option.length>1){
    const newPr = this.state.option;
    newPr.splice(i, 1);  
    this.setState({option: newPr})
  }
}
  render(){
    return(
      <div className="task">
        <button className="trash" onClick={() => this.props.onDelete()}>
          <FontAwesomeIcon icon="fa-solid fa-trash-can"/>
        </button>
        <div className="question" contentEditable="true">Вопрос</div>
        <div className="options">
          {this.state.option.map((part, index) => <Option
            key={part.id}
            onClick = {() => this.handleKeyPress(index)}
            onDelete = {() => this.deleteOption(index)}
        />)} 
        </div>
        <div className="answer" contentEditable="true">Порядковый номер правильного ответа</div>
        <div className="comment" contentEditable="true">Пояснение к ответу</div>

      </div>
    )
  }
}
class Tasks extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      k:0,
      tasks: [{id:0, items:<Task />}]
    };
  }
  handleKeyPress = () => {
    const newPr1 = this.state.tasks;
    const k = this.state.k + 1;
    this.setState({k: k})
    const newPr11 = newPr1.splice(k, 0, {id:k, items:<Task />});
    this.setState({tasks: newPr1});
  }
  deleteTask = (i) =>{
    if(this.state.tasks.length>1){
      const newPr = this.state.tasks;
      newPr.splice(i, 1);  
      this.setState({tasks: newPr})
    }
  }
  render(){
    return(
      <div className="tasks">
        {this.state.tasks.map((task, index) => <Task
            key={task.id}
            onDelete = {() => this.deleteTask(index)}
        />)}
        <button className="textbut" onClick={()=>this.handleKeyPress()}>Добавить вопрос</button>
      </div>
    )
  }
}
class Part extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      task:false
    };
  }
  render(){
    return(
      <div className="part">
      <button className="textbut" onClick={() => this.props.onDelete()}>Удалить главу</button>
      <Board depth="1" id="main"/>
      {!this.state.task && <button className="textbut" onClick={() => this.setState({task:true})}>Добавить вопросы</button>}
      {this.state.task && <button className="textbut" onClick={() => this.setState({task:false})}>Удалить вопросы</button>}
      {this.state.task && <Tasks />}
      <button className="textbut" onClick={() => this.props.onClick()}>Добавить главу</button>
      </div>
    )
  }
}

class Parts extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      k:0,
      parts: [{id:0, items:<Part />}]
    };
  }
  handleKeyPress = (i) => {
      const newPr1 = this.state.parts;
      const k = this.state.k + 1;
      this.setState({k: k})
      const newPr11 = newPr1.splice(i+1, 0, {id:k, items:<Part />});
      this.setState({parts: newPr1});
  }
  deletePart = (i) =>{
    if(this.state.parts.length>1){
      const newPr = this.state.parts;
      newPr.splice(i, 1);  
      this.setState({parts: newPr})
    }
  }
  render() {
    return (
      <div className="parts" id={this.props.id}>
        {this.state.parts.map((part, index) => <Part
            key={part.id}
            onClick = {() => this.handleKeyPress(index)}
            onDelete = {() => this.deletePart(index)}
        />)}
      </div>
    );
  }
}
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text : <Parts id="essay"/>
    };
  }
  handleKeyPressExport(){
    //console.log(document);
    const element = document.getElementById("essay");
    const st = exportXML(element.outerHTML, document.getElementById("title").value, document.getElementById("author").value);
    console.log(document.getElementById("title").value);
    console.log(document.getElementById("author").value);
    console.log(element.outerHTML);
    console.log(st);
    document.write( '<a href="data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(st) + '" download="essay.xml">essay.xml</a>' )
  };
  render() {
    return ( 
      <div className="container">
        <div className="opt">
          <Options onClick = {() => this.handleKeyPressExport()}/>
        </div>
        <input type="text" className="title" id="title" placeholder='Название эссе'></input>
        <input type="text" className="author" id="author" placeholder='Автор'></input>
        <Parts id="essay"/>
      </div>
    );
  }
}



// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Container />);
