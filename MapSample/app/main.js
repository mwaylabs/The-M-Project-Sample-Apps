// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.7-1
//
// Project: MapSample 
// ==========================================================================

var MapSample  = MapSample || {};

MapSample.app = M.Application.design({

    entryPage: 'page',

    page: M.PageView.design({

        onLoad: {

            target: MapSample.MapController,

            action: 'init'

        },

        childViews: 'header content',

        header: M.ToolbarView.design({

            value: 'Map Sample',

            anchorLocation: M.TOP

        }),

        content: M.ScrollView.design({

            childViews: 'map grid textfield searchBtn spacer',

            map: M.MapView.design({

                cssClass: 'map',

                isInset: YES,

                showMapTypeControl: YES,

                showStreetViewControl: NO,

                showNavigationControl: YES,

                mapType: M.MAP_ROADMAP,

                zoomLevel: 10,

                isDraggable: YES,

                contentBinding: 'MapSample.MapController.markers',

                target: MapSample.MapController,

                action: 'markerClicked'

            }),

            grid: M.GridView.design({

                childViews: 'updateBtn applyDBBtn',

                layout: M.TWO_COLUMNS,

                updateBtn: M.ButtonView.design({

                    value: 'Find Me',

                    target: MapSample.MapController,

                    action: 'findMe'

                }),

                applyDBBtn: M.ButtonView.design({

                    value: 'Data Binding',

                    target: MapSample.MapController,

                    action: 'applyDB'

                })

            }),

            textfield: M.TextFieldView.design({

                isGrouped: NO,

                cssClass: 'textField',

                contentBinding: 'MapSample.MapController.textFieldValue'

            }),

            searchBtn: M.ButtonView.design({

                value: 'Show Address on Map',

                target: MapSample.MapController,

                action: 'lookUp'

            }),

            spacer: M.LabelView.design({

                value: '&#160;'

            })

        })

    })

});