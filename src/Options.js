import React from 'react';
import './Options.css';
import getHTML from './GetHTML';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { library} from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
library.add(fas)

class Options extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedH : null,
        selectedSize: 3,
        selectedName: "Arial",
      };
    }

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

    readURL = file => {
      return new Promise((res, rej) => {
          const reader = new FileReader();
          reader.onload = e => res(e.target.result);
          reader.onerror = e => rej(e);
          reader.readAsDataURL(file);
      });
  };
    insertImage = async event => {
      const file = event.target.files[0];
      const url = await this.readURL(file);
      let src = url;
      document.execCommand("InsertImage",false,src);
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

          <button>
            <label className="label">
              <input className="import" type="file" onChange={(e) => this.insertImage(e)}>
                </input>
                <span>Img</span>
            </label>  
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
          <button className="textbut">
            <a href = {URL.createObjectURL(new Blob([JSON.stringify(this.props.essay)], 
                      {type: 'application/json'}))}
            download = "essay.json"
            >Сохранить</a>
          </button>
          <button className="textbut">
            <label className="label">
              <input className="import" type="file" accept=".json" onChange={(e) => this.props.onChange(e)}>
                </input>
              <span>Открыть</span>
            </label>  
          </button>
          <Link to="/view" target="_blank" onClick={() => localStorage.setItem("essay", JSON.stringify(this.props.essay))}>
            <button className="textbut">
              Просмотр
            </button>
          </Link>
          <button className="textbut">
            <a href = {URL.createObjectURL(new Blob([getHTML(this.props.essay)], 
                      {type: 'text/plain'}))}
            download = "essay.html"
            >Сохранить в формате HTML</a>
          </button>
        </div>
      );
    }
  }
  
  export default Options;
  //<Link to="/view" target="_blank" params={{essay: this.props.essay}} state={{essay: this.props.essay}}></Link>