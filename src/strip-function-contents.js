// base regex came from:
// http://stackoverflow.com/questions/14885995/how-to-get-a-functionss-body-as-string
// additional ones were rolled by hand
const stripRegularFunction = /function[^{]+\{([\s\S]*)\}$/;
const stripArrowBracketedFunction = /\=\>[^{]+\{([\s\S]*)\}$/;
const stripArrowFunction = /\=\>([\s\S]*)$/;
const stripInvalidContents = /return|\;|\n/g;

const formatBody = str => str.replace(stripInvalidContents, '').trim();

const format = (str, regex) => {
    const match = str.match(regex);
    if (match && match[1]) {
        return formatBody(match[1]);
    }
};

module.exports = function(fn) {
    const functionString = fn.toString();

    return format(functionString, stripRegularFunction) ||
        format(functionString, stripArrowBracketedFunction) ||
        format(functionString, stripArrowFunction) || '';
};