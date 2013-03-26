// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: MovableLabel
// Controller: MovableLabelController
// ==========================================================================

MovableLabel.MovableLabelController = M.Controller.extend({

    topLabelValue: null,
    bottomLabelValue: null,
    time: null,
    pxPerSec: null,
    offset: null,

    setTopLabelValue: function(id){
        this.set('topLabelValue', M.ViewManager.getViewById(id).value);
    },

    setBottomLabelValue: function(id){
        this.set('bottomLabelValue', M.ViewManager.getViewById(id).value);
    },

    setTime: function(id){
        this.set('time', M.ViewManager.getViewById(id).value);
    },

    setPxPerSec: function(id){
        this.set('pxPerSec', M.ViewManager.getViewById(id).value);
    },

    setOffset: function(id){
        this.set('offset', M.ViewManager.getViewById(id).value);
    }

});
