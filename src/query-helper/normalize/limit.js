exports.normalizeLimit = function (offset = 1, count) {
  return count ? [offset, count] : [offset]
}
