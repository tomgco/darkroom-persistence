var stream = require('stream')
  , Transform = stream.Transform
  , fs = require('fs')
  , crypto = require('crypto')

var StoreStream = function (filePath, options) {
  var self = this

  if (!(this instanceof StoreStream))
    return new StoreStream()

  Transform.call(this, options)

  if (typeof file === 'string')
    this._output = fs.createWriteStream(filePath)
  else
    throw new Error('Input must be a file path')

  // this._output.on('end', function () {
  //   self.push(filePath)
  // })
}

StoreStream.prototype = Object.create(
  Transform.prototype, { constructor: { value: StoreStream }})

StoreStream.prototype._transform = function (chunk, encoding, cb) {
  this.push(chunk, encoding)
  this._output.write(chunk, encoding, cb)
}