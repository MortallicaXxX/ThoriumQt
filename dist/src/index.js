"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as nodegui from '@nodegui/nodegui';
// import logo from '../assets/logox200.png';
// // import { ThoriumQt } from '../lib/thoriumQT';
const ThoriumQt_1 = require("../lib/ThoriumQt");
const components_1 = require("../lib/components");
const { Text: Text, Button: Button, Container: Container, RowContainer: RowContainer, ColumnContainer: ColumnContainer, Grid: Grid, Table: Table } = components_1.ComponentsLib;
const view_1_1 = require("../views/view.1");
const thorium = new ThoriumQt_1.ThoriumQt.Engine();
thorium.onReady = function (self) {
    return __awaiter(this, void 0, void 0, function* () {
        thorium.GUI([
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
            //         StyleSheet : StyleSheet([ // Feuille de style li??e au component
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
            //               new Text({prop:{Text:"Actualit??e"}})
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
            //               new Text({prop:{Text:"M??t??o"}})
            //             ]
            //           }),
            //         ]
            //       ]
            //     })
            //   ]
            // }
            new view_1_1.View1.Main()
        ])
            .Build()
            .then(function (result) {
            console.log("Generation finie");
            thorium.setWindowTitle("Test_titre");
            thorium.Show();
        });
    });
};
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
//# sourceMappingURL=index.js.map