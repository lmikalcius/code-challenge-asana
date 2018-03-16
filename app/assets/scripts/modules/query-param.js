function getParameterByName(key) {
    var url = window.location.href;
    // added '#' character for redirect url
    var match = url.match('[&#?]' + key + '=([^&]+)');
    return match ? match[1] : null;
}

export default getParameterByName;

// query string: ?foo=lorem&bar=&baz
// var foo = getParameterByName('foo');
// returns "lorem"