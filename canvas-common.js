let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
let currentFunction;  //This variable will allow us to change paint function, ie change to draw line, draw square
let dragging = false;


class PaintFunction{
    constructor(){}
    onMouseDown(){}
    onDragging(){}
    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}
    //Update
    onFinish(){}
    doubleClick(){}
}    
function desktopMode(){
    $('#canvas-draft').mousedown(function(e){
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;
        
        currentFunction.onMouseDown([mouseX,mouseY],e);
        dragging = true;
    });
    $('#canvas-draft').mousemove(function(e){
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;
        if(dragging){
            currentFunction.onDragging([mouseX,mouseY],e);
        }
        currentFunction.onMouseMove([mouseX,mouseY],e);
    });
    $('#canvas-draft').mouseup(function(e){
        dragging = false;
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;
        currentFunction.onMouseUp([mouseX,mouseY],e);
    });
    $('#canvas-draft').mouseleave(function(e){
    // dragging = false;
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;
        currentFunction.onMouseLeave([mouseX,mouseY],e);
    });
    
    $('#canvas-draft').mouseenter(function(e){
        //if(dragging == true){
            let mouseX = e.pageX - this.offsetLeft;
            let mouseY = e.pageY - this.offsetTop;
            currentFunction.onMouseEnter([mouseX,mouseY],e);
        //}

    $('#canvas-draft').dblclick(function(e){
            let mouseX = e.pageX - this.offsetLeft;
            let mouseY = e.pageY - this.offsetTop;
            currentFunction.doubleClick([mouseX,mouseY],e);
        });
    });
    
}
function mobileMode(){
    var hammertime = new Hammer(canvasDraft);
    hammertime.on('drag swipe tap press pan panup pandown doubletap', function(ev) {
        if (event.type === 'doubletap') {
            draw.svgaScaleDown();    
            touch_triggered = true;
        }
        
        if (event.type === 'tap') {  
            setTimeout(function() {
            console.log('timeout: our touch_tiggerd value is '+touch_triggered)
            if (touch_triggered === false) {
                     draw.svgaScaleUp(); 
                }
            touch_triggered = false;
              }, 10);

        }
    //console.log(ev.type);
    });


        hammertime.on('tap',function(ev){
            let mouseX = ev.center.x - canvasDraft.offsetLeft;
            let mouseY = ev.center.y - canvasDraft.offsetTop;
            currentFunction.onMouseDown([mouseX,mouseY],ev);
            //console.log(mouseX+":"+mouseY + ":"+ev.center.x + ","+ev.center.y);
        })
    hammertime.on('panstart',function(ev){
        let mouseX = ev.center.x - canvasDraft.offsetLeft;
        let mouseY = ev.center.y - canvasDraft.offsetTop;
        currentFunction.onMouseDown([mouseX,mouseY],ev);
        dragging = true;
        //console.log(mouseX+":"+mouseY + ":"+ev.center.x + ","+ev.center.y);
    })
    hammertime.on('panmove',function(ev){
        let mouseX = ev.center.x - canvasDraft.offsetLeft;
        let mouseY = ev.center.y - canvasDraft.offsetTop;
        currentFunction.onDragging([mouseX,mouseY],ev);
    // currentFunction.onMouseMove([mouseX,mouseY],ev);
    // console.log("panmove");
    });
    hammertime.on('panend',function(ev){
        let mouseX = ev.center.x - canvasDraft.offsetLeft;
        let mouseY = ev.center.y - canvasDraft.offsetTop;
        currentFunction.onMouseUp([mouseX,mouseY],ev);
    // console.log("panend");

    });
    hammertime.on('doubleclick',function(ev){
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;
        currentFunction.doubleClick([mouseX,mouseY],e);
    });
 

}

$(document).ready(function(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(window).width()<768) {
        mobileMode();
    }
    else if ($(window).width()>767){
        desktopMode();
    }
});