;(function($, window, undefined) {
    
    'use strict';
    
    $.MagnifyZoom = function(options, element) {
        
        this.$imageContainer = $(element);
        
        this._init(options);
        
    }
    
    $.MagnifyZoom.defaults = {
        width: 300,
        height: 300,
        cornerRounding: '50%'
    };
    
    $.MagnifyZoom.prototype = {
         _init: function(options) {
             
             var imageObject = new Image();
             imageObject.src = $('.small').attr('src');
             
             this.options = $.extend($.MagnifyZoom.defaults, options);
             
             this.nativeWidth = imageObject.width;
             
             this.nativeHeight = imageObject.height;
             
             this.$glass = $('.large');
             
             this.$smallImage = $('.small');
             
             this._getLocation();
             
         },
        
         _getLocation: function(options) {
             
             var self = this;
             
             $('div.magnify').mousemove(function (e) {
                 
                 var $target = $(this);
                 
                 var magnifyOffset = $target.offset();
                 
                 self.mouseX = e.pageX - magnifyOffset.left;
                 self.mouseY = e.pageY - magnifyOffset.top;
                 
                 self._zoom($target);
                 
             });
             
         },
        
        _zoom: function($target) {
            
            if (this.mouseX < $target.width() && this.mouseY < $target.height() && this.mouseX > 0 && this.mouseY > 0) {
                
                this.$glass.stop(true, true).fadeIn(200);
                
            } else { 
                
                this.$glass.stop().fadeOut(200); 
                
            }
            
            if (this.$glass.is(':visible')) {
                
                var glassWidth = this.$glass.width();
                var glassHeight = this.$glass.height();
                
                var rx = Math.round(this.mouseX / this.$smallImage.width() * this.nativeWidth - (glassWidth/2)) * -1;
                var ry = Math.round(this.mouseY / this.$smallImage.height() * this.nativeHeight - (glassHeight/2)) * -1;
                
                var posX = this.mouseX - (glassWidth/2);
                var posY = this.mouseY - (glassHeight/2);
                
                this.$glass.css({
                    width: this.options.width,
                    height: this.options.height,
                    borderRadius: this.options.cornerRounding,
                    left: posX,
                    top: posY,
                    backgroundPosition: rx + "px " + ry + "px"
                });
                
            }
            
        }
        
    };
    
    $.fn.magnifyZoom = function(options) {
        
        if (typeof options === 'string') {
            
            // Do other things later
            
        } else {  
            
            this.each(function() {
                
                var instance = $.data(this, 'magnifyZoom');
                
                if (instance) {
                    
                    instance._init();
                    
                } else {
                    
                    instance = $.data(this, 'magnifyZoom', new $.MagnifyZoom(options, this));
                                      
                }
                
            });
            
        } 
        
        return this;  
        
    }
    
})(jQuery, window);