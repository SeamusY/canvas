class DrawingCircle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;            
    }
    
    onMouseDown(coord,event){
        this.origX = coord[0];
        this.origY = coord[1];
    }
    
    onDragging(coord,event){
        this.contextDraft.fillStyle = rgbaColor;
        this.contextDraft.strokeStyle = rgbaColor;
        this.contextDraft.lineWidth = 1;
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.beginPath();
        this.contextDraft.arc(this.origX, this.origY, Math.sqrt(Math.pow(this.origX - coord[0], 2) + Math.pow(this.origY - coord[1], 2))  , 0, 2 * Math.PI, false);
        this.contextDraft.closePath();
        this.contextDraft.stroke();
        this.contextDraft.fill()
    }

    onMouseMove(){}
    onMouseUp(coord){
        
        this.contextReal.fillStyle = rgbaColor;
        this.contextReal.strokeStyle = rgbaColor;
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.beginPath();
        this.contextReal.arc(this.origX, this.origY, Math.sqrt(Math.pow(this.origX - coord[0], 2) + Math.pow(this.origY - coord[1], 2)) , 0, 2 * Math.PI, false);
        this.contextReal.closePath();
        this.contextReal.stroke();
        this.contextReal.fill();
    }
    onMouseLeave(){}
    onMouseEnter(){}
}
