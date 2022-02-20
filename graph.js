class graph{
    constructor()
    {
        this.no_of_vertices=0;
        this.list_of_node_and_edges= new Map();
    }
    list_of_Vertices()
    {
        return this.list_of_node_and_edges.keys();
    }
    add_node(new_node)
    {
        this.list_of_node_and_edges.set(new_node,[]);
        this.no_of_vertices++;
    }
    add_edge(src, dest,val)
    {
        let node_to_add=new Object();
        node_to_add["Value"]=dest;
        node_to_add["Weight"]=val;
        this.list_of_node_and_edges.get(src).push(node_to_add);
        console.log(`${src}  => ${dest} : ${val}`);
    }
}