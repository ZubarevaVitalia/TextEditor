import React from 'react';
//import Select from 'react-select';
import ReactDOM from 'react-dom/client';
import './index.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { library, text } from '@fortawesome/fontawesome-svg-core'
import { faHourglass1, fas } from '@fortawesome/free-solid-svg-icons'
import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import {InlineMath, BlockMath } from 'react-katex';
import exportXML from './../src/export.js';
import ReactDOMServer from 'react-dom/server'

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
    };
    this.addValueToArray = this.addValueToArray.bind(this);
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
    this.el.focus();
  }
  addValueToArray(e) {
    const textContent = e.currentTarget;
    const { values } = this.state;
    console.log(textContent);
    /*if (values.indexOf(textContent) === -1) {
      this.setState({
        values: [...this.state.values, textContent]
      });
    }*/
  }
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
                <span class="tooltiptext">Добавить расширение</span>
              </button>
          }
          {this.state.dialog && <dialog open>
                      <p>Какое расширение хотите добавить?</p>
                      <button onClick={() => this.addMore()} class="tooltip">+
                        <span class="tooltiptext">Подробнее</span>
                      </button>
                      <button onClick={() => this.addExample()} class="tooltip">:
                        <span class="tooltiptext">Пример</span>
                      </button>
                      <button onClick={() => this.addLink()} class="tooltip">[ ]
                        <span class="tooltiptext">Ссылка</span>
                      </button>
                      <button onClick={() => this.setState({dialog:false})} class="textbut">Отмена</button>
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
          <div contentEditable="true" className="editorSheet" onKeyPress = {(e) => this.props.onKeyPress(e)}>
          </div>
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
      const newPr1 = this.state.editors;
      const k = this.state.k + 1;
      this.setState({k: k})
      const newPr11 = newPr1.splice(i+1, 0, {id:k, items:<Edit />});
      this.setState({editors: newPr1});
      //this.state.editors[i+1].focus();
      event.preventDefault();
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

  export(){
    const newPr1 = this.state.editors;
    console.log()
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
        <button class="textbut" onClick={() => this.props.onClick()}>
          Экспорт
          <span class="tooltiptext">Скачать эссе в формате XML</span>
        </button>
        <button class="textbut" onClick={() => this.props.onClick()}>
          XSLT
          <span class="tooltiptext">Скачать XSLT-преобразователь</span>
        </button>
        <button class="textbut" onClick={() => this.props.onClick()}>
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

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text : <Board depth="1" id="main"/>,
    };
  }
  handleKeyPressExport(){
    //console.log(document);
    const element = document.getElementById("main");
    const st = exportXML(element.outerHTML);
    //console.log(element.outerHTML);
    console.log(st);
    document.write( '<a href="data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(st) + '" download="essay.xml">essay.xml</a>' )
  };
  render() {
    return (
      <div className="container">
        <div className="options">
          <Options onClick = {() => this.handleKeyPressExport()}/>
        </div>
        <input class="title" placeholder='Название эссе'></input>
        <input class="author" placeholder='Автор'></input>
        {this.state.text}
      </div>
    );
  }
}



// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Container />);
