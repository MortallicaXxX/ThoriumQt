import { GUI as gui } from "./GUI";
import { Engine as engine} from "./Engine";
import { Template as template } from "./Template";
import { NodeUI as nodeui } from "./NodeUI";
import { ElementUI as elementui } from "./ElementUI";

export namespace ThoriumQt{

  /**
  * @Title ThoriumQt.Engine
  * @Desc Moteur de ThoriumQt, encapsule "nodegui" et offre des méthodes propres à thoriumqt.
  */
  export class Engine extends engine{
    constructor(){super()};
  }

  /**
  * @Title ThoriumQt.Component
  * @Desc Permet de créer un component personaliser
  */
  export class Component extends elementui{
    constructor(t:{type:string,prop:object,childrens:object[],proto:object}){
      super({type:t.type,prop:t.prop,childrens:t.childrens,proto:t.proto},null,null);
    }
  }

  /**
  * @Title ThoriumQt.GUI
  * @Desc Général User Interface
  * @Constructor arg1{Template:object}
  */
  export class GUI extends gui{
    constructor(template:object){super(template)};
  }

  /**
  * @Title ThoriumQt.Template
  * @Desc Représente le template d'un élément qt
  */
  export class Template extends template{
    constructor(template:{type:string,prop:object|null,proto:object|null}){super(template)};
  }

  /**
  * @Title ThoriumQt.NodeUI
  * @Desc Noeud d'élément qt
  * @Constructor arg1{template:object|[object]} arg2{root:Engine|null} arg3{parent:any|null}
  */
  export class NodeUI extends nodeui{
    constructor(template:object|[object] , root:Engine|null , parent:any|null){super(template,root,parent)};
  }

  /**
  * @Title ThoriumQt.ElementUI
  * @Desc Représente un élément qt
  * @Constructor arg1{template:{type:string,prop:object|null,childrens:NodeUI|null,proto:object|null}} arg2{root:Engine|null} arg3{parent:any|null}
  */
  export class ElementUI extends elementui{
    constructor(template:{type:string,prop:object,childrens:nodeui,proto:object} , root:engine|null , parent:any|null ){super(template,root,parent)};
  }

}

import { Style as style } from "./Style";

export function Style(css:object):string{return (new style()).Css(css)}
export function StyleSheet(csssheet:string|string[]):string{return (new style()).CssSheet(csssheet)}
export function WidgetStyle(arg:{tag?:string|null , name?:string|string[]|null , style:string}):string{return (new style()).WidgetInCssSheet(arg)}
