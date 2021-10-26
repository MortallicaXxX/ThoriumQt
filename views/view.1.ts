import * as nodegui from '@nodegui/nodegui';
import {
  ThoriumQt ,
  Style ,
  StyleSheet ,
  WidgetStyle as Wstyle
} from "../lib/ThoriumQt";
import {
  ComponentsLib as Component
} from "../lib/components";

import { ComponentsLib as component } from "../lib/components";

/**
* @Title View
* @Desc Boutton par défaut
* @Tag QLabel
*/
export namespace View1{

  class Menu extends ThoriumQt.Component{
    constructor(){
      super(
        new Component.ColumnContainer({
          prop : {
            InlineStyle : Style({
              background : "blue",
              'justify-content':'flex-end',
            })
          },
          childrens : [
            new Component.Button({
              prop:{
                Text:"Profil",
                InlineStyle : Style({
                  background : "red",
                }),
              }
            }),
            new Component.Button({prop:{Text:"Choix du pays"}}),
          ]
        })
      )
    }
  }

  class Contenu extends ThoriumQt.Component{
    constructor(){
      super(
        new Component.ColumnContainer({
          childrens : [
            new Component.Container({
              prop : {InlineStyle : Style({flex:2})}
            }),
            new Component.Grid({
              prop : {
                InlineStyle : Style({

                }),
                StyleSheet : StyleSheet([
                  Wstyle({
                    tag : "QLabel",
                    style : Style({
                      color : "white",
                      'justify-content':'center',
                    })
                  })
                ])
              },
              data : [
                [
                  new Component.Text({prop:{Text:"Daily For Country"}}),
                  new Component.Text({prop:{Text:"Regions In Country"}}),
                  new Component.Text({prop:{Text:"Provinces In Country"}}),
                ],
                [
                  new Component.Text({prop:{Text:"number"}}),
                  new Component.Text({prop:{Text:"number"}}),
                  new Component.Text({prop:{Text:"number"}}),
                ]
              ]
            })
          ]
        })
      )
    }
  }

  export class Main extends ThoriumQt.Component{
    constructor(){
      super(
        new Component.Layout({
          prop : {
            ObjectName:"AppLayout"
          },
          childrens : [
            new Component.Grid({
              prop : {
                InlineStyle : Style({
                  flex:1,
                  width:"100%",
                })
              },
              data : [
                [
                  new Menu()
                ],
                [
                  new Contenu()
                ]
              ]
            })
          ]
        })
      );
    }
  }

}
