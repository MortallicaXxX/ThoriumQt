/**
* @Title ThoriumQt.Template
* @Desc Représente le template d'un élément qt
*/
export class Template{

  type:string;
  prop:object|null = null;
  proto:object|null = null;

  constructor(template:{type:string,prop:object|null,proto:object|null}){
    this.type = template.type;
    if(template.prop)this.prop = template.prop;
    if(template.proto)this.proto = template.proto;
  }

}
