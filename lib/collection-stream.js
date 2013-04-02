var stream = require('stream')
  , Transform = stream.Transform

var CollectionStream = module.exports = function (count, options) {
  if (!(this instanceof CollectionStream))
    return new CollectionStream()

  Transform.call(this, options)

  this._collection = []
  this._count = count
}

CollectionStream.prototype = Object.create(
  Transform.prototype, { constructor: { value: CollectionStream }})

CollectionStream.prototype._transform = function (chunk, encoding, cb) {
  // fix lint errors
  encoding = encoding

  this._collection.push(chunk)
  if (this._collection.length !== this._count)
    this.push(chunk)
  else {
    this.emit('finish', this.toJSON())
  }
  cb()
}

CollectionStream.prototype.toJSON = function () {
  return this._collection
}