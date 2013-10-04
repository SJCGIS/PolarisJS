define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/form/Button",
    "dojo/_base/lang",
    "dojo/_base/Color",
    "dijit/ColorPalette",
    "dijit/TooltipDialog",
    "dijit/form/DropDownButton",
    "dijit/form/NumberSpinner",
    "dijit/form/Select",
    "esri/toolbars/draw",
    "esri/symbols/Font",
    "dojo/text!./Draw/templates/Draw.html",
    "dojo/dom",
    "dojo/dom-style"
    ], function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Button, lang, Color, ColorPalette, TooltipDialog, DropDownButton, NumberSpinner, Select, Draw, Font, drawTemplate, dom, domStyle) {

    //anonymous function to load CSS files required for this module
    (function() {
        var css = [require.toUrl("/PolarisJS/ConfigurableViewerJSAPI/dijit/Draw/css/Draw.css")];
        var head = document.getElementsByTagName("head").item(0),
            link;
        for(var i = 0, il = css.length; i < il; i++) {
            link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = css[i].toString();
            head.appendChild(link);
        }
    }());

    // main draw dijit
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        widgetsInTemplate: true,
        templateString: drawTemplate,
        drawToolbar: null,
        graphics: null,
	graphicType: null,
	color: new Color([255,0,0]),
        postCreate: function() {
            this.inherited(arguments);
            this.drawToolbar = new Draw(this.map);
            this.graphics = new esri.layers.GraphicsLayer({
                id: "drawGraphics",
                title:"Draw Graphics"
            });
            this.map.addLayer(this.graphics);
            dojo.connect(this.drawToolbar, "onDrawEnd", this, 'onDrawToolbarDrawEnd');
//	    domStyle.set("drawColorButton", "color", this.color.toCss());
        },
        drawPoint: function() {
            //this.disconnectMapClick();
	    this.graphicType = "point";
	    domStyle.set("textAnnotation", "display", "none");
            this.drawToolbar.activate(esri.toolbars.Draw.POINT);
        },
        drawLine: function() {
            //this.disconnectMapClick();
	    this.graphicType = "polyline";
	    domStyle.set("textAnnotation", "display", "none");
            this.drawToolbar.activate(esri.toolbars.Draw.POLYLINE);
        },
        drawPolygon: function() {
            //this.disconnectMapClick();
	    this.graphicType = "polygon";
	    domStyle.set("textAnnotation", "display", "none");
            this.drawToolbar.activate(esri.toolbars.Draw.POLYGON);
        },
	drawText: function(){
	    //this.disconnectMapClick();
	    this.graphicType = "text";
	    domStyle.set("textAnnotation", "display", "inline");	    
	    this.drawToolbar.activate(esri.toolbars.Draw.POINT, {showTooltips: false});
	},
        disconnectMapClick: function() {
            dojo.disconnect(this.mapClickEventHandle);
            this.mapClickEventHandle = null;
        },
        connectMapClick: function() {
            if(this.mapClickEventHandle === null) {
                this.mapClickEventHandle = dojo.connect(this.map, "onClick", this.mapClickEventListener);
            }
        },
        onDrawToolbarDrawEnd: function(geometry) {
            this.drawToolbar.deactivate();
            //this.connectMapClick();
            var symbol;
            switch(this.graphicType) {
            case "point":
                symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, this.color, 2), this.color);
                break;
            case "polyline":
                symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, this.color, 4);
                break;
            case "polygon":
                symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, this.color, 4), new Color([255, 255, 0, 0.0]));
                break;
	    case "text":
		var myText = dom.byId("annoText").value;
		var font = new Font();
		font.setSize("20");
		font.setFamily("Arial");
		font.setWeight(Font.WEIGHT_BOLDER)
		symbol = new esri.symbol.TextSymbol(myText);
		symbol.setFont(font);
		symbol.setColor(this.color);
		break;	    
	    default:
            }
            var graphic = new esri.Graphic(geometry, symbol);
            this.graphics.add(graphic);
        },
        clearGraphics: function() {
            this.graphics.clear();
	    domStyle.set("textAnnotation", "display", "none");
            this.drawToolbar.deactivate();
            //this.connectMapClick();
        }
    });
});
