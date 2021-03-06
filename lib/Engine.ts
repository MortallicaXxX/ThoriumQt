import * as nodegui from '@nodegui/nodegui';
import { GUI } from "./GUI";
import { Controls } from "./Controls";
import { Cpu as cpu } from "./Cpu";
import { GlobalHandler } from "./GlobalHandler";
import { Th } from "./Th";

/**
* @Title ThoriumQt.Engine
* @Desc Moteur de ThoriumQt, encapsule "nodegui" et offre des méthodes propres à thoriumqt.
*/
export class Engine{

  #nodegui:typeof nodegui = nodegui;
  #window:any = new this.#nodegui.QMainWindow();
  #app:any = new this.#nodegui.QWidget();
  #layout:nodegui.FlexLayout = new this.#nodegui.FlexLayout();

  Controls:Controls.Controler = new Controls.Controler(this);
  Cpu:cpu.Process = new cpu.Process(this);
  Handlers:GlobalHandler = new GlobalHandler;

  onready:(self:Engine)=>void=(x:Engine)=>{};
  set onReady(arg:(arg0:Engine)=>void){
    this.onready = arg;
    this.onready(this);
  };

  /** @nodegui */
  get nodegui():typeof nodegui{return this.#nodegui;}
  /** @window est l'écrant principale de l'application */
  get Window():nodegui.QMainWindow{return this.#window;}
  #gui:GUI|null = null;
  /** @App NodeUI globale de l'interface */
  get Gui():GUI|null{return this.#gui;}
  /** @App NodeUI globale de l'interface */
  get App():nodegui.QWidget{return this.#app;}
  /** @setWindowTitle définis le titre apparant de l'application */
  get setWindowTitle():(title:string)=>void{return this.#setWindowTitle};

  Initialise(){return this.Handlers.Initialise(this.#app,this)}
  Update(){return this.Handlers.Update(this.#app,this)}
  Resize(){try{return this.Handlers.Resize(this.#app,this)}catch(err){}}
  FrameUpdate(Cpu:cpu.Process){return this.Handlers.FrameUpdate(this.#app,this,Cpu)}


  constructor(){
    // this.#window = new nodegui.QMainWindow();
    // if(title)this.setWindowTitle("test");

    // this.#app = new nodegui.QWidget();
    this.#app.setObjectName("app");
    // this.#layout = new nodegui.FlexLayout();

    (global as any).win = this.#window;
  }

  Build():Promise<void>{
    const _this:Engine = this;
    return new Promise(function(next){
      if(_this.#gui)next(_this.#gui.BuildIn(_this.#app));
      else next();
    });
  }

  #setWindowTitle(title:string):void{
    if(this.#window)this.#window.setWindowTitle(title);
  }

  #setGUI(template:object):Engine{
    this.#gui = new GUI(template);
    return this;
  }
  get GUI():(template:object)=>Engine{return this.#setGUI;}

  Show(){
    this.#app = (new Th).Prototype(this.#app);
    this.#window = (new Th).Prototype(this.#window);
    this.#window.setCentralWidget(this.#app);
    this.#window.show();
    this.Initialise();
  }

  setStyleSheet(css:string){
    this.#window.setStyleSheet(css);
  }

}
