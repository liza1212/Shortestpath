// let no_of_vertices,list_of_node_and_edges,new_node;
// let src, dest,val;
class graphh{
    constructor()
    {
        this.no_of_vertices=0;
        this.list_of_node_and_edges= new Map();   // source{(1:[dest:val]),(2:[]),(3,[])}
    }
    list_of_Vertices()
    {
        return this.list_of_node_and_edges.keys();//[2,34,45]
    }
    add_node(new_node)
    {
        this.list_of_node_and_edges.set(new_node,[]);
        this.no_of_vertices++;
        console.log(` ${new_node} Node is added`)
    }
    add_edge(src, dest,val)
    {
        let node_to_add=new Object();
        node_to_add["Value"]=dest;
        node_to_add["Weight"]=val;
        this.list_of_node_and_edges.get(src).push(node_to_add);
        console.log('Edge is added')
        console.log(`${src}=>${dest}`);
    }
    get_edge_of_certain_node(currNode)//get_edge_ffefefef(2)
    {
        return this.list_of_node_and_edges.get(currNode);
    }
}
// let pear=new graphh();
// pear.add_node(1);
// pear.add_node(2);
// pear.add_node(4);
// pear.add_node(5);
// pear.add_node(3);
// pear.add_edge(1,2,7); //1:
// pear.add_edge(2,3,4);
// pear.add_edge(2,4,3);
// pear.add_edge(1,5,3);
// pear.add_edge(5, 3, 1);
// pear.add_edge(3,4,1);
// pear.add_edge(3,2,5);

// console.log(pear);