var colorLabel = document.getElementById('color-label');
var rgbaColor = 'rgba(255,0,0,1)';

class Detect extends PaintFunction{
    constructor(contextReal){
        super();
        this.contextReal = contextReal;      
    }
    
    onMouseDown(coord,event){
        this.origX = coord[0];
        this.origY = coord[1];
        var imageData = this.contextReal.getImageData(this.origX, this.origY, 1, 1).data;
        rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
        colorLabel.style.backgroundColor = rgbaColor;
     }
     onMouseLeave(){}
    }

