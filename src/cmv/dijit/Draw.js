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
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/toolbars/draw",
  "esri/symbols/Font",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/TextSymbol",
  "dojo/text!./Draw/templates/Draw.html",
  "dojo/dom",
  "dojo/dom-style",
  "xstyle/css!./Draw/css/Draw.css"
], function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Button, lang, Color, ColorPalette, TooltipDialog, DropDownButton, NumberSpinner, Select, Graphic, GraphicsLayer, draw, Font, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, TextSymbol, drawTemplate, dom, domStyle) {

  // main draw dijit
  return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
    widgetsInTemplate: true,
    templateString: drawTemplate,
    drawToolbar: null,
    graphics: null,
    graphicType: null,
    color: new Color([0,0,0]),
    postCreate: function() {
      this.inherited(arguments)
      this.drawToolbar = new draw(this.map)
      this.graphics = new GraphicsLayer({
        id: "drawGraphics",
        title:"Draw Graphics"
      })
      this.map.addLayer(this.graphics)
      dojo.connect(this.drawToolbar, "onDrawEnd", this, 'onDrawToolbarDrawEnd')
    },
    drawPoint: function() {
      //this.disconnectMapClick()
      this.graphicType = "point"
      domStyle.set("drawPointOptions", "display", "inline")
      domStyle.set("drawLineOptions", "display", "none")
      domStyle.set("drawFillOptions", "display", "none")
      domStyle.set("drawTextOptions", "display", "none")
      this.drawToolbar.activate(draw.POINT)
    },
    drawLine: function() {
      //this.disconnectMapClick()
      this.graphicType = "polyline"
      domStyle.set("drawPointOptions", "display", "none")
      domStyle.set("drawLineOptions", "display", "inline")
      domStyle.set("drawFillOptions", "display", "none")
      domStyle.set("drawTextOptions", "display", "none")
      this.drawToolbar.activate(draw.POLYLINE)
    },
    drawPolygon: function() {
      //this.disconnectMapClick()
      this.graphicType = "polygon"
      domStyle.set("drawPointOptions", "display", "none")
      domStyle.set("drawLineOptions", "display", "none")
      domStyle.set("drawFillOptions", "display", "inline")
      domStyle.set("drawTextOptions", "display", "none")
      this.drawToolbar.activate(draw.POLYGON)
    },
    drawText: function(){
      //this.disconnectMapClick()
      this.graphicType = "text"
      domStyle.set("drawPointOptions", "display", "none")
      domStyle.set("drawLineOptions", "display", "none")
      domStyle.set("drawFillOptions", "display", "none")
      domStyle.set("drawTextOptions", "display", "inline")
      this.drawToolbar.activate(draw.POINT, {showTooltips: false})
    },
    drawCircle: function(){
      this.graphicType = "polygon"
      domStyle.set("drawPointOptions", "display", "none")
      domStyle.set("drawLineOptions", "display", "none")
      domStyle.set("drawFillOptions", "display", "inline")
      domStyle.set("drawTextOptions", "display", "none")
      this.drawToolbar.activate(draw.CIRCLE)
    },
    drawFreehandLine: function(){
      this.graphicType = "polyline"
      domStyle.set("drawPointOptions", "display", "none")
      domStyle.set("drawLineOptions", "display", "inline")
      domStyle.set("drawFillOptions", "display", "none")
      domStyle.set("drawTextOptions", "display", "none")
      this.drawToolbar.activate(draw.FREEHAND_POLYLINE)
    },
    drawFreehandPolygon: function(){
      this.graphicType = "polygon"
      domStyle.set("drawPointOptions", "display", "none")
      domStyle.set("drawLineOptions", "display", "none")
      domStyle.set("drawFillOptions", "display", "inline")
      domStyle.set("drawTextOptions", "display", "none")
      this.drawToolbar.activate(draw.FREEHAND_POLYGON)
    },
    setColor: function(value){
      domStyle.set("drawColorButton_label", "color", value)
      this.color.setColor(new Color.fromHex(value))
    },
    disconnectMapClick: function() {
      dojo.disconnect(this.mapClickEventHandle)
      this.mapClickEventHandle = null
    },
    connectMapClick: function() {
      if(this.mapClickEventHandle === null) {
        this.mapClickEventHandle = dojo.connect(this.map, "onClick", this.mapClickEventListener)
      }
    },
    onDrawToolbarDrawEnd: function(geometry) {
      this.drawToolbar.deactivate()
      //this.connectMapClick()
      var symbol
      switch(this.graphicType) {
      case "point":
	var pointColor = lang.clone(this.color)
        symbol = new SimpleMarkerSymbol({
	  "type": "esriSMS",
	  "style": dijit.byId("pointSymbolSelect").value,
	  "color": pointColor,
	  "size": dijit.byId("pointSizeSelect").value
	})
        break
      case "polyline":
	var lineColor = lang.clone(this.color)
        symbol = new SimpleLineSymbol({
	  "type": "esriSLS",
	  "style": dijit.byId("lineStyleSelect").value,
	  "color": lineColor,
	  "width": dijit.byId("lineSizeSelect").value
	})
        break
      case "polygon":
	var outline = lang.clone(this.color)
	var fill = lang.clone(this.color)
	fill.a = 0.5
        symbol = new SimpleFillSymbol({
	  "type": "esriSFS",
	  "style": dijit.byId("fillTypeSelect").value,
	  "color": fill,
	  "outline": {
	    "type": "esriSLS",
	    "style": "esriSLSSolid",
	    "color": outline,
	    "width": 2
	  }
	})
        break
      case "text":
	var textColor = lang.clone(this.color)
	var myText = dom.byId("annoText").value
	symbol = new TextSymbol({
	  "type": "esriTS",
	  "color": textColor,
	  "font": {
	    "family": dijit.byId("textFontSelect").value,
	    "size": dijit.byId("textSizeSelect").value,
	    "weight": "bold"
	  }
	})
	symbol.setText(myText)
	break
      default:
      }
      var graphic = new Graphic(geometry, symbol)
      this.graphics.add(graphic)
    },
    undoLastGraphic: function() {
      lastGraphic = this.graphics.graphics.pop()
      lastGraphic.hide()
    },
    clearGraphics: function() {
      this.graphics.clear()
      domStyle.set("drawPointOptions", "display", "none")
      domStyle.set("drawLineOptions", "display", "none")
      domStyle.set("drawFillOptions", "display", "none")
      domStyle.set("drawTextOptions", "display", "none")
      this.drawToolbar.deactivate()
      //this.connectMapClick()
    }
  })
})
