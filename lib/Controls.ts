import { WidgetEventTypes, QMouseEvent , QKeyEvent , QRect } from '@nodegui/nodegui';
import { Engine } from "./Engine";

export namespace Controls{

  interface MousePosition{
    x:number,
    y:number
  }

  class Mouse{

    Position:MousePosition = {x:0,y:0};
    Buttons:[boolean,boolean] = [false,false];
    isClicked:boolean = false;
    get Right():boolean{return this.Buttons[0];}
    get Left():boolean{return this.Buttons[1];}

    UpdatePosition(event:QMouseEvent){
      this.Position = {x:event.x() , y:event.y()};
    }
    UpdateClick(isClicked:boolean,event:QMouseEvent){
      this.isClicked = isClicked;
      this.Buttons[event.button() - 1] = isClicked;
    }

  }

  interface ScreenDimensions{
    height:number,
    width:number
  }

  class Screen{

    Dimensions:ScreenDimensions = {height:0,width:0}

    constructor(engine?:Engine){
      if(engine)this.UpdateDimensions(engine.Window.geometry());
    }

    UpdateDimensions(dimensions:QRect){this.Dimensions = {height:dimensions.height() , width : dimensions.width()};}

  }

  class Keyboard{

    keys:any = {};

    UpdateKey(isPressed:boolean,event:QKeyEvent){

      if(event.text().toUpperCase() in this.keys == false)this.keys[event.text().toUpperCase()] = {
        code : event.key(),
        key : event.text(),
        KEY : event.text().toUpperCase(),
        isPressed : isPressed
      }
      if(this.keys[event.text().toUpperCase()].isPressed != isPressed)this.keys[event.text().toUpperCase()].isPressed = isPressed;

    }

  }

  export class Controler{

    Mouse:Mouse = new Mouse;
    Screen:Screen = new Screen();
    Keyboard:Keyboard = new Keyboard;

    constructor(engine:Engine){

      const _this = this;

      _this.Screen = new Screen(engine);

      engine.Window.setMouseTracking(true);
      engine.Window.addEventListener(WidgetEventTypes.HoverMove, (event:any) => {
          _this.Mouse.UpdatePosition(new QMouseEvent(event));
      });
      engine.Window.addEventListener(WidgetEventTypes.MouseButtonPress , (event:any) => {
          const mouseEvt:QMouseEvent = new QMouseEvent(event);
          _this.Mouse.UpdateClick(true,mouseEvt);
      });
      engine.Window.addEventListener(WidgetEventTypes.MouseButtonRelease , (event:any) => {
          const mouseEvt:QMouseEvent = new QMouseEvent(event);
          _this.Mouse.UpdateClick(false,mouseEvt);
      });

      engine.Window.addEventListener(WidgetEventTypes.KeyPress , (event:any) => {
          const KeyEvent:QKeyEvent = new QKeyEvent(event);
          _this.Keyboard.UpdateKey(true,KeyEvent);
      });
      engine.Window.addEventListener(WidgetEventTypes.KeyRelease , (event:any) => {
          const KeyEvent:QKeyEvent = new QKeyEvent(event);
          _this.Keyboard.UpdateKey(false,KeyEvent);
      });

      engine.Window.addEventListener(WidgetEventTypes.Resize , (event:any) => {
        _this.Screen.UpdateDimensions(engine.Window.geometry());
      });

    }

  }

}
