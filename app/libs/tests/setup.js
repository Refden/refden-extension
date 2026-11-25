// jsdom's whatwg-url needs TextEncoder/TextDecoder on the global, but jest's
// jsdom environment does not expose Node's implementations. setupFiles runs
// before the test framework (and before the specs require jsdom), so this is
// the place to fill the gap.
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
