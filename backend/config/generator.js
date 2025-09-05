export function hashUrl(url) {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    hash = (hash * 31 + url.charCodeAt(i)) % Number.MAX_SAFE_INTEGER;
  }
  return Math.abs(hash);
}

export function to_base_62(deci) {
  var hash_str, s;
  s = "012345689abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  hash_str = "";

  while (deci > 0) {
    var b = parseInt(deci % 62);
    var a = s[b] ? s[b]: "";
    hash_str = hash_str+a;
    deci = parseInt(deci/62);
  }

  return hash_str;
}