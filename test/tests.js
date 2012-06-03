module('Registration');
test('Registers itself for use', 2, function() {
    ok(Time, 'Time is in the global object');
    ok(Time.format, 'Time.format is in the global object');
});

module('Formating');
test('Formats 0ms Correctly', 5, function() {
    equal(Time.format(0, '%d:%h:%m:%s.%M'), '0:0:0:0.0');
    equal(Time.format(0, '%h:%m:%s.%M'), '0:0:0.0');
    equal(Time.format(0, '%m:%s.%M'), '0:0.0');
    equal(Time.format(0, '%s.%M'), '0.0');
    equal(Time.format(0, '%M'), '0');
});

test('Formats 56ms Correctly', 5, function() {
    equal(Time.format(56, '%d:%h:%m:%s.%M'), '0:0:0:0.56');
    equal(Time.format(56, '%h:%m:%s.%M'), '0:0:0.56');
    equal(Time.format(56, '%m:%s.%M'), '0:0.56');
    equal(Time.format(56, '%s.%M'), '0.56');
    equal(Time.format(56, '%M'), '56');
});

test('Formats 10secs 12ms Correctly', 5, function() {
    var _10s12ms = (10 * 1E3) + (12);
    
    equal(Time.format(_10s12ms, '%d:%h:%m:%s.%M'), '0:0:0:10.12');
    equal(Time.format(_10s12ms, '%h:%m:%s.%M'), '0:0:10.12');
    equal(Time.format(_10s12ms, '%m:%s.%M'), '0:10.12');
    equal(Time.format(_10s12ms, '%s.%M'), '10.12');
    equal(Time.format(_10s12ms, '%M'), '10012');
});

test('Formats 25mins 42secs 612ms Correctly', 5, function() {
    var _25m42s612ms = (25 * 60 * 1E3) + (42 * 1E3) + (612);
    
    equal(Time.format(_25m42s612ms, '%d:%h:%m:%s.%M'), '0:0:25:42.612');
    equal(Time.format(_25m42s612ms, '%h:%m:%s.%M'), '0:25:42.612');
    equal(Time.format(_25m42s612ms, '%m:%s.%M'), '25:42.612');
    equal(Time.format(_25m42s612ms, '%s.%M'), '1542.612');
    equal(Time.format(_25m42s612ms, '%M'), '1542612');
});

test('Formats 23hrs 58mins 2secs 999ms Correctly', 5, function() {
    var _23h58m2s999ms = (23 * 60 * 60 * 1E3) + (58 * 60 * 1E3) + (2 * 1E3) + (999);
    
    equal(Time.format(_23h58m2s999ms, '%d:%h:%m:%s.%M'), '0:23:58:2.999');
    equal(Time.format(_23h58m2s999ms, '%h:%m:%s.%M'), '23:58:2.999');
    equal(Time.format(_23h58m2s999ms, '%m:%s.%M'), '1438:2.999');
    equal(Time.format(_23h58m2s999ms, '%s.%M'), '86282.999');
    equal(Time.format(_23h58m2s999ms, '%M'), '86282999');
});

test('Formats 1day 3hrs 20min 56sec 200ms Correctly', 5, function() {
    var _1d3h20m56s200ms = (1 * 24 * 60 * 60 * 1E3) + (3 * 60 * 60 * 1E3) + (20 * 60 * 1E3) + (56 * 1E3) + (200);
    
    equal(Time.format(_1d3h20m56s200ms, '%d:%h:%m:%s.%M'), '1:3:20:56.200');
    equal(Time.format(_1d3h20m56s200ms, '%h:%m:%s.%M'), '27:20:56.200');
    equal(Time.format(_1d3h20m56s200ms, '%m:%s.%M'), '1640:56.200');
    equal(Time.format(_1d3h20m56s200ms, '%s.%M'), '98456.200');
    equal(Time.format(_1d3h20m56s200ms, '%M'), '98456200');
});

test('Formats 999days 23hrs 59min 59sec 999ms Correctly', 5, function() {
    var _500d23h59m59s999ms = (999 * 24 * 60 * 60 * 1E3) + (23 * 60 * 60 * 1E3) + (59 * 60 * 1E3) + (59 * 1E3) + (999);
    
    equal(Time.format(_500d23h59m59s999ms, '%d:%h:%m:%s.%M'), '999:23:59:59.999');
    equal(Time.format(_500d23h59m59s999ms, '%h:%m:%s.%M'), '23999:59:59.999');
    equal(Time.format(_500d23h59m59s999ms, '%m:%s.%M'), '1439999:59.999');
    equal(Time.format(_500d23h59m59s999ms, '%s.%M'), '86399999.999');
    equal(Time.format(_500d23h59m59s999ms, '%M'), '86399999999');
});