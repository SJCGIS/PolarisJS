function startIntro() {
  var intro = introJs()
  intro.setOptions({
    keyboardNavigation: false,
    exitOnOverlayClick: false,
    showStepNumbers: false,
    steps: [
      {
        element: '#topPane',
        intro: 'Welcome to Polaris. There are multiple ways to interact and personalize the map for your needs. We\'ll review them in this brief tutorial.',
        position: 'bottom'
      },{
        element: '#leftAccordion_splitter',
        intro: 'If the map window is too small, you can click and drag this bar to the left to resize it.',
        position: 'right'
      },{
        element: '#navToolbar',
        intro: 'You can use the tools on the Navigation Toolbar to navigate the map.'
      },{
        element: '#zoomTools',
        intro: 'To zoom in or out of an area select one of these tools and click and drag a box on the map.'
      },{
        element: '#map_zoom_slider',
        intro: 'Alternatively, you can click one of these buttons to zoom in or out. Or you can hover your cursor over the map and use the mouse wheel to zoom in or out.',
        position: 'right'
      },{
        element: '#fullExtent',
        intro: 'Clicking on the Full Extent button zooms the map to its default position.'
      }, {
        element: '#extentTools',
        intro: 'Clicking on the Previous Extent and Next Extent buttons will zoom the map to the previous or next extent. If there is no previous or next extent the button does nothing.'
      }, {
        element: '#pan',
        intro: 'To pan around the map, select the Pan tool and click and drag the map around.'
      },{
        element: '#identify',
        intro: 'To get more information on a layer on the map, select the Identify tool and click on a location on the map. You may need to zoom in or turn on a layer in Map Contents to get a layer to appear first.'
      },{
        element: '#legendPane_wrapper',
        intro: 'Click here to open the Legend. The layers in the Legend may change as you zoom in or out or turn on layers in the Map Contents.',
        position: 'right'
      },{
        element: '#mapContentsPane_wrapper',
        intro: 'Click here to open the Map Contents. Here you can turn on or off different layers. Click on the plus sign next to a layer category to see sublayers. Some layers may not be visible at certain scales, these layers will appear greyed out.',
        position: 'right'
      },{
        element: '#searchPane_wrapper',
        intro: 'Click here to open the Search tool. Here you can search for addresses, parcels, roads or islands. Clicking on a row in the results list will zoom the map to that location.',
        position: 'right'
      },{
        element: '#measurePane_wrapper',
        intro: 'The Measure tools are located here. You can measure an area, a distance or find coordinates of a point.',
        position: 'right'
      },{
        element: '#drawPane_wrapper',
        intro: 'With the Draw tools you can annotate the map. You may select the color, size and type of tool to draw on the map.',
        position: 'right'
      },{
        element: '#printPane_wrapper',
        intro: 'To create a printable map of the map view, use the Print tool. You can customize the print layout and give your map a title.',
        position: 'right'
      },{
        element: '#help',
        intro: 'Thanks for using Polaris. If you have more questions, please click the \'Contact Us\' button in the Help menu.'
      }
    ]
  })
  intro.start()
}
