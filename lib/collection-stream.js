var stream = require('stream')
  , Transform = stream.Transform

var CollectionStream = function (count, options) {
  var self = this

  this._collection = []

  if (!(this instanceof CollectionStream))
    return new CollectionStream()

  Transform.call(this, options)
  self.push(this._collection)
}

CollectionStream.prototype = Object.create(
  Transform.prototype, { constructor: { value: CollectionStream }})

CollectionStream.prototype._transform = function (chunk, encoding, cb) {
  // fix lint errors
  encoding = encoding

  this._collection.push(chunk)
  cb()
}