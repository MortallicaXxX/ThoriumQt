import { Template } from "./Template";
import { NodeUI } from "./NodeUI"
import { Engine } from "./Engine";

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
