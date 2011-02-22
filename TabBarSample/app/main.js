var TabBarSample = TabBarSample || {};

TabBarSample.app = M.Application.design({

    entryPage: 'page1',

    page1: TabBarSample.FirstPageView,

    page2: TabBarSample.SecondPageView,

    page3: TabBarSample.ThirdPageView

});