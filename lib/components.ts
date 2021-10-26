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

  export class Layout extends ThoriumQt.Component{
    constructor(arg:any){
      super({
        type : 'FlexLayout',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : {}),
        proto : (arg.proto ? arg.proto : {}),
      })
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

  export class RowContainer extends Container{
    constructor(arg:any){

      const prop:any = (arg.prop ? arg.prop : {});
      if(prop.InlineStyle) prop.InlineStyle = prop.InlineStyle + Style({ 'flex-direction' : 'row'});
      else prop.InlineStyle = Style({
        'flex-direction' : 'row',
      });

      super({
        prop : prop,
        childrens : arg.childrens,
        proto : arg.proto
      })

      // console.log(this);

    }
  }

  export class ColumnContainer extends Container{
    constructor(arg:any){

      const prop:any = (arg.prop ? arg.prop : {});
      if(prop.InlineStyle) prop.InlineStyle = prop.InlineStyle + Style({ 'flex-direction' : 'column'});
      else prop.InlineStyle = Style({
        'flex-direction' : 'column',
      });

      super({
        prop : prop,
        childrens : arg.childrens,
        proto : arg.proto
      })

    }
  }

  export class Grid extends ThoriumQt.Component{
    constructor(arg:any){

      super(new Container({
        prop : (arg.prop ? arg.prop : {}),
        childrens : [
          new RowContainer({
            childrens : (function(data){
              return Array.from({length : data.length} , function(x:null,ix:number){
                return new ColumnContainer({
                  childrens : Array.from({length : data[ix].length} , function(y:null,iy:number){
                    return (typeof data[ix][iy] == "object" ? data[ix][iy] : new Text({prop:{Text:String(data[ix][iy])}}) );
                  })
                })
              })
            })(arg.data)
          })
        ]
      }));
      // console.log(this);
    }
  }

  export class Table extends ThoriumQt.Component{
    constructor(arg:any){

      if('headers' in arg == false)arg.headers = [];
      super(new Container({
        prop : (arg.prop ? arg.prop : {}),
        childrens : [
          new RowContainer({
            childrens : (function(header,data){
              return Array.from({length : data.length} , function(x:null,ix:number){
                return new ColumnContainer({
                  childrens : [
                    new Text({prop:{Text:(typeof header[ix] == "undefined" ? ix : String(header[ix]) )}}),
                    ...Array.from({length : data[ix].length} , function(y:null,iy:number){
                      return (typeof data[ix][iy] == "object" ? data[ix][iy] : new Text({prop:{Text:String(data[ix][iy])}}) );
                    })
                  ]
                })
              })
            })(arg.headers,arg.data)
          })
        ]
      }));
    }
  }

}
