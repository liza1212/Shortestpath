class Node{
    constructor(x, y, val, color) {
        this.x = x;
        this.y = y;
        this.val = val;
        this.color = color;
    }
    getX() {
        return this.x
    }
    getY() {
        return this.y
    }
    display() {
        strokeWeight(1)
        stroke(0, 100, 0)
        fill(this.color)
        ellipse(this.x, this.y, 50, 50)
        fill(0,0,0)
        textSize(18)
        text(this.val, this.x-3, this.y+3)
    }
    isPressed() {
        let distance = dist(mouseX, mouseY, this.x, this.y)
        if (distance < 25)
            return true;
        else
            return false;
    }
    getValue() {
        return this.val;
    }
    outline(){
        noFill()
        strokeWeight(1)
        ellipse(this.x, this.y, 60, 60)
    }
}