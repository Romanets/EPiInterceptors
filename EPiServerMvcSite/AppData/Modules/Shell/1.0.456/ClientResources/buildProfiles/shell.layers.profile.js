/*
This is the main layer build profile for the framwork client side files.
*/

// Get the dojo toolkit dir from command line
function constructPath(rootId, relPath) {
    return combinePaths(getCommandLineArg(rootId), relPath);
}

function combinePaths(first, second) {
    return first.replace(/\/*$/, "") + "/" + second;
}

function getCommandLineArg(name) {
    var args = dojo.config.commandLineArgs;

    var argName = "--" + name;

    for (var p in args) {
        if (args[p] == argName) {
            return args[parseInt(p) + 1];
        }
    }

    throw new Error("Missing command line parameter '" + argName + "'");
}

function getDefaultResourceTags(mixins) {
    var tags = {
        test: function (filename, mid) {
            return /\/test\//.test(mid) || /\/demos\//.test(mid) || /\/doc\//.test(mid);
        },
        amd: function (filename, mid) {
            return /\.js$/.test(filename);
        }
    };
    for (var i in mixins) {
        tags[i] = mixins[i];
    }
    return tags;
}

var dojoxModules = new Array(
    "dojox/main",
	"dojox/layout",
    "dojox/gauges",
	"dojox/form",
    "dojox/gesture",
    "dojox/embed",
    "dojox/lang",
    "dojox/gfx",
    "dojox/charting",
    "dojox/data",
    "dojox/sql",
    "dojox/storage",
    "dojox/flash",
    "dojox/rpc",
    "dojox/atom",
    "dojox/json",
    "dojox/fx",
    "dojox/i18n",
    "dojox/color",
    "dojox/math",
	"dojox/mdnd",
	"dojox/form",
	"dojox/grid",
	"dojox/string",
	"dojox/dtl",
    "dojox/html",
    "dojox/xml",
    "dojox/date",
    "dojox/widget",
    "dojox/validate",
    "dojox/encoding",
    "dojox/socket");

var dojoxModulesExclude = new Array("dojox/data/s3");

var profile = {
    basePath: "./",
    cssOptimize: true,
    internStrings: true,
    layerOptimize: "shrinksafe",
    mini: true,
    copyTests: false,
    optimize: "shrinksafe",
    stripConsole: "warn",
    selectorEngine: "acme",
    transforms: { read: [constructPath("sharedRootPath", "DtkBuild/transforms/read.js"), "read"] },
    plugins: {
        "dojo/i18n": constructPath("sharedRootPath", "DtkBuild/plugins/dojo.i18n.js"),
        "epi/i18n": constructPath("sharedRootPath", "DtkBuild/plugins/epi.i18n.js")
    },
    packages: [
        {
            name: "dojo",
            location: constructPath("dtkSourcePath", "dojo/")
        },
        {
            name: "dijit",
            location: constructPath("dtkSourcePath", "dijit/")
        },
        {
            name: "dojox",
            location: constructPath("dtkSourcePath", "dojox/"),
            resourceTags: {
                ignore: function(filename, mid) {
                    if (/\/test\//.test(mid) || /\/demos\//.test(mid) || /\/doc\//.test(mid) || /Tester/.test(mid)) {
                        return true;
                    }

                    for (var i = 0; i < dojoxModulesExclude.length; i++) {
                        if (mid.indexOf(dojoxModulesExclude[i]) == 0) {
                            return true;
                        }
                    }

                    for (var i = 0; i < dojoxModules.length; i++) {
                        if (mid.indexOf(dojoxModules[i]) == 0) {
                            return false;
                        }
                    }

                    return true;
                }
            }
        }, {
            name: "epi",
            location: constructPath("epiRootPath", "epi"),
            // Relese directory points to framework/dtk. 
            // Write epi outside of dtk. 
            destLocation: "../epi/"
        }, {
            name: "dgrid",
            location: constructPath("epiRootPath", "lib/dgrid"),
            // Relese directory points to framework/dtk. 
            // Write outside of dtk.
            destLocation: "../lib/dgrid/",
            resourceTags: getDefaultResourceTags()
        }, {
            name: "put-selector",
            location: constructPath("epiRootPath", "lib/put-selector"),
            // Relese directory points to framework/dtk. 
            // Write outside of dtk.
            destLocation: "../lib/put-selector/",
            resourceTags: getDefaultResourceTags({
                copyOnly: function(filename, mid) {
                    return mid == "put-selector/node-html";
                }
            })
        }, {
            name: "xstyle",
            location: constructPath("epiRootPath", "lib/xstyle"),
            // Relese directory points to framework/dtk. 
            // Write outside of dtk.
            destLocation: "../lib/xstyle/",
            resourceTags: getDefaultResourceTags()
        }
    ],

    layers: {
        "epi/epi": {
            // Minimal requirements for bootstrapping our application. 
            // Shouldn't include any ui widgets.
            include: ["epi/epi"],
            exclude: ["dojo"]
        },
        "epi/patches": {
            include: ["epi/patch/patches"],
            exclude: ["dojo"]
        },
        /* We have to build the layer result to a different file, otherwise the layerfile seems broken and individual request for each files are made */
        "epi/shell/widgets": {
            // Everything from shell not already included in the bootstrapper layer.
            include: ["epi/layers/epi-widgets"],
            exclude: ["dojo", "epi/epi", "epi/patches"]
        },
        /* We have to build the layer result to a different file, otherwise the layerfile seems broken and individual request for each files are made */
        "epi/visitorgroup-widgets": {
            include: ["epi/layers/visitorgroup-widgets"],
            exclude: ["dojo"]
        },
        "epi/packaging/packaging": {
            // The packaging shouldn't really go here, but since layers aren't merged
            // this is the ugly work around
            include: ["epi/packaging/packaging"],
            exclude: ["dojo", "epi/epi", "epi/shell/widgets", "epi/patches"]
        }
    }
};