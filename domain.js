/*global exports, require */

(function () {
    "use strict";

    exports.init = function (DomainManager) {
        DomainManager.registerCommand(
            "bracketscmd.execute",
            "execute",
            require("child_process").exec,
            true,
            "Execute CMD"
        );
    };
}());
