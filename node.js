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
        fill(this.color)
        ellipse(this.x, this.y, 50, 50)
        fill(0,0,255)
        textSize(15)
        text(this.val, this.x, this.y)
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