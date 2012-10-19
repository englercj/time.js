module('Registration');
test('Registers itself for use', 2, function() {
    ok(Time, 'Time is in the global object');
    ok(Time.format, 'Time.format is in the global object');
});