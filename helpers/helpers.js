function if_eq(a, b, opts) {
    if (a == b) return opts.fn(this);
    return opts.inverse(this);
}

function if_bigger(a, b, opts) {
    if(a > b) return opts.fn(this);
    return opts.inverse(this);
}

function if_smoller(a, b, opts) {
    if(a < b) return opts.fn(this);
    return opts.inverse(this);
}

function staticURL(a, opts) {
    // return opts.fn(this.replace('static/', ""))
    return a.replace("static", "");
}

function reverseBool(a, opts) {
    return !a;
}

let context = {
    "if_eq": if_eq,
    "if_bigger": if_bigger,
    "if_smoller": if_smoller,
    "staticURL": staticURL,
    "reverseBool": reverseBool,
}

module.exports.context = context;