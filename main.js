/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4 */
/*global define, brackets */

define(function (require, exports, module) {
    "use strict";

    var COMMAND_NAME = "Run Current File",
        COMMAND_ID   = "bracketscmd.runCurrentDocument",
        COMMAND_KEY  = "F9",
        COMMAND_MENU = "debug-menu";

    var CommandManager  = brackets.getModule("command/CommandManager"),
        Menus           = brackets.getModule("command/Menus"),
        DocumentManager = brackets.getModule("document/DocumentManager"),
        ExtensionUtils  = brackets.getModule("utils/ExtensionUtils"),
        NodeDomain      = brackets.getModule("utils/NodeDomain"),
        domainPath      = ExtensionUtils.getModulePath(module, "domain"),
        nodeDomain      = new NodeDomain("bracketscmd.execute", domainPath);


    function executeCMD(wdir, command) {
        nodeDomain.exec("execute", command, {cwd: wdir});
    }

    function startCMD(wdir, command) {
        var fullCommand = "start cmd /C \"" + command + "& pause\"";
        executeCMD(wdir, fullCommand);
    }

    function runFile(file) {
        var wdir    = file._parentPath,
            path    = file._path;
        startCMD(wdir, path);
    }

    function runCurrentDocument() {
        var currentDocument = DocumentManager.getCurrentDocument();
        runFile(currentDocument.file);
    }

    CommandManager.register(COMMAND_NAME, COMMAND_ID, runCurrentDocument);

    Menus.getMenu(COMMAND_MENU).addMenuDivider();
    Menus.getMenu(COMMAND_MENU).addMenuItem(COMMAND_ID, COMMAND_KEY);
});
