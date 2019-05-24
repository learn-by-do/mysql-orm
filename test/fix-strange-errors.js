// ERROR MSG: Encoding not recognized: 'cesu8' (searched as: 'cesu8')
//
// https://stackoverflow.com/questions/46227783/encoding-not-recognized-in-jest-js

require('iconv-lite').encodingExists('foo')
