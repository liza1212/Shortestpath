//variable
let isNodePressed = false
let nodes=[]
let nodeValue= null
let edges=[]
let setSrc = false, toBeEdged= false
let src, dest
let makeEdgeB = false;




function setup(){
    data = new graphh()
    canvas = createCanvas(window.innerWidth,window.innerHeight-100)
    canvas.position(0,99);
    canvas.mouseReleased(create)

    grid = createDiv()
    grid.attribute('class','grid')
    
    start = createDiv("Start ")
    start.attribute('class','startbox')
    grid.child(start)
    startsel = createSelect()
    startsel.attribute('class','startsel')
    start.child(startsel)

    dest = createDiv("Destination ")
    dest.attribute('class','destbox')
    grid.child(dest)
    destsel = createSelect()
    destsel.attribute('class','destsel')
    dest.child(destsel)


    res = createDiv("Result")
    res.attribute('class', 'result')
    //res.position(700,400)
    res.hide();

    
    //calculate button 
    calcbutton= createButton("Calculate")
    calcbutton.attribute('class','calculate')
    grid.child(calcbutton)
    calcbutton.mousePressed(shortestpath);

    

    //input node box with input and two button
    getNode = createDiv()
    getNode.attribute('class','getNodeBox')
    //getNode.position(500,500)

    //from here:
    getNodePrompt = createDiv('Enter node value:')
    getNode.child(getNodePrompt)

    inpNode = createInput('');
    inpNode.input(addNodeInput);
    inpNode.attribute('class','nodeinput')
    getNode.child(inpNode)

    setNode= createButton("Set")
    setNode.attribute('class','setNodeB')
    getNode.child(setNode)

    delNode= createButton("Cancel")
    delNode.attribute('class','setDelB')
    getNode.child(delNode)
    getNode.hide()
    // for the pop-up to enter the value of node up to here

    getEdge = createDiv()
    getEdge.attribute('class','getEdgeBox')
    //getEdge.position(400,400)
    getEdgePrompt = createDiv('Enter edge value:')
    getEdge.child(getEdgePrompt)

    inpEdge = createInput('');
    inpEdge.input(addEdgeInput);
    inpEdge.attribute('class','edgeinput')
    getEdge.child(inpEdge)

    setEdge= createButton("Set")
    setEdge.attribute('class','setEdgeB')
    getEdge.child(setEdge)

    delEdge= createButton("Cancel")
    delEdge.attribute('class','delEdgeB')
    getEdge.child(delEdge)

    getEdge.hide();
    //pop-up to get the value of the edge weight
    noLoop()
}



function draw(){

    background('lightblue');

    if (toBeEdged) {
        console.log('Edge drawn')
        edges.push(new Edge(src, dest, edgeValue))
        toBeEdged = false
        setSrc = false
    }
    else{
        if (nodeValue != null) {
            console.log('Node drawn')
            nodes.push(new Node(getNode.position().x, getNode.position().y, nodeValue))
            startsel.option(nodes[nodes.length - 1].getValue());
            destsel.option(nodes[nodes.length - 1].getValue())
        }
    }

    

    for (var node of nodes) {
        
        if(setSrc){
            src.outline();
        }
        if(node.getValue()== startsel.value() && node.getValue() == destsel.value()){
            node.setColor("crimson")
        }
        else if(node.getValue()== startsel.value()){
            node.setColor("pink")
        }
        else if(node.getValue() == destsel.value()){
            node.setColor("red")
        }
        else{
            node.setColor("green")
        }
        node.display()
    }

    if (edges.length != 0) {
        for (var edge of edges) {
            console.log(edge.getSource().getX(), edge.getSource().getY(), edge.getDest().getX(), edge.getDest().getY())
            edge.display()
        }
    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight-100);
  }

function addNodeInput(){
    nodeValue = this.value()
}


function addEdgeInput(){
    edgeValue = this.value()
}

function addNode(){
    let nodePresent= false;
    if (nodeValue != null) {
        
        for(node of data.list_of_Vertices()){
            if(nodeValue == node){

                alert("node already exists")
                nodePresent = true;
            } 
        }
        if(!nodePresent){        
            console.log('Node added to graph')
            data.add_node(nodeValue)
            redraw()
            nodeValue= null;
            inpNode.value('');
            getNode.hide()
            console.log(data)
        }
    }
}


function removeNode(node){
    nodeValue= null;
    inpNode.value(null);
    getNode.hide()
}

function removeEdge(){
    edgeValue= null;
    inpEdge.value('');
    getEdge.hide()
    setSrc= false;
    redraw();
}

function setEdgeValue(){
    
    if(edgeValue!= null && edgeValue>=0){
        toBeEdged = true
        srcSet = false
        makeEdgeB= false;
    console.log('Edge added to graph')
    data.add_edge(src.getValue(),dest.getValue(),edgeValue)
    redraw()
    edgeValue= null;
    inpEdge.value(null);
    getEdge.hide()
    console.log(data)
    }
    else{
        alert("Enter positive edge value")
    }

}

function handleEdge(node){
    if(!setSrc){
        src = node;
        setSrc = true
        redraw()
    }
    else{
        if(node != src){
            dest = node;
        getEdge.position((src.getX()+dest.getX())*0.5,(src.getY()+dest.getY())*0.5)
        getEdge.show()
        setEdge.mouseReleased(setEdgeValue)
        delEdge.mouseReleased(removeEdge)
        }
        else{
            alert("Select next node")
            setSrc = false
            redraw()
        }
    }
}

function create(){
    for(var node of nodes){
        if (node.isPressed()){
            isNodePressed = true;
            console.log(node.getX(),node.getY())
            handleEdge(node)
            break
            
        }
    }
    if(!isNodePressed){
        setSrc = false
        redraw()
        getNode.position(mouseX,mouseY)
        getNode.show()
        setNode.mouseReleased(addNode)
        delNode.mouseReleased(removeNode)
    }
    else{
        isNodePressed = false;
    }

}

function shortestpath()
{
    startNode=startsel.value();
    endNode=destsel.value();
    let Dkstra=new Dijkstra(data, startNode, endNode);
    Dkstra.shortest_Path_Finder();
    console.log(Dkstra)
    let msg=Dkstra.get_message_shortest_path();
    res.html(msg);
    res.show();
    redraw()
}