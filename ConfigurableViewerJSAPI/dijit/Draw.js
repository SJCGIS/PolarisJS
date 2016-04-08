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
    ], function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Button, lang, Color, ColorPalette, TooltipDialog, DropDownButton, NumberSpinner, Select, draw, Font, drawTemplate, dom, domStyle) {

    //anonymous function to load CSS files required for this module
        (function() {
            var path = location.pathname.replace(/[^\/]+$/, '');
        var css = [require.toUrl(path + "ConfigurableViewerJSAPI/dijit/Draw/css/Draw.css")];
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
	color: new Color([0,0,0]),
        postCreate: function() {
            this.inherited(arguments);
            this.drawToolbar = new esri.toolbars.Draw(this.map);
            this.graphics = new esri.layers.GraphicsLayer({
                id: "drawGraphics",
                title:"Draw Graphics"
            });
            this.map.addLayer(this.graphics);
            dojo.connect(this.drawToolbar, "onDrawEnd", this, 'onDrawToolbarDrawEnd');
        },
        drawPoint: function() {
            //this.disconnectMapClick();
	    this.graphicType = "point";
	    domStyle.set("drawPointOptions", "display", "inline");
	    domStyle.set("drawLineOptions", "display", "none");
	    domStyle.set("drawFillOptions", "display", "none");
	    domStyle.set("drawTextOptions", "display", "none");
            this.drawToolbar.activate(esri.toolbars.Draw.POINT);
        },
        drawLine: function() {
            //this.disconnectMapClick();
	    this.graphicType = "polyline";
	    domStyle.set("drawPointOptions", "display", "none");
	    domStyle.set("drawLineOptions", "display", "inline");
	    domStyle.set("drawFillOptions", "display", "none");
	    domStyle.set("drawTextOptions", "display", "none");
            this.drawToolbar.activate(esri.toolbars.Draw.POLYLINE);
        },
        drawPolygon: function() {
            //this.disconnectMapClick();
	    this.graphicType = "polygon";
	    domStyle.set("drawPointOptions", "display", "none");
	    domStyle.set("drawLineOptions", "display", "none");
	    domStyle.set("drawFillOptions", "display", "inline");
	    domStyle.set("drawTextOptions", "display", "none");
            this.drawToolbar.activate(esri.toolbars.Draw.POLYGON);
        },
	drawText: function(){
	    //this.disconnectMapClick();
	    this.graphicType = "text";
	    domStyle.set("drawPointOptions", "display", "none");
	    domStyle.set("drawLineOptions", "display", "none");
	    domStyle.set("drawFillOptions", "display", "none");
	    domStyle.set("drawTextOptions", "display", "inline");
	    this.drawToolbar.activate(esri.toolbars.Draw.POINT, {showTooltips: false});
	},
	drawCircle: function(){
	    this.graphicType = "polygon";
	    domStyle.set("drawPointOptions", "display", "none");
	    domStyle.set("drawLineOptions", "display", "none");
	    domStyle.set("drawFillOptions", "display", "inline");
	    domStyle.set("drawTextOptions", "display", "none");
            this.drawToolbar.activate(esri.toolbars.Draw.CIRCLE);
	},
	drawFreehandLine: function(){
	    this.graphicType = "polyline";
	    domStyle.set("drawPointOptions", "display", "none");
	    domStyle.set("drawLineOptions", "display", "inline");
	    domStyle.set("drawFillOptions", "display", "none");
	    domStyle.set("drawTextOptions", "display", "none");
            this.drawToolbar.activate(esri.toolbars.Draw.FREEHAND_POLYLINE);
	},
	drawFreehandPolygon: function(){
	    this.graphicType = "polygon";
	    domStyle.set("drawPointOptions", "display", "none");
	    domStyle.set("drawLineOptions", "display", "none");
	    domStyle.set("drawFillOptions", "display", "inline");
	    domStyle.set("drawTextOptions", "display", "none");
            this.drawToolbar.activate(esri.toolbars.Draw.FREEHAND_POLYGON);
	},
	setColor: function(value){
	    domStyle.set("drawColorButton_label", "color", value);
	    this.color.setColor(new Color.fromHex(value));
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
		var pointColor = lang.clone(this.color);
                symbol = new esri.symbol.SimpleMarkerSymbol({
		    "type": "esriSMS",
		    "style": dijit.byId("pointSymbolSelect").value,
		    "color": pointColor,
		    "size": dijit.byId("pointSizeSelect").value
		});
                break;
            case "polyline":
		var lineColor = lang.clone(this.color);
                symbol = new esri.symbol.SimpleLineSymbol({
		    "type": "esriSLS",
		    "style": dijit.byId("lineStyleSelect").value,
		    "color": lineColor,
		    "width": dijit.byId("lineSizeSelect").value
		});
                break;
            case "polygon":
		var outline = lang.clone(this.color);
		var fill = lang.clone(this.color);
		fill.a = 0.5;
                symbol = new esri.symbol.SimpleFillSymbol({
		    "type": "esriSFS",
		    "style": dijit.byId("fillTypeSelect").value,
		    "color": fill,
		    "outline": {
			"type": "esriSLS",
			"style": "esriSLSSolid",
			"color": outline,
			"width": 2
		    }
		});
                break;
	    case "text":
		var textColor = lang.clone(this.color);
		var myText = dom.byId("annoText").value;
		symbol = new esri.symbol.TextSymbol({
		    "type": "esriTS",
		    "color": textColor,
		    "font": {
			"family": dijit.byId("textFontSelect").value,
			"size": dijit.byId("textSizeSelect").value,
			"weight": "bold"
		    }
		});
		symbol.setText(myText);
		break;
	    default:
            }
            var graphic = new esri.Graphic(geometry, symbol);
            this.graphics.add(graphic);
        },
	undoLastGraphic: function() {
	    lastGraphic = this.graphics.graphics.pop();
	    lastGraphic.hide();
	},
        clearGraphics: function() {
            this.graphics.clear();
	    domStyle.set("drawPointOptions", "display", "none");
	    domStyle.set("drawLineOptions", "display", "none");
	    domStyle.set("drawFillOptions", "display", "none");
	    domStyle.set("drawTextOptions", "display", "none");
            this.drawToolbar.deactivate();
            //this.connectMapClick();
        }
    });
});
