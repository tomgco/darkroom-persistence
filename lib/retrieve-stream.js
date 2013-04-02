var fs = require('fs')
  , Readable = require('stream').Readable
  , request = require('request')

var Retrieve = module.exports = function (params, options) {
  if (!(this instanceof Retrieve))
    return new Retrieve(params, options)

  this.isFile = options.isFile || false

  var self = this

  Readable.call(this, options)

  this._getReadStreamForItem(params, function(source) {
    self._source = source

    // give it a kick whenever the source is readable
    // read(0) will not consume any bytes
    self._source.on('readable', function() {
      self._read()
    })

    self._source.on('end', function() {
      self.push(null)
    })
  })

}


Retrieve.prototype = Object.create(
  Readable.prototype, { constructor: { value: Retrieve }})

Retrieve.prototype._getReadStreamForItem = function (params, cb) {
  if (this.isFile) {
    console.log('path')
    cb(fs.createReadStream(params.path))
  } else {
    // wrap request in new streams interface
    console.log('url')
    cb(new Readable().wrap(request(params.url)))
  }
}

Retrieve.prototype._read = function() {
  if (this._source) {
    var chunk = this._source.read()
    if (chunk === null)
      this.push('')
    else if (chunk) this.push(chunk)
  }
}
