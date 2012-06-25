M.HTMLView = M.View.extend(
/** @scope M.PageView.prototype */ {

    /**
     *
     * Request this URL
     *
     * */
    url : '',

        /**
         * Renders a div and requests the given url. The callback data is written into this div
         * @return {*}
         */
    render: function() {

        this.html += '<div id="' + this.id + '" ' + this.style() + '>';

        var that = this;
        $.ajax({
            url: this.url
        }).done(function(data) {
            $('#' + that.id).html(data);
        });

        this.html += '</div>';


        return this.html;
    },

    style: function() {
        var html = ' class="';
        if(this.cssClass){
            html += this.cssClass + ' ';
        }
        html += 'htmlview "';
        return html;
    }
    
});