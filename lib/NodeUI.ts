import { Template } from "./Template"
import { ElementUI } from "./ElementUI"
import { Engine } from "./Engine";
import * as nodegui from '@nodegui/nodegui';

/**
* @Title ThoriumQt.NodeUI
* @Desc Noeud d'élément qt
* @Constructor arg1{template:object|[object]} arg2{root:Engine|null} arg3{parent:any|null}
*/
export class NodeUI{

  #ui:Array<ElementUI>|[] = [];
  get node():Array<ElementUI>|[]{return this.#ui;}
  #root:Engine|null = null;
  #parent:any|null = null;

  constructor(template:object|[object] , root:Engine|null = null , parent:any|null = null){
    if(root) this.#root = root;
    if(parent) this.#parent = parent;
    else parent = this;
    this.#ui = this.#normalize(template);
  }

  BuildIn(parent:any):Promise<void>{
    const _this = this;

    return new Promise(function(next){

      if(_this.node.length == 0)next(parent);
      for(const i of Array.from({length : _this.node.length} , (x:null,i:number) => i)){

        var template:Template|null = _this.node[i].template;
        if(template == null)template = new Template({type:"empty",prop:null,proto:null});

        const className:string|null = (template.type in nodegui ? template.type : (`Q${template.type}` in nodegui ? `Q${template.type}` : null));

        if(className){

          /* Recuperation dynamique de la classe équivalante au type */
          type typeKey = keyof typeof nodegui;
          const typeName:typeKey = className as keyof typeof nodegui;
          const sup:any = nodegui[typeName];
          const childrens = new sup();

          if(template.prop)for(const key of Object.keys(template.prop)){

            /* ajout des propritée dynamiquement */
            type CibleKey = keyof typeof sup;
            const propName: CibleKey = `set${key}`;

            type TemplateKey = keyof typeof template.prop;
            const keyOfValue: TemplateKey = key as keyof typeof template.prop;
            const value:any = template.prop[keyOfValue];
            childrens[propName](value);

          }

          // console.table({parent:parent,childrens:childrens,toBuild:(_this.node[i].ui == null ? "null" : _this.node[i].ui )});

          console.table({
            parentType : parent.type,
            childrenType : childrens.type,
            childrenTemplateType : template.type,
            addWidget_parent : "addWidget" in parent,
            setLayout_parent : "setLayout" in parent,
            setCentralWidget_parent : "setCentralWidget" in parent,
            setFlexNode_children : "setFlexNode" in childrens,
          })

          if(_this.node[i].ui !== null){
            _this.node[i].ui?.BuildIn(childrens)
            .then(function(result){
              console.log("result");
              if("setFlexNode" in childrens)childrens.setFlexNode(parent.getFlexNode());
              console.log("setLayout" in parent);
              if("addWidget" in parent)parent.addWidget(childrens);
              else if("setLayout" in parent) parent.setLayout(childrens);
              console.log(childrens);
              if(i == _this.node.length - 1)next(childrens);
            })
          }
          else {
            if("setFlexNode" in childrens)childrens.setFlexNode(parent.getFlexNode());

            if("addWidget" in parent)parent.addWidget(childrens);
            else if("setLayout" in parent)parent.setLayout(childrens);
            // console.log(childrens);
            if(i == _this.node.length - 1)next(childrens);
          }

        }
        else next(parent);

      }

    })
  }

  #normalize(template:object|[object]|null):Array<ElementUI>|[]{
    if(template && typeof template == 'object' && !Array.isArray(template))template = [template];
    if(template && Array.isArray(template)) return Array.from(template , function(x:any,i:number){
      return new ElementUI(x);
    });
    else return [];
  }

}
