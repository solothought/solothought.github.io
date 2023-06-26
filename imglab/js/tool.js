class Tool{
    constructor(type, title, name,  desc, icon){
        this.type = type; //to categorize
        this.title = title; //to display on tool button
        this.desp = desp; //displayed on hover
        this.icon = icon; //to display on tool button
        this.name = name; //to identify
    }

    select = function(){}
}

var tools = {
    "tool-point" : new Tool("shape","Point","point", "Create a feature point inside a shape","point.svg") ,
    "tool-circle" : new Tool("shape","Circle","circle", "Create a circle","point.svg"),
    "tool-rectangle" : new Tool("shape","Rectangle","rectangle", "Create a rectangle","rectangle.svg"),
    "tool-polygon" : new Tool("shape","Polygon","polygon", "Create a polygon","polygon.svg"),
    "tool-move" : new Tool("transport","Move", "move", "Move an element", "move.svg"),
    "tool-zoom-in" : new Tool("transport", "Zoom In", "zoom-in" , "Enlarge the workarea",  "zoomin.svg"),
    "tool-zoom-out" : new Tool("transport", "Zoom Out", "zoom-out" , "Create a concave polygon",  "zoomout.svg"),
    "tool-light" : new Tool("transport", "Hide Image", "lightbulb" , "Hide the image",  "lightbulb.svg")
};

tools["tool-point"].select = selectShapeTool;
tools["tool-circle"].select = selectShapeTool;
tools["tool-rectangle"].select = selectShapeTool;
tools["tool-polygon"].select = selectShapeTool;

function selectShapeTool(){
    selectedTool = this;
    myCanvas.style('cursor','crosshair');
}

class Shape{

    //instance; //this property needs to be set by create()
    //state = "selected"; //readyToUse, created, moving, 
    /**
     * Check if  minimum criteria is met to create an element.
     * Eg: element is outside svg box, it's size is smaller than min size expected, it is created on the wrong place etc.
     * @param {*} el 
     */
    validate = function(el){ return true;};

    /**
     * Check if  minimum criteria is met to move an element.
     * Eg: element is outside svg box etc.
     * @param {*} el 
     */
    dragCriteria = function(el){ return true;};

    /**
     * It gives the instance of relevant element and sets styling, classes etc.
     * @param {*} el 
     */
    create = function(event/* , parent */){ return true;}; //this.instance.parent() can return the container

    /**
     * To perform additional operation on movement of current element
     * Eg. Move all the connected / linked elements which are not the child of same parent (sibling)
     * @param {*} event 
     * @param {*} parent 
     */
    move = function(event){ return true;};

    /**
     * When tool is created, moved, deleted, or reshaped
     * Eg: update data object with any change
     */
    update = function(){}
}

var pointShape = new Shape();
pointShape.create = function(e,container){
    var canvasOffset = myCanvas.node.getBoundingClientRect();
    containerOffset = {
        x: container.parent().attr("x"),
        y :container.parent().attr("y")
    }
    //TODO : extract code to calculate point position
    var point =  container.parent().circle().radius(3).attr({ cx: e.x - canvasOffset.x - containerOffset.x, cy: e.y - canvasOffset.y - containerOffset.y}).addClass('labelpoint');
    point.draggable();
    return point;
};

var circleShape = new Shape();
circleShape.create = function(e){
    var circle =  myCanvas.nested().circle().radius().addClass('labelcircle').draw();
    circle.resize();
    circle.parent().draggable();
    return circle;
}
circleShape.validate = function(el){
    return Number.parseInt(el.attr("r")) > 3;
}

var rectShape = new Shape();
rectShape.create = function(){
    var rect =  myCanvas.nested().rect().addClass('labelbox').draw();
    rect.resize();
    rect.parent().draggable();
    return rect;
},
rectShape.validate = function(el){
    return Number.parseInt(el.attr("width")) > 3;
};

var polyShape = new Shape();
polyShape.create = function(){
    var poly =  myCanvas.nested().polygon().addClass('labelbox').draw();
    poly.draggable().resize();

    poly.on('drawstart', function(e){
        document.addEventListener('keydown', function(e){
            if(e.keyCode == 13){
                poly.draw('done');
                poly.off('drawstart');
            }
        });
    });

    return poly;
}

var shapes = {
    "tool-point" : pointShape,
    "tool-circle" : circleShape,
    "tool-rectangle" : rectShape,
    "tool-polygon" : polyShape,
}

