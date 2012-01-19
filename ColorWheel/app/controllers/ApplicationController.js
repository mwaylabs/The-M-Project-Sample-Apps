// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: ColorWheel
// Controller: ApplicationController
// ==========================================================================

ColorWheel.ApplicationController = M.Controller.extend({

    wheelCanvas: null,

    wheelContext: null,

    wheelQuality: 1.2,

    wheelRadius: null,

    wheelHues: null,

    wheelRectSize: 0,

    wheelCOUNTER: 0,

    wheelContainer: null,

    boxCanvas: null,

    boxSize: 0,

    rotateX: 405,

    rotateY: 405,

    rotateZ: 0,

    hsvToRgb: function(h, s, v) {
        var r, g, b;
        var i;
        var f, p, q, t;

        if(s == 0) {
            r = g = b = v;
            return [255, 255, 255];
        }

        i = Math.floor(h);
        f = h - i; // factorial part of h
        p = v * (1 - s);
        q = v * (1 - s * f);
        t = v * (1 - s * (1 - f));

        switch (i) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;

            case 1:
                r = q;
                g = v;
                b = p;
                break;

            case 2:
                r = p;
                g = v;
                b = t;
                break;

            case 3:
                r = p;
                g = q;
                b = v;
                break;

            case 4:
                r = t;
                g = p;
                b = v;
                break;

            default: // case 5:
                r = v;
                g = p;
                b = q;
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    },

    drawOneAngle: function(counter) {
        if(counter < this.wheelHues.length) {

            M.LoaderView.changeTitle('Initializing ColorWheel: ' + (Math.round(counter / this.wheelHues.length * 100)) + '%');

            var hue_ = this.wheelHues[counter].hue;
            var cosinus = this.wheelHues[counter].cosinus;
            var sinus = this.wheelHues[counter].sinus;

            for(var saturation = 0; saturation < 100; saturation+=this.wheelQuality) {

                var x = Math.round(cosinus * saturation * this.wheelRadius / 100 + this.wheelRadius) + 1;
                var y = Math.round(sinus * saturation * this.wheelRadius / 100 + this.wheelRadius) + 1;

                var rgb = this.hsvToRgb(hue_, saturation / 100, 1);

    //            if(saturation >= 70) {
    //                var a = (1 - (((saturation - 70) / 10) / 2)) + offset;
    //                context.fillStyle = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ", " + a + ")";
    //            } else {
                    this.wheelContext.fillStyle = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
    //            }

    //            context.fillRect(x, y, 1, 1);
                this.wheelContext.fillRect(x - 1, y - 1, this.wheelRectSize, this.wheelRectSize);

                for(var i = x; i <= x + 1; i++) {
                    for(var j = y; j <= y + 1; j++) {
//                        alert(x + this.wheelOffsetX + ' / ' + (y + this.wheelOffsetY));
                        this.wheelColors[x + this.wheelOffsetX][y + this.wheelOffsetY] = rgb;
                    }
                }

            }

            var that = this;
            window.setTimeout(function() {
                that.drawOneAngle(++that.wheelCOUNTER)
            }, 1);
        } else {
            $('#' + this.wheelCanvas.id).fadeIn(1000);

            var that = this;
            var colorPickingWithMouseEnabled = NO;
            $('#' + that.wheelCanvas.id).bind('mousedown', function(evt) {
                colorPickingWithMouseEnabled = YES;
            });

            $('#' + that.wheelCanvas.id).bind('mouseup', function(evt) {
                colorPickingWithMouseEnabled = NO;
            });

            $('#' + that.wheelCanvas.id).bind('touchmove mousemove', function(evt) {

                if(evt.type === 'touchmove') {
                    evt = evt.originalEvent;
                    evt = evt.touches[0];
                } else {
                    if(!colorPickingWithMouseEnabled) {
                        return;
                    }
                }

//                alert('BEFORE: ' + evt.clientX + ' / ' + evt.clientY);

                var x = JSON.parse(JSON.stringify(evt.clientX));
                var y = JSON.parse(JSON.stringify(evt.clientY));

                if(that.wheelContainer.css('float') === 'none') {
                    y = y - Number(that.wheelContainer.position().top);
//                    alert('MINUS: ' + that.wheelContainer.position().top);
                } else {
                    x = x - Number(that.wheelContainer.position().left);
                }

//                alert('AFTER: ' + x + ' / ' + y);

                if(that.wheelColors[x] && that.wheelColors[x][y]) {
//                    $('#' + that.boxCanvas.id).parent().css('background-color', 'rgb(' + that.wheelColors[x][y][0] + ', ' + that.wheelColors[x][y][1] + ', ' + that.wheelColors[x][y][2] + ')');
                    $('#' + that.boxCanvas.id + ' .cube .active').css('background-color', 'rgb(' + that.wheelColors[x][y][0] + ', ' + that.wheelColors[x][y][1] + ', ' + that.wheelColors[x][y][2] + ')');
                }
            });

            M.LoaderView.changeTitle('Initializing Cube');

            this.initCube();
        }
    },

    init: function() {

        /* set heights */
        $('#' + M.ViewManager.getView('page1', 'grid').id).css('height', $(window).height());


        /* BOX SETUP */
        this.boxCanvas = M.ViewManager.getView('page1', 'box');

        var containerWidth = $('#' + M.ViewManager.getView('page1', 'wheel').id).parent().width();
        var containerHeight = $('#' + M.ViewManager.getView('page1', 'wheel').id).parent().height();
//        console.log('containerWidth: ' + containerWidth);
//        console.log('containerHeight: ' + containerHeight);
        this.wheelRadius = Math.round((containerHeight > containerWidth ? (0.9 * containerWidth) : (0.9 * containerHeight)) / 2);
//        console.log('wheelRadius: ' + this.wheelRadius);
        this.wheelCanvas = M.ViewManager.getView('page1', 'wheel');
        $('#' + this.wheelCanvas.id).hide();
        this.wheelContext = this.wheelCanvas.getContext('2d');
        this.wheelRectSize = Math.round(this.wheelRadius / 100 * 2);

        this.wheelCanvas.setWidth(2 * this.wheelRadius + this.wheelRectSize);
        this.wheelCanvas.setHeight(2 * this.wheelRadius + this.wheelRectSize);
//        console.log('wheelCanvasWidth: ' + this.wheelCanvas.getWidth());
//        console.log('wheelCanvasHeight: ' + this.wheelCanvas.getHeight());

        this.wheelOffsetX = Math.round((containerWidth - this.wheelCanvas.getWidth()) / 2);
        this.wheelOffsetY = Math.round((containerHeight - this.wheelCanvas.getHeight()) / 2);

        this.wheelContainer = $('#' + this.wheelCanvas.id).parent();

        $('#' + this.wheelCanvas.id).css('margin-left', this.wheelOffsetX);
        $('#' + this.wheelCanvas.id).css('margin-top', this.wheelOffsetY);

        this.wheelColors = [];
        for(var i = 0; i < this.wheelCanvas.getWidth() + this.wheelOffsetX; i++) {
            this.wheelColors[i] = [];
        }

        this.wheelHues = [];
        for(var hue = 0; hue < 360; hue+=(this.wheelQuality / 2)) {

            var cosinus = Math.cos(hue * Math.PI / 180);
            var sinus = Math.sin(hue * Math.PI / 180);

            this.wheelHues.push({
                hue: hue / 60,
                cosinus: cosinus,
                sinus: sinus
            });
        }

        this.wheelCOUNTER = 0;
        M.LoaderView.show('Initializing ColorWheel: 0%');
        this.drawOneAngle(this.wheelCOUNTER);


        document.ontouchmove = function(event){
            event.preventDefault();
        }

    },

    initCube: function() {
//        var context = this.boxCanvas.getContext('2d');
        var containerWidth = $('#' + M.ViewManager.getView('page1', 'box').id).parent().width();
        var containerHeight = $('#' + M.ViewManager.getView('page1', 'box').id).parent().height();

//        this.boxCanvas.setWidth(containerWidth);
//        this.boxCanvas.setHeight(containerHeight);

        this.boxSize = Math.round((containerHeight > containerWidth ? (0.7 * containerWidth) : (0.7 * containerHeight)));

        var offsetX = (containerWidth - this.boxSize) / 2;
        var offsetY = (containerHeight - this.boxSize) / 2;
//        var diceSize = (containerWidth - (2 * offsetX)) / 3 * 2;
//
//        var c1 = [offsetX, containerHeight - offsetY - diceSize];
//        var c2 = [diceSize + offsetX, containerHeight - offsetY - diceSize];
//        var c3 = [diceSize + offsetX, containerHeight - offsetY];
//        var c4 = [offsetX, containerHeight - offsetY];
//        var c5 = [offsetX + (diceSize / 2), offsetY];
//        var c6 = [containerWidth - offsetX, offsetY];
//        var c7 = [containerWidth - offsetX, containerHeight - offsetY - (diceSize / 2)];
//
//        /* draw front polygon */
//        context.fillStyle = '#333333';
//        context.beginPath();
//        context.moveTo(c1[0], c1[1]);
//        context.lineTo(c2[0], c2[1]);
//        context.lineTo(c3[0], c3[1]);
//        context.lineTo(c4[0], c4[1]);
//        context.closePath();
//        context.fill();
//
//        /* draw top polygon */
//        context.fillStyle = '#064a97';
//        context.beginPath();
//        context.moveTo(c1[0], c1[1]);
//        context.lineTo(c2[0], c2[1]);
//        context.lineTo(c6[0], c6[1]);
//        context.lineTo(c5[0], c5[1]);
//        context.closePath();
//        context.fill();
//
//        /* draw right polygon */
//        context.fillStyle = '#970606';
//        context.beginPath();
//        context.moveTo(c2[0], c2[1]);
//        context.lineTo(c6[0], c6[1]);
//        context.lineTo(c7[0], c7[1]);
//        context.lineTo(c3[0], c3[1]);
//        context.closePath();
//        context.fill();

        var diceSize = Math.round(this.boxSize / Math.sqrt(2));
        var box = '<div class="cube target" style="width: ' + diceSize + 'px; height: ' + diceSize + 'px; -webkit-transform: perspective(600px) rotateX(' + this.rotateX + 'deg) rotateY(' + this.rotateY + 'deg) rotateZ(' + this.rotateZ + 'deg); -webkit-transform-style: preserve-3d; ">' +
//        var box = '<div class="cube target" style="width: ' + diceSize + 'px; height: ' + diceSize + 'px;">' +
            '<div class="face f1" style="-webkit-transform: translate3d(0,0,' + diceSize/2 + 'px) rotateY(0deg); width: ' + diceSize + 'px; height: ' + diceSize + 'px;"></div>' +
            '<div class="face f2" style="-webkit-transform: translate3d(0,0,-' + diceSize/2 + 'px) rotateY(180deg); width: ' + diceSize + 'px; height: ' + diceSize + 'px;"></div>' +
            '<div class="face f3" style="-webkit-transform: translate3d(-' + diceSize/2 + 'px,0,0) rotateY(-90deg); width: ' + diceSize + 'px; height: ' + diceSize + 'px;"></div>' +
            '<div class="face f4" style="-webkit-transform: translate3d(' + diceSize/2 + 'px,0,0) rotateY(90deg); width: ' + diceSize + 'px; height: ' + diceSize + 'px;"></div>' +
            '<div class="face f5" style="-webkit-transform: translate3d(0,-' + diceSize/2 + 'px,0) rotateX(90deg); width: ' + diceSize + 'px; height: ' + diceSize + 'px;"></div>' +
            '<div class="face f6" style="-webkit-transform: translate3d(0,' + diceSize/2 + 'px,0) rotateX(-90deg); width: ' + diceSize + 'px; height: ' + diceSize + 'px;"></div>' +
            '</div>';


        $('#' + M.ViewManager.getView('page1', 'box').id).append(box);

//        $('#' + M.ViewManager.getView('page1', 'box').id).css('margin-left', (containerWidth - this.boxSize) / 2);
//        $('#' + M.ViewManager.getView('page1', 'box').id).css('margin-top', (containerHeight - this.boxSize) / 2);

//        console.log('containerHeight: ' + containerHeight);
//        console.log('this.boxSize: ' + this.boxSize);
//        console.log((containerHeight/2)-(this.boxSize/4));

//        $('#' + M.ViewManager.getView('page1', 'box').id).css('padding-left', (containerWidth - this.boxSize) / 2);
        $('#' + M.ViewManager.getView('page1', 'box').id).css('padding-top', (containerHeight/2 - diceSize/2));

        $('.cube .face').bind('tap', function(evt) {
            $('.cube .face').removeClass('active');
            $(this).addClass('active');
            evt.preventDefault();
            evt.stopPropagation();
        });


        M.LoaderView.hide(YES);

        var lastPos = [];
        var that = this;
        var factor = (containerWidth / 360) * 20;
        var colorPickingWithMouseEnabled = NO;
        $('#' + M.ViewManager.getView('page1', 'box').id).bind('touchstart mousedown', function(evt) {

            if(evt.type === 'mousedown') {
                colorPickingWithMouseEnabled = YES;
            } else {
                evt = evt.originalEvent;
                evt = evt.touches[0];
            }

            var x = Number(evt.clientX);
            var y = Number(evt.clientY);
            lastPos = [x, y];
        });

        $('#' + M.ViewManager.getView('page1', 'box').id).bind('touchmove mousemove', function(evt) {

            if(evt.type === 'mousemove' && !colorPickingWithMouseEnabled) {
                return;
            }

            if(evt.type === 'touchmove') {
                evt = evt.originalEvent;
                evt = evt.touches[0];
            }

            var x = Number(evt.clientX);
            var y = Number(evt.clientY);

            var changeX = lastPos[0] - x;
            var changeY = lastPos[1] - y;

            changeX = changeX / factor;
            changeY = changeY / factor;

            //-webkit-transform: perspective(600px) rotateX(405deg) rotateY(405deg) rotateZ(0deg);
            that.rotateX += changeY;
            that.rotateY -= changeX;
            $('.cube').css('-webkit-transform', 'perspective(600px) rotateX(' + that.rotateX + 'deg) rotateY(' + that.rotateY + 'deg) rotateZ(' + that.rotateZ + 'deg)');

            
        });

        $('#' + M.ViewManager.getView('page1', 'box').id).bind('mouseup', function(evt) {
            colorPickingWithMouseEnabled = NO;
        });

        $(document).bind('tap', function() {
            $('.cube .face').removeClass('active');
        });

        $('#' + this.wheelCanvas.id).bind('touchend', function() {
            $('.cube .face').removeClass('active');
        });
    }

});