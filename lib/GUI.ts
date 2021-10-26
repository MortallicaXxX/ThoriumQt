import { NodeUI } from "./NodeUI";

/**
* @Title ThoriumQt.GUI
* @Desc Général User Interface
* @Constructor arg1{Template:object}
*/
export class GUI{

  #ui:NodeUI|null = null;
  get ui():NodeUI|null{return (this.#ui ? this.#ui : null)}

  constructor(template:object|object[]){
    this.#ui = new NodeUI(template);
  }

  BuildIn(parent:any):Promise<void>{
    if(this.#ui)return this.#ui.BuildIn(parent);
    else return Promise.resolve();
  }

}
