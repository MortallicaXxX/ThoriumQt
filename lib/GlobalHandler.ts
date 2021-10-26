import { Engine } from "./Engine";
import { Cpu } from "./Cpu";
import * as nodegui from '@nodegui/nodegui';

export class GlobalHandler{

  Initialise(app:any,engine:Engine){
    app.th.Initialise(app,engine);
  };
  Update(app:any,engine:Engine){
    app.th.Update();
  }
  Resize(app:any,engine:Engine){
    app.th.Resize(app,engine);
  }
  FrameUpdate(app:any,engine:Engine,cpu:Cpu.Process){
    app.th.FrameUpdate(app,engine,cpu);
  }

}
