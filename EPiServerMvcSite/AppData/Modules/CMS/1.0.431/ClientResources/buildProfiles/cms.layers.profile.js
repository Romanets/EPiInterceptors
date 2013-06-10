/*
Package and layer configuration for CMS client side resources.
*/

var profile = {
    packages: [
        {
            name: "epi/cms",
            location: "../epi/cms"
        }
    ],

    layers: {
        /* We have to build the layer result to a different file, otherwise the layerfile seems broken and individual request for each files are made */
        "epi/cms/widgets": {
            include: ["epi/cms/layers/cms-widgets"],
            exclude: ["dojo", "dijit/dijit", "epi/epi", "epi/layers/epi-widgets"]
        }
    }
};