import { NodeUI } from "./NodeUI";

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
