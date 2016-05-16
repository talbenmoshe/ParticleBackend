/**
 * Created by talbm on 15/05/2016.
 */
var wix = require('wix');

var wixQueryParams = ["compId", "endpointType", "locale", "origCompId", "viewMode", "width"];

module.exports = function (additionalQueryParams, appSecretKey) {
    wix.secret(appSecretKey);

    var mergedParams = wixQueryParams.concat([]);

    if(additionalQueryParams && Array.isArray(additionalQueryParams))
    {
        mergedParams = mergedParams.concat(additionalQueryParams);
    }

    return function WixParser(req, res, next) {
        var query = req.query;
        if (query && query.instance) {
            req.wix = wix.parse(query.instance);

            if (req.wix) {
                mergedParams.forEach(function (attribute) {
                    req.wix[attribute] = query[attribute];
                });
            }

            console.log("=== Wix parse ====");
            console.dir(req.wix);
        }
        next();
    }
}