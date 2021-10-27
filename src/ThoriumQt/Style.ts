/**
*/
export class Style{

  Css(arg:object):string{
    const keys = Object.keys(arg);
    const values = Object.values(arg);
    return Array.from({length : Object.keys(arg).length} , function(x:null,i:number):string{
      return `${keys[i]} : '${values[i]}';`;
    }).join("");
  }

  CssSheet(stylesheet:string|string[]):string{
    if(Array.isArray(stylesheet) == true)return Array.from({length:stylesheet.length} , function(x:null,i:number){
      return stylesheet[i];
    }).join("");
    else return stylesheet.toString();
  }

  WidgetInCssSheet(arg:{tag?:string|null , name?:string|string[]|null , style:string}):string{
    return `${(Array.isArray(arg.name) || arg.tag == null ? '' : arg.tag)}${(arg.name == null ? '' : (Array.isArray(arg.name) == false ? `#${arg.name}` : Array.from(arg.name , function(x:string,i:number){if(arg.name) return `${(arg.tag ? arg.tag : '')}#${x}${(i != arg.name.length - 1 ? `, ` : ``)}`}).join("")) )}{${arg.style}}`
  }

}
