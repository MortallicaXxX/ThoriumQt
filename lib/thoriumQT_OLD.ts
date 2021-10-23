import * as nodegui from '@nodegui/nodegui';

/**
* @Title ThoriumQt
*/
export namespace ThoriumQt {

  /**
  * @Title ThoriumQt.Template
  * @Desc Représente le template d'un élément qt
  */
  class Template{

    type:string;
    prop:object|null = null;
    proto:object|null = null;

    constructor(template:{type:string,prop:object|null,proto:object|null}){
      this.type = template.type;
      if(template.prop)this.prop = template.prop;
      if(template.proto)this.proto = template.proto;
    }

  }

  /**
  * @Title ThoriumQt.ElementUI
  * @Desc Représente un élément qt
  * @Constructor arg1{template:{type:string,prop:object|null,childrens:NodeUI|null,proto:object|null}} arg2{root:Engine|null} arg3{parent:any|null}
  */
  export class ElementUI{
    #template:Template|null = null;
    get template():Template|null{return this.#template;}
    #ui:NodeUI|null = null;
    get ui():NodeUI|null{return this.#ui;}

    constructor(template: {type:string,prop:object|null,childrens:NodeUI|null,proto:object|null}, root:Engine|null = null , parent:any|null = null){
      this.#template = new Template({ type:template.type , prop:template.prop , proto:template.proto });
      if(template.childrens) this.#ui = new NodeUI( template.childrens , null , this );
    }

  }

  /**
  * @Title ThoriumQt.NodeUI
  * @Desc Noeud d'élément qt
  * @Constructor arg1{template:object|[object]} arg2{root:Engine|null} arg3{parent:any|null}
  */
  export class NodeUI{

    #ui:Array<ElementUI>|[] = [];
    get node():Array<ElementUI>|[]{return this.#ui;}
    #root:Engine|null = null;
    #parent:any|null = null;

    constructor(template:object|[object] , root:Engine|null = null , parent:any|null = null){
      if(root) this.#root = root;
      if(parent) this.#parent = parent;
      else parent = this;
      this.#ui = this.#normalize(template);
    }

    BuildIn(parent:any):void{
      const _this = this;
      new Promise(function(next){

        for(const i of Array.from({length : _this.#ui.length} , (x:null,i:number) => i)){

          var template:Template|null = _this.node[i].template;
          if(template == null)template = new Template({type:"empty",prop:null,proto:null});
          console.log(template,parent)
          if(`Q${template.type}` in nodegui){

            /* Recuperation dynamique de la classe équivalante au type */
            type typeKey = keyof typeof nodegui;
            const typeName:typeKey = `Q${template.type}` as keyof typeof nodegui;
            const sup:any = nodegui[typeName];
            const childrens = new sup();

            if(template.prop)for(const key of Object.keys(template.prop)){

              /* ajout des propritée dynamiquement */
              type CibleKey = keyof typeof sup;
              const propName: CibleKey = `set${key}`;

              type TemplateKey = keyof typeof template.prop;
              const keyOfValue: TemplateKey = key as keyof typeof template.prop;
              const value:any = template.prop[keyOfValue];
              childrens[propName](value);

            }

            parent.addWidget(childrens);
          }

        }

      })
    }

    #normalize(template:object|[object]|null):Array<ElementUI>|[]{
      if(template && typeof template == 'object' && !Array.isArray(template))template = [template];
      if(template && Array.isArray(template)) return Array.from(template , function(x:any,i:number){
        return new ElementUI(x);
      });
      else return [];
    }

  }

  /**
  * @Title ThoriumQt.GUI
  * @Desc Général User Interface
  * @Constructor arg1{Template:object}
  */
  export class GUI{

    #ui:NodeUI|null = null;
    get ui():NodeUI|null{return (this.#ui ? this.#ui : null)}

    constructor(template:object){
      this.#ui = new NodeUI(template);
    }

    BuildIn(parent:any):void{
      if(this.#ui)this.#ui.BuildIn(parent);
    }

  }

  /**
  * @Title ThoriumQt.Engine
  * @Desc Moteur de ThoriumQt, encapsule "nodegui" et offre des méthodes propres à thoriumqt.
  */
  export class Engine{

    #nodegui:typeof nodegui = nodegui;
    #window:nodegui.QMainWindow = new nodegui.QMainWindow();
    #app:nodegui.QWidget = new nodegui.QWidget();
    #layout:nodegui.FlexLayout = new nodegui.FlexLayout();
    // /** @window est l'écrant principale de l'application */
    // get Window():QMainWindow|null{return this.#window};
    #gui:GUI|null = null;
    /** @App NodeUI globale de l'interface */
    get Gui():GUI|null{return this.#gui;}
    /** @App NodeUI globale de l'interface */
    get App():nodegui.QWidget{return this.#app;}

    /** @setWindowTitle définis le titre apparant de l'application */
    get setWindowTitle():(title:string)=>void{return this.#setWindowTitle};


    constructor(){
      this.#window = new nodegui.QMainWindow();
      // if(title)this.setWindowTitle("test");

      this.#app = new nodegui.QWidget();
      this.#app.setObjectName("app");
      this.#layout = new nodegui.FlexLayout();
      this.#app.setLayout(this.#layout);

      (global as any).win = this.#window;
    }

    Build():Promise<void>{
      const _this:Engine = this;
      return new Promise(function(next){
        if(_this.#gui)next(_this.#gui.BuildIn(_this.#layout));
        else next();
      });
    }

    #setWindowTitle(title:string):void{
      // if(this.#window)this.#window.setWindowTitle(title);
    }

    #setGUI(template:object):Engine{
      this.#gui = new GUI(template);
      return this;
    }
    get GUI():(template:object)=>Engine{return this.#setGUI;}

    Show(){
      this.#window.setCentralWidget(this.#app);
      this.#window.show();
    }

    setStyleSheet(css:string){
      this.#window.setStyleSheet(css);
    }

  }

}
