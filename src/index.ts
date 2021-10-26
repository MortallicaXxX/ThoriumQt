// import * as nodegui from '@nodegui/nodegui';
// import logo from '../assets/logox200.png';
// // import { ThoriumQt } from '../lib/thoriumQT';
import {
  ThoriumQt ,
  Style ,
  StyleSheet ,
  WidgetStyle as Wstyle
} from "../lib/ThoriumQt";

import { ComponentsLib as component } from "../lib/components";
const {
  Text:Text ,
  Button:Button ,
  Container:Container ,
  RowContainer:RowContainer,
  ColumnContainer:ColumnContainer,
  Grid:Grid,
  Table:Table
} = component;

import { View1 } from "../views/view.1";

const thorium:ThoriumQt.Engine = new ThoriumQt.Engine();

thorium.onReady = async function(self:ThoriumQt.Engine){

  thorium.GUI(
      [
        // {
        //   type : "FlexLayout",
        //   prop : {
        //     ObjectName:"app_container",
        //   },
        //   childrens : [
        //     new Container({
        //       prop : {
        //         ObjectName : "nav_header",
        //         InlineStyle : Style({ // Style du component
        //           height: '20px',
        //           width:'100%',
        //           background : 'white',
        //           'flex-direction' : 'row',
        //           'align-items': 'center',
        //           'justify-content':'flex-start',
        //         }),
        //         StyleSheet : StyleSheet([ // Feuille de style liée au component
        //           Wstyle({ // QPushButton#Menu_text_0 , QPushButton#Menu_text_1 , QPushButton#Menu_text_2
        //             tag : "QPushButton",
        //             name : ['Menu_text_0','Menu_text_1','Menu_text_2'],
        //             style : Style({
        //               color : 'red',
        //               background : 'blue',
        //               margin:'1px',
        //               'padding-left':'4px',
        //               'padding-right':'4px',
        //             })
        //           }),
        //         ]),
        //       },
        //       childrens : [
        //         new Button({
        //           prop : {
        //             Text : "Menu0",
        //             ObjectName:'Menu_text_0',
        //           },
        //           proto : {
        //             onMouseMove : function(event:any,controlMouse:any){
        //               console.log(event,controlMouse);
        //             }
        //           }
        //         }),
        //         new Button({
        //           prop : {
        //             Text : "Menu1",
        //             ObjectName:'Menu_text_1',
        //           }
        //         }),
        //         new Button({
        //           prop : {
        //             Text : "Menu2",
        //             ObjectName:'Menu_text_2',
        //           }
        //         })
        //       ]
        //     }),
        //     new Grid({
        //       prop : {
        //         InlineStyle : Style({
        //           flex:1,
        //           width : "100%",
        //         })
        //       },
        //       data : [
        //         [
        //           new Container({
        //             prop : {
        //               InlineStyle : Style({
        //                 background:"lightcoral",
        //               })
        //             },
        //             childrens : [
        //               new Text({prop:{Text:"Actualitée"}})
        //             ]
        //           }),
        //           new Container({
        //             prop : {
        //               InlineStyle : Style({
        //                 background:"lightgreen",
        //               })
        //             },
        //             childrens : [
        //               new Text({prop:{Text:"News Belgique"}})
        //             ]
        //           }),
        //         ],
        //         [
        //           new Container({
        //             prop : {
        //               InlineStyle : Style({
        //                 background:"orange",
        //               })
        //             },
        //             childrens : [
        //               new Text({prop:{Text:"News Mondiale"}})
        //             ]
        //           }),
        //           new Container({
        //             prop : {
        //               InlineStyle : Style({
        //                 background:"lightblue",
        //               })
        //             },
        //             childrens : [
        //               new Text({prop:{Text:"Météo"}})
        //             ]
        //           }),
        //         ]
        //       ]
        //     })
        //   ]
        // }
        new View1.Main()
      ]
  )
  .Build()
  .then(function(result:any){
    console.log("Generation finie");
    thorium.setWindowTitle("Test_titre");
    thorium.Show();
  })

}

thorium.setStyleSheet(`
  #app {
    background-color: #080a16;
    height: '100%';
    width : '100%';
    align-items: 'center';
    color : white;
    flex-direction : column;
  }

  #AppLayout{
    flex:'1';
  }
`);

// #header {
//   height: '100%';
//   width:'100%';
//   flex:'1';
// }
