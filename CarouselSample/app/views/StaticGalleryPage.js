// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: CarouselSample
// View: StaticGalleryPage
// ==========================================================================

CarouselSample.StaticGalleryPage = M.PageView.design({
    
    cssClass: 'StaticGalleryPage',

    childViews: 'header content',

    header: M.ToolbarView.design({
        anchorLocation: M.TOP,
        cssClass: 'header',

        childViews: 'logo',

        logo: M.ImageView.design({
            value: 'theme/images/logo_icon.png',
            cssClass: 'logo',
            anchorLocation: M.CENTER,
            events: {
                tap: {
                    action: function() {
                        window.open('http://www.the-m-project.org/');
                    }
                }
            }
        })
    }),

    content: M.ScrollView.design({
        childViews: 'carousel',

        carousel: M.CarouselView.design({
            childViews: 'item1 item2 item3 item4 item5 item6 item7',

            showPaginator: YES,

            direction: M.HORIZONTAL,

            sizeCalculator: M.CAROUSEL_SIZE_SURROUNDING_ELEMENT,

            item1:M.CarouselItemView.design({
                childViews:'img1',
                img1:M.ImageView.design({
                    value:'theme/images/1.jpg',
                    cssClass:'carouselImg'
                })
            }),
            item2:M.CarouselItemView.design({
                childViews:'img2',
                img2:M.ImageView.design({
                    value:'theme/images/2.jpg',
                    cssClass:'carouselImg'
                })
            }),
            item3:M.CarouselItemView.design({
                childViews:'img3',
                img3:M.ImageView.design({
                    value:'theme/images/3.jpg',
                    cssClass:'carouselImg'
                })
            }),
            item4:M.CarouselItemView.design({
                childViews:'img4',
                img4:M.ImageView.design({
                    value:'theme/images/4.jpg',
                    cssClass:'carouselImg'
                })
            }),
            item5:M.CarouselItemView.design({
                childViews:'img5',
                img5:M.ImageView.design({
                    value:'theme/images/5.jpg',
                    cssClass:'carouselImg'
                })
            }),
            item6:M.CarouselItemView.design({
                childViews:'img6',
                img6:M.ImageView.design({
                    value:'theme/images/6.jpg',
                    cssClass:'carouselImg'
                })
            }),
            item7:M.CarouselItemView.design({
                childViews:'img7',
                img7:M.ImageView.design({
                    value:'theme/images/7.jpg',
                    cssClass:'carouselImg'
                })
            })
        })
    })

});

