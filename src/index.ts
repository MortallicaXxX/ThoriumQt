// import * as nodegui from '@nodegui/nodegui';
// import logo from '../assets/logox200.png';
// // import { ThoriumQt } from '../lib/thoriumQT';
import {
  ThoriumQt ,
  Style ,
  StyleSheet ,
  WidgetStyle as Wstyle
} from "../lib/ThoriumQt";

import { ComponentsLib } from "../lib/components";
const {
  Container:Container ,
  Button:Button ,
  Text:Text
} = ComponentsLib;

const thorium:ThoriumQt.Engine = new ThoriumQt.Engine();

thorium.GUI(
    [
      {
        type : "FlexLayout",
        prop : {
          ObjectName:"app_container",
        },
        childrens : [
          new Container({
            prop : {
              ObjectName : "nav_header",
              InlineStyle : Style({ // Style du component
                height: '20px',
                width:'100%',
                background : 'white',
                'flex-direction' : 'row',
                'align-items': 'center',
                'justify-content':'flex-start',
              }),
              StyleSheet : StyleSheet([ // Feuille de style liée au component
                Wstyle({ // QPushButton#Menu_text_0 , QPushButton#Menu_text_1 , QPushButton#Menu_text_2
                  tag : "QPushButton",
                  name : ['Menu_text_0','Menu_text_1','Menu_text_2'],
                  style : Style({
                    color : 'red',
                    background : 'blue',
                    margin:'1px',
                    'padding-left':'4px',
                    'padding-right':'4px',
                  })
                }),
              ]),
            },
            childrens : [
              new Button({
                prop : {
                  Text : "Menu0",
                  ObjectName:'Menu_text_0',
                }
              }),
              new Button({
                prop : {
                  Text : "Menu1",
                  ObjectName:'Menu_text_1',
                }
              }),
              new Button({
                prop : {
                  Text : "Menu2",
                  ObjectName:'Menu_text_2',
                }
              })
            ]
          }),
          new Container({
            prop : {
              ObjectName : "Acceuil"
            },
            childrens : [
              new Text({prop:{Text:"LOL #0"}}),
              new Text({prop:{Text:"LOL #1"}}),
              new Text({prop:{Text:"LOL #2"}}),
              new Text({prop:{Text:"LOL #3"}}),
              new Text({prop:{Text:"LOL #4"}}),
              new Text({prop:{Text:"LOL #5"}}),
            ]
          })
        ]
      }
    ]
)
.Build()
.then(function(result:any){
  thorium.setWindowTitle("Test_titre");
  thorium.Show();
})

thorium.setStyleSheet(`
  #app {
    background-color: #080a16;
    height: '100%';
    width : '100%';
    align-items: 'center';
    color : white;
    flex-direction : column;
  }

  #app_container{
    flex:'1';
  }

  QLabel{
    background : dimgray;
  }
`);

// #header {
//   height: '100%';
//   width:'100%';
//   flex:'1';
// }
