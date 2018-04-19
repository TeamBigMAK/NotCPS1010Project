

var cordova = require('cordova');
var execProxy = require('cordova/exec/proxy');

/**
 * Execute a cordova command.  It is up to the native side whether this action
 * is synchronous or asynchronous.  The native side can return:
 *      Synchronous: PluginResult object as a JSON string
 *      Asynchronous: Empty string ""
 * If async, the native side will cordova.callbackSuccess or cordova.callbackError,
 * depending upon the result of the action.
 *
 * @param {Function} success    The success callback
 * @param {Function} fail       The fail callback
 * @param {String} service      The name of the service to use
 * @param {String} action       Action to be run in cordova
 * @param {String[]} [args]     Zero or more arguments to pass to the method
 */
module.exports = function (success, fail, service, action, args) {

    var proxy = execProxy.get(service, action);

    args = args || [];

    if (proxy) {

        var callbackId = service + cordova.callbackId++;

        if (typeof success === "function" || typeof fail === "function") {
            cordova.callbacks[callbackId] = {success: success, fail: fail};
        }
        try {



            // callbackOptions param represents additional optional parameters command could pass back, like keepCallback or
            // custom callbackId, for example {callbackId: id, keepCallback: true, status: cordova.callbackStatus.JSON_EXCEPTION }
            var onSuccess = function (result, callbackOptions) {
                callbackOptions = callbackOptions || {};
                var callbackStatus;
                // covering both undefined and null.
                // strict null comparison was causing callbackStatus to be undefined
                // and then no callback was called because of the check in cordova.callbackFromNative
                // see CB-8996 Mobilespec app hang on windows
                if (callbackOptions.status !== undefined && callbackOptions.status !== null) {
                    callbackStatus = callbackOptions.status;
                }
                else {
                    callbackStatus = cordova.callbackStatus.OK;
                }
                cordova.callbackSuccess(callbackOptions.callbackId || callbackId,
                    {
                        status: callbackStatus,
                        message: result,
                        keepCallback: callbackOptions.keepCallback || false
                    });
            };
            var onError = function (err, callbackOptions) {
                callbackOptions = callbackOptions || {};
                var callbackStatus;
                // covering both undefined and null.
                // strict null comparison was causing callbackStatus to be undefined
                // and then no callback was called because of the check in cordova.callbackFromNative
                // note: status can be 0
                if (callbackOptions.status !== undefined && callbackOptions.status !== null) {
                    callbackStatus = callbackOptions.status;
                }
                else {
                    callbackStatus = cordova.callbackStatus.OK;
                }
                cordova.callbackError(callbackOptions.callbackId || callbackId,
                {
                    status: callbackStatus,
                    message: err,
                    keepCallback: callbackOptions.keepCallback || false
                });
            };
            proxy(onSuccess, onError, args);

        } catch (e) {
            console.log("Exception calling native with command :: " + service + " :: " + action  + " ::exception=" + e);
        }
    } else {

        console.log("Error: exec proxy not found for :: " + service + " :: " + action);

        if(typeof fail === "function" ) {
            fail("Missing Command Error");
        }
    }
};
