var stream = require('stream')
  , Transform = stream.Transform
  , fs = require('fs')

var StoreStream = module.exports = function (output, options) {
  var self = this
  this._output = null

  if (!(this instanceof StoreStream))
    return new StoreStream(output, options)


  Transform.call(this, options)

  if (typeof output === 'string') {
    this._output = fs.createWriteStream(output)
  }

  console.log('StoreStream')

  this.pipe(this._output)

}

StoreStream.prototype = Object.create(
  Transform.prototype, { constructor: { value: StoreStream }})

StoreStream.prototype._transform = function (chunk, encoding, cb) {
  if (this._output === null) {
    cb(new Error('Output is not defined'))
  } else {
    this.push(chunk)
    cb()
  }
}