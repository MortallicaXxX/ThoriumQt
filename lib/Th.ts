import { WidgetEventTypes, QMouseEvent , QKeyEvent , QRect } from '@nodegui/nodegui';
/**
* @Title ThoriumQt.NodeUI
* @Desc Noeud d'élément qt
* @Constructor arg1{template:object|[object]} arg2{root:Engine|null} arg3{parent:any|null}
*/
export class Th{

  Prototype(QtElment:any,template?:any):object{

    const DefaultNode:object = {
      e:QtElment,
      active:false,
      Initialise:function(app:any,root:any){
        const _this:any = this;
        _this.e.root = root;
        _this.e.app = app;
        _this.e.children = [];
        // _this.e.parentNode = null;
        if('_layout' in _this.e){
          _this.e.children = _this.e._layout.nodeChildren;
          _this.e.layout = _this.e._layout;
        }
        _this.e.children = [..._this.e.children , ..._this.e.nodeChildren];

        /** Mouse onDblClick */
        _this.e.addEventListener(WidgetEventTypes.MouseButtonDblClick,function(event:any){
          event = new QMouseEvent(event);
          if("onDblClick" in _this)_this.onDblClick(event,_this.e.root.Controls.Mouse);
        })

        /** Mouse onMouseEnter */
        _this.e.addEventListener(WidgetEventTypes.HoverEnter,function(event:any){
          event = new QMouseEvent(event);
          if("onMouseEnter" in _this)_this.onMouseEnter(event,_this.e.root.Controls.Mouse);
        })

        /** Mouse onMouseLeave */
        _this.e.addEventListener(WidgetEventTypes.HoverLeave,function(event:any){
          event = new QMouseEvent(event);
          if("onMouseLeave" in _this)_this.onMouseLeave(event,_this.e.root.Controls.Mouse);
        })

        /** Mouse onMouseMove */
        _this.e.addEventListener(WidgetEventTypes.HoverMove,function(event:any){
          event = new QMouseEvent(event);
          // console.log("onMouseMove" in _this.e.th)
          // if("onMouseMove" in _this)console.log("Move",_this);
          if("onMouseMove" in _this)_this.onMouseMove(event,_this.e.root?.Controls.Mouse);
        })

        /** Mouse onMouseDown */
        _this.e.addEventListener(WidgetEventTypes.MouseButtonPress ,function(event:any){
          event = new QMouseEvent(event);
          if("onMouseDown" in _this)_this.onMouseDown(event,_this.e.root.Controls.Mouse);
        })

        /** Mouse onMouseUp */
        _this.e.addEventListener(WidgetEventTypes.MouseButtonRelease,function(event:any){
          event = new QMouseEvent(event);
          if("onMouseUp" in _this)_this.onMouseUp(event,_this.e.root.Controls.Mouse);
        })

        /** Mouse onMouseWheel */
        _this.e.addEventListener(WidgetEventTypes.Wheel,function(event:any){
          event = new QMouseEvent(event);
          if("onMouseWheel" in _this)_this.onMouseWheel(event,_this.e.root.Controls.Mouse);
        })

        for(const e of _this.e.children){
          e.parentNode = _this.e;
          e.th.Initialise(app,root);
        }

        if('onInitialise' in _this)_this.onInitialise();

      },
      Update:function(){
        const _this:any = this;

        if('_layout' in _this.e)_this.e._layout.th.Update();
        if(_this.e.nodeChildren)for(const e of _this.e.nodeChildren){e.th.Update();}
        if('onUpdate' in _this)_this.onUpdate();

      },
      Resize:function(){
        const _this:any = this;

        if('_layout' in _this.e)_this.e._layout.th.Resize();
        if(_this.e.nodeChildren)for(const e of _this.e.nodeChildren){e.th.Resize();}
        if('onResize' in _this)_this.onResize();

      },
      FrameUpdate:function(){
        const _this:any = this;

        if('_layout' in _this.e)_this.e._layout.th.FrameUpdate();
        if(_this.e.nodeChildren)for(const e of _this.e.nodeChildren){e.th.FrameUpdate();}
        if('onFrameUpdate' in _this)_this.onFrameUpdate();

      }
    }

    if (template)QtElment.th =  {...DefaultNode,...template.proto};
    else QtElment.th = DefaultNode;
    return QtElment;
  }

}
