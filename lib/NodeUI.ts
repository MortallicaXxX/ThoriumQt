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

  constructor(template:object|object[] , root:Engine|null = null , parent:any|null = null){
    if(root) this.#root = root;
    if(parent) this.#parent = parent;
    else parent = this;
    this.#ui = this.#normalize(template);
  }

  BuildIn(parent:any):Promise<void>{
    const _this = this;

    function generate(i:number = 0):Promise<void>{
      return new Promise(async function(next){

        console.log("generate",_this.node.length)

        // rien à générer
        try{
          if(_this.node.length == 0)throw {code:1 , message : "Pas d'enfants"};

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

            if(childrens.type == "widget") parent.addWidget(childrens);
            if(childrens.type == "layout") parent.setLayout(childrens);

            /* Enfants à générer */
            if(_this.node[i].ui != null){
              console.log(_this.node[i].ui);
              _this.node[i].ui?.BuildIn(childrens)
              .then(async function(){

                console.log('\x1b[32m%s\x1b[0m',`Génération des [${_this.node[i].ui?.node.length}] enfants OK!`);

                if(i == _this.node.length - 1)next(childrens);
                else next(await generate(i + 1))

              })

            }
            else {
              if(i == _this.node.length - 1)next(childrens);
              else next(await generate(i + 1))
            }

          }
          else next(parent);
        }
        catch(err:any){
          if(err.code == 1)next(parent)
        }

      })
    }

    return generate();
  }

  #normalize(template:object|[object]|null):Array<ElementUI>|[]{
    if(template && typeof template == 'object' && !Array.isArray(template))template = [template];
    if(template && Array.isArray(template)) return Array.from(template , function(x:any,i:number){
      console.log(x);
      if(x.__proto__.constructor.name == "Object") return new ElementUI(x);
      else return x;
    });
    else return [];
  }

}
