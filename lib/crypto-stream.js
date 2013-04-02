var stream = require('stream')
  , Transform = stream.Transform
  , crypto = require('crypto')

var CryptoStream = module.exports = function (count, options) {
  if (!(this instanceof CryptoStream))
    return new CryptoStream()

  Transform.call(this, options)
}

CryptoStream.prototype = Object.create(
  Transform.prototype, { constructor: { value: CryptoStream }})

CryptoStream.prototype._transform = function (chunk, encoding, cb) {
  // fix lint errors
  encoding = encoding
  cb()
}