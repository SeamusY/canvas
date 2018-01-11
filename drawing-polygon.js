class DrawingPolygon extends PaintFunction{
    constructor(contextReal, ContextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.firstclick = true;
        this.coordinates = [];  
       
    }
    onMouseUp(coord,event){
        if(this.firstclick){
            this.originX = coord[0];
            this.originY = coord[1];
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(this.originX, this.originY);
            this.firstclick = false;
            console.log(this.originX);
            console.log(this.originY);
     
        }
        else{
            this.coordinates.push({x:coord[0], y:coord[1]});
            this.contextDraft.lineTo(this.coordinates[this.coordinates.length-1].x, this.coordinates[this.coordinates.length-1].y);
            this.contextDraft.strokeStyle = rgbaColor;
            this.contextDraft.stroke();
        }
    }
    doubleClick(){
        this.contextDraft.closePath();
        this.commit();
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.reset();
  
    }
    commit(){
        this.contextReal.beginPath();
        this.contextReal.moveTo(this.originX, this.originY);
        this.contextReal.strokeStyle = rgbaColor;
        for(var i=0;i<this.coordinates.length;i++){
            this.contextReal.lineTo(this.coordinates[i].x,this.coordinates[i].y);
        }
        this.contextReal.lineTo(this.originX,this.originY);
        this.contextReal.fillStyle = rgbaColor;
        this.contextReal.fill();
        this.contextReal.stroke();
        this.contextReal.closePath();
        
    }
    reset(){
        this.firstclick = true;
        this.coordinates = [];
    }
}