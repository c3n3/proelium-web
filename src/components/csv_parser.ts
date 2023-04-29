
function replaceAll(string: string, search: string, replace: string)
{
    return string.split(search).join(replace);
}

function clean(input: any)
{
    console.log(String(input))
    return replaceAll(String(input), '\n', '{~}')
}

function unclean(input: any)
{
    return replaceAll(String(input), '{~}', '\n')
}

export function parse(input: string)
{
    var lines = input.split("\n");
    var ret = [] as any;

    if (lines.length < 2) {
        return []
    }

    var headers = lines[0].split('|')
    var indexToheader = [];

    for (var i = 0; i < headers.length; i++) {
        indexToheader.push(headers[i]);
    }

    var count = 0;
    for (var i = 1; i < lines.length; i++) {
        var split = lines[i].split('|');
        if (split.length != headers.length) {
            continue
        }
        var entry = {} as any;
        for (var j = 0; j < split.length; j++) {
            console.log(indexToheader[j]);
            entry[indexToheader[j]] = unclean(split[j]);
        }
        console.log(entry);
        ret.push(entry);
        count += 1;
    }
    console.log(ret);
    return ret;
}

export function toString(input: any)
{
    var headers = Object.keys(input[0]);
    var ret = headers.join("|") + "\n";
    console.log("LENGTH", input.length)
    for (var i =0; i < input.length; i++) {
        var entry = input[i];
        for (var j = 0; j < headers.length; j++) 
        {
            var header = headers[j];
            ret += clean(entry[header]);
            console.log(entry);
            console.log(ret);
            if (j < headers.length - 1) {
                ret += "|";
            }
        }
        console.log("I", i)
        ret += "\n";
    }
    return ret;
}
