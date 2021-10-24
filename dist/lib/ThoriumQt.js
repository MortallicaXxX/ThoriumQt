"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetStyle = exports.StyleSheet = exports.Style = exports.ThoriumQt = void 0;
const GUI_1 = require("./GUI");
const Engine_1 = require("./Engine");
const Template_1 = require("./Template");
const NodeUI_1 = require("./NodeUI");
const ElementUI_1 = require("./ElementUI");
var ThoriumQt;
(function (ThoriumQt) {
    /**
    * @Title ThoriumQt.Engine
    * @Desc Moteur de ThoriumQt, encapsule "nodegui" et offre des méthodes propres à thoriumqt.
    */
    class Engine extends Engine_1.Engine {
        constructor() { super(); }
        ;
    }
    ThoriumQt.Engine = Engine;
    /**
    * @Title ThoriumQt.Component
    * @Desc Permet de créer un component personaliser
    */
    class Component extends ElementUI_1.ElementUI {
        constructor(t) {
            super({ type: t.type, prop: t.prop, childrens: t.childrens, proto: t.proto }, null, null);
        }
    }
    ThoriumQt.Component = Component;
    /**
    * @Title ThoriumQt.GUI
    * @Desc Général User Interface
    * @Constructor arg1{Template:object}
    */
    class GUI extends GUI_1.GUI {
        constructor(template) { super(template); }
        ;
    }
    ThoriumQt.GUI = GUI;
    /**
    * @Title ThoriumQt.Template
    * @Desc Représente le template d'un élément qt
    */
    class Template extends Template_1.Template {
        constructor(template) { super(template); }
        ;
    }
    ThoriumQt.Template = Template;
    /**
    * @Title ThoriumQt.NodeUI
    * @Desc Noeud d'élément qt
    * @Constructor arg1{template:object|[object]} arg2{root:Engine|null} arg3{parent:any|null}
    */
    class NodeUI extends NodeUI_1.NodeUI {
        constructor(template, root, parent) { super(template, root, parent); }
        ;
    }
    ThoriumQt.NodeUI = NodeUI;
    /**
    * @Title ThoriumQt.ElementUI
    * @Desc Représente un élément qt
    * @Constructor arg1{template:{type:string,prop:object|null,childrens:NodeUI|null,proto:object|null}} arg2{root:Engine|null} arg3{parent:any|null}
    */
    class ElementUI extends ElementUI_1.ElementUI {
        constructor(template, root, parent) { super(template, root, parent); }
        ;
    }
    ThoriumQt.ElementUI = ElementUI;
})(ThoriumQt = exports.ThoriumQt || (exports.ThoriumQt = {}));
const Style_1 = require("./Style");
function Style(css) { return (new Style_1.Style()).Css(css); }
exports.Style = Style;
function StyleSheet(csssheet) { return (new Style_1.Style()).CssSheet(csssheet); }
exports.StyleSheet = StyleSheet;
function WidgetStyle(arg) { return (new Style_1.Style()).WidgetInCssSheet(arg); }
exports.WidgetStyle = WidgetStyle;
//# sourceMappingURL=ThoriumQt.js.map