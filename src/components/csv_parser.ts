

export function parse(input: string)
{
    var lines = input.split("\n");
    var ret = {} as any;

    if (lines.length < 2) {
        return {}
    }

    var headers = lines[0].split(",")
    var indexToheader = [];

    for (var i = 0; i < headers.length; i++) {
        indexToheader.push(headers[i]);
        ret[headers[i]] = [];
    }

    var count = 0;
    for (var i = 1; i < lines.length; i++) {
        var split = lines[i].split(',');
        if (split.length != headers.length) {
            continue
        }
        for (var j = 0; j < split.length; j++) {
            ret[indexToheader[j]].push(split[j]);
        }
        count += 1;
    }
    ret['__length__'] = count

    return ret;
}