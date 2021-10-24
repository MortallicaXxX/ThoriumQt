import { ThoriumQt , Style , StyleSheet , WidgetStyle as Wstyle} from "./ThoriumQt";

export namespace ComponentsLib{

  function NormalizeProp(){

  }

  /**
  * @Title ComponentsLib.Button
  * @Desc Boutton par défaut
  * @Tag QLabel
  */
  export class Text extends ThoriumQt.Component{
    constructor(arg:any){
      super({
        type : 'Label',
        prop : ('prop' in arg ? arg.prop : {}),
        childrens : [],
        proto : ('proto' in arg ? arg.proto : {}),
      })
    }
  }

  /**
  * @Title ComponentsLib.Button
  * @Desc Boutton par défaut
  * @Tag QPushButton
  */
  export class Button extends ThoriumQt.Component{
    constructor(arg:any){
      super({
        type:'PushButton',
        prop:('prop' in arg ? arg.prop : {}),
        childrens:[],
        proto:('proto' in arg ? arg.proto : {}),
      });
    }
  }

  /**
  * @Title ComponentsLib.Container
  * @Desc Container par défaut
  * @Tag [QWidget > FlexLayout]
  */
  export class Container extends ThoriumQt.Component{
    constructor(arg:any){

      if(arg.prop && "StyleSheet" in arg.prop){
        const props:any = arg.prop;
        props.StyleSheet = StyleSheet([
          Wstyle({
            tag : `QWidget${(props.ObjectName ? `#${props.ObjectName}` : '')} > FlexLayout`,
            style : Style({
              flex:1
            })
          }),
          props.StyleSheet
        ]);
        arg.prop = props;
      }

      if(arg.prop && "InlineStyle" in arg.prop){
        const props:any = arg.prop;
        props.StyleSheet = StyleSheet([
          Wstyle({
            tag : `QWidget${(props.ObjectName ? `#${props.ObjectName}` : '')}`,
            style : props.InlineStyle
          }),
          props.StyleSheet
        ]);
        delete props.InlineStyle;
        arg.prop = props;
      }

      super({
        type:'Widget',
        prop:(arg.prop ? arg.prop : {}),
        childrens:[{
          type:'FlexLayout',
          childrens:(arg.childrens ? arg.childrens : [])
        }],
        proto:(arg.proto ? arg.proto : {})
      })

    }
  }

}
