import { Engine } from "./Engine";
import { Cpu } from "./Cpu";
import * as nodegui from '@nodegui/nodegui';

export class GlobalHandler{

  Initialise(window:nodegui.QMainWindow,engine:Engine){

  };
  Update(window:nodegui.QMainWindow,engine:Engine){

  }
  Resize(window:nodegui.QMainWindow,engine:Engine){

  }
  FrameUpdate(window:nodegui.QMainWindow,engine:Engine,cpu:Cpu.Process){
    console.log(cpu.Stats);
  }

}
