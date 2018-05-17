

function findkey(obj, value) {
    var key = null;
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (obj[prop] === value) {
                key = prop;
            }
        }
    }
    return key;
}

let votemap = {
      congress : 1,
      bjp : 3,
      jds : 2
    }
let max = Math.max(1,2,3);
let key = findkey(votemap,max);
console.log(key);