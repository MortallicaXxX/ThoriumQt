import * as nodegui from '@nodegui/nodegui';
import logo from '../assets/logox200.png';
// import { ThoriumQt } from '../lib/thoriumQT';
import { ThoriumQt } from "../lib/ThoriumQt";

const thorium:ThoriumQt.Engine = new ThoriumQt.Engine();

thorium.GUI(
  new Object(
    [
      {
        type : "FlexLayout",
        childrens : [
          {
            type : "Label",
            prop : {ObjectName : "test" , Text : "LOL"}
          },
          {
            type : "Label",
            prop : {ObjectName : "mylabel2" , Text : "Test"}
          }
        ]
      },
      // {
      //   type : "Label",
      //   prop : {ObjectName : "mylabel1" , Text : "Hello1"}
      // },
      // {
      //   type : "PushButton",
      //   prop : { Icon : new nodegui.QIcon(logo)}
      // },
      // {
      //   type : "Label",
      //   prop : {ObjectName : "mylabel2" , Text : "Test"}
      // }
    ]
  )
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
    align-items: 'center';
    justify-content: 'center';
  }
  #test {
    height : 50%;
    width : 50%;
    background-color: red;
    flex: 1;
    flex-direction: column;
  }
`);
