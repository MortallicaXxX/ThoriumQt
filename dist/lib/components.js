"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentsLib = void 0;
const ThoriumQt_1 = require("./ThoriumQt");
var ComponentsLib;
(function (ComponentsLib) {
    function NormalizeProp() {
    }
    /**
    * @Title ComponentsLib.Button
    * @Desc Boutton par défaut
    * @Tag QLabel
    */
    class Text extends ThoriumQt_1.ThoriumQt.Component {
        constructor(arg) {
            super({
                type: 'Label',
                prop: ('prop' in arg ? arg.prop : {}),
                childrens: [],
                proto: ('proto' in arg ? arg.proto : {}),
            });
        }
    }
    ComponentsLib.Text = Text;
    /**
    * @Title ComponentsLib.Button
    * @Desc Boutton par défaut
    * @Tag QPushButton
    */
    class Button extends ThoriumQt_1.ThoriumQt.Component {
        constructor(arg) {
            super({
                type: 'PushButton',
                prop: ('prop' in arg ? arg.prop : {}),
                childrens: [],
                proto: ('proto' in arg ? arg.proto : {}),
            });
        }
    }
    ComponentsLib.Button = Button;
    /**
    * @Title ComponentsLib.Container
    * @Desc Container par défaut
    * @Tag [QWidget > FlexLayout]
    */
    class Container extends ThoriumQt_1.ThoriumQt.Component {
        constructor(arg) {
            if (arg.prop && "StyleSheet" in arg.prop) {
                const props = arg.prop;
                props.StyleSheet = (0, ThoriumQt_1.StyleSheet)([
                    (0, ThoriumQt_1.WidgetStyle)({
                        tag: `QWidget${(props.ObjectName ? `#${props.ObjectName}` : '')} > FlexLayout`,
                        style: (0, ThoriumQt_1.Style)({
                            flex: 1
                        })
                    }),
                    props.StyleSheet
                ]);
                arg.prop = props;
            }
            if (arg.prop && "InlineStyle" in arg.prop) {
                const props = arg.prop;
                props.StyleSheet = (0, ThoriumQt_1.StyleSheet)([
                    (0, ThoriumQt_1.WidgetStyle)({
                        tag: `QWidget${(props.ObjectName ? `#${props.ObjectName}` : '')}`,
                        style: props.InlineStyle
                    }),
                    props.StyleSheet
                ]);
                delete props.InlineStyle;
                arg.prop = props;
            }
            super({
                type: 'Widget',
                prop: (arg.prop ? arg.prop : {}),
                childrens: [{
                        type: 'FlexLayout',
                        childrens: (arg.childrens ? arg.childrens : [])
                    }],
                proto: (arg.proto ? arg.proto : {})
            });
        }
    }
    ComponentsLib.Container = Container;
})(ComponentsLib = exports.ComponentsLib || (exports.ComponentsLib = {}));
//# sourceMappingURL=components.js.map