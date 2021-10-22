import * as nodegui from '@nodegui/nodegui';
import logo from '../assets/logox200.png';
import { ThoriumQt } from '../lib/thoriumQT';

const thorium:ThoriumQt.Engine = new ThoriumQt.Engine();

thorium.GUI(
  new Object(
    [{
      type : "Label",
      prop : {ObjectName : "mylabel1" , Text : "Hello1"}
    },
    {
      type : "PushButton",
      prop : { Icon : new nodegui.QIcon(logo)}
    },
    {
      type : "Label",
      prop : {ObjectName : "mylabel2" , Text : "Test"}
    }]
  )
)
.Build()
.then(function(result){
  thorium.Show();
})

thorium.setStyleSheet(
  `#app {
      background-color: #009688;
      height: '100%';
      align-items: 'center';
      justify-content: 'center';
    }
    #mylabel1 {
      font-size: 16px;
      font-weight: bold;
      padding: 1;
    }
    #mylabel2 {
      font-size: 16px;
      font-weight: bold;
      padding: 1;
    }`
);
