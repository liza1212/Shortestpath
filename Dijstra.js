let graph, source, destination,tank, max_size, dest_value, edge_weight, relation_short_prev,pq, s_dist_edge_weight
let distance, actual_path
class PriorityQueue{
    constructor(max_size)
    {
        if(isNaN(max_size))
        {
            max_size=10;
        }
        this.max_size=max_size;
        this.tank= [];
    }
    isEmpty()
    {
        return this.tank.length===0;
    }
    isFull()
    {
        return this.tank.length>=this.max_size;
    }
    enqueue(dest_value, edge_weight)
    {
        if(this.isFull())
        {   
            console.log("Queue is full");
            return;
        }
        let qElement= new this.Element(dest_value, edge_weight);
        let Added_to_queue=false;
        for (let i=0;i<this.tank.length;i++)   // [(2,3),(3,4),(1,8)]    (2,5)
        {
            if (this.tank[i].edge_weight>qElement.edge_weight)
            {
                this.tank.splice(1,0,qElement);//[(2,3),(3,4),(2,5),(1,8)] 
                Added_to_queue=true;
                break;
            }
        }
        if(!Added_to_queue)
        {
            this.tank.push(qElement);
        }
    }
    dequeue()
    {
        if(this.isEmpty())
            console.log("Queue Underflow");
        return this.tank.pop();
    }
}
PriorityQueue.prototype.Element = class {
    constructor(dest_value, edge_weight)    
    {
        this.dest_value=dest_value;
        this.edge_weight=edge_weight;
    }
};
class Dijkstra{
    constructor(graph,source, destination)
    {
        this.graph=graph;
        this.s_dist_edge_weight=0;
        this.source=source;
        this.destination=destination;
        this.distance={};
        this.nodes=[];  //array
        this.rel_shortest_dist_and_prev={};
        this.actual_path=[];
        this.pq={}; //Object of key value pair which tells us which node to visit based on the stored minimum value.
        for (var v of this.graph.list_of_Vertices()) //[2,35,45] v=2
        {
            this.nodes.push(v);     //[2,35,45]
        }
        this.nodes.forEach(nod=>
            {
                this.distance[nod]=Infinity;  
            });
        this.distance[source]=0;
        
        this.pq=new PriorityQueue(this.nodes.length*this.nodes.length);

        this.pq.enqueue(source,0);  //so first ma visit this node, that is the shortest distance.
    }           //pq = next_det , cost_weigth    ()
    shortest_Path_Finder()
    {  
        while(!this.pq.isEmpty())
        {
            let node_at_pq=this.pq.dequeue(); //(1,0)
            let min_node=node_at_pq.dest_value;//1
            //let curr_min_weight=node_at_pq.edge_weight;
            this.graph.get_edge_of_certain_node(min_node).forEach(chimeki=> //chimeki has weight and value
                {
                    let temp=chimeki.Weight+this.distance[min_node];

                    if(temp<this.distance[chimeki.Value])
                    {   
                        this.rel_shortest_dist_and_prev[chimeki.Value]=min_node;  
                        this.distance[chimeki.Value]=temp;
                        this.s_dist_edge_weight=this.distance[chimeki.Value];
                        this.pq.enqueue(chimeki.Value,this.distance[chimeki.Value]);
                    }
                });     //prev:source
        }
        let current=this.destination;
        while(current!=this.source && current!=null)    //   if null than that means there is no path from source to destination
        {
            this.actual_path.push({"Node":current,"Weight":this.distance[current]});//{4,}
            current=this.rel_shortest_dist_and_prev[current];//current =1
        }
        this.actual_path.push({"Node":this.source,"Weight":this.distance[this.source]})
        this.actual_path.reverse();
    }
    get_shortest_distance()
    {
        return this.s_dist_edge_weight;
    }
    get_shortest_path()
    {
        return this.actual_path;
    }
}

//let fruit=new Dijkstra(pear, 1, 4);
//fruit.shortest_Path_Finder();
//console.log(fruit);