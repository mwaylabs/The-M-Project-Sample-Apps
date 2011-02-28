m_require('app/views/my_list_item_view.js');

SplitViewSample.ContentPage2 = M.View.design({

    childViews: 'label img',

    label: M.LabelView.design({

        value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est.'

    }),

    img: M.ImageView.design({

        value: 'theme/images/messi.jpg',

        cssClass: 'messi'

    })

});