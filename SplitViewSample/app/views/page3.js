m_require('app/views/my_list_item_view.js');

SplitViewSample.ContentPage3 = M.View.design({

    childViews: 'label',

    label: M.LabelView.design({

        value: 'Page #3'

    })

});