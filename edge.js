class Edge {
    constructor(src, dest, weight) {
        this.src = src
        this.dest = dest
        this.weight = weight
        this.theta = Math.atan((parseFloat(this.dest.getY()) - parseFloat(this.src.getY())) / (parseFloat(this.dest.getX()) - parseFloat(this.src.getX())))
        this.midX = 0.5 * (parseFloat(this.src.getX()) + parseFloat(this.dest.getX()))
        this.midY = 0.5 * (parseFloat(this.src.getY()) + parseFloat(this.dest.getY()))
        this.span1X = (parseFloat(this.src.getX()) - this.midX)
        this.span1Y = (parseFloat(this.src.getY()) - this.midY)
        this.length = Math.sqrt(this.span1X * this.span1X + this.span1Y * this.span1Y)
        
        if (this.theta < 0) {
            if ((parseFloat(this.dest.getY()) - parseFloat(this.src.getY())) > 0)
                this.theta = Math.PI + this.theta
        }
        else {
            if ((parseFloat(this.dest.getY()) - parseFloat(this.src.getY())) < 0)
                this.theta = Math.PI + this.theta
        }


        if(this.theta>= Math.Pi/2 && this.theta<= 3*Math.Pi/2){
            this.xtop=this.midX - 10 * Math.cos(this.theta+ Math.PI/ 4+ Math.PI)
            this.ytop=this.midY - 10 * Math.sin(this.theta +Math.PI/ 4+ Math.PI)
            this.xbottom=this.midX - 10 * Math.cos(this.theta - Math.PI / 4+ Math.PI)
            this.ybottom=this.midY - 10 * Math.sin(this.theta- Math.PI/ 4+ Math.PI) 
            
        }
        else{
            this.xtop=this.midX + 10 * Math.cos(this.theta+ Math.PI/ 4+ Math.PI)
            this.ytop=this.midY + 10 * Math.sin(this.theta +Math.PI/ 4+ Math.PI)
            this.xbottom=this.midX + 10 * Math.cos(this.theta - Math.PI / 4+ Math.PI)
            this.ybottom=this.midY + 10 * Math.sin(this.theta- Math.PI/ 4+ Math.PI) 
            
        }
        
        
    }

    display() {
        strokeWeight(4)
        stroke(1, 1, 1);
        console.log("Angle : ", this.theta)
        line(parseFloat(this.src.getX()) + 25 * Math.cos(this.theta), parseFloat(this.src.getY()) + 25* Math.sin(this.theta), parseFloat(this.dest.getX()) - 25 * Math.cos(this.theta), parseFloat(this.dest.getY()) - 25 * Math.sin(this.theta))
        console.log("line size:", parseFloat(this.src.getX()) + 25 * Math.cos(this.theta), parseFloat(this.src.getY()) + 25 * Math.sin(this.theta), parseFloat(this.dest.getX()) - 25 * Math.cos(this.theta), parseFloat(this.dest.getY()) - 25 * Math.sin(this.theta))
        line(this.midX,this.midY,this.xtop,this.ytop)
        line(this.midX,this.midY,this.xbottom,this.ybottom)
        textSize(32)
        fill(0, 102, 153);
        strokeWeight(0)
        text(this.weight, this.midX - 20, this.midY - 20)  
    }
    getSource() {
        return this.src
    }
    getDest() {
        return this.dest
    }
}