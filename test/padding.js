module('Padded Formatting');
test('Formats 0ms Correctly', 5, function() {
    equal(Time.format(0, '%d{2}:%h:%m{2}:%s.%M{2}'), '00:0:00:0.00');
    equal(Time.format(0, '%h{2}:%m:%s{3}.%M'), '00:0:000.0');
    equal(Time.format(0, '%m{2}:%s{2}.%M{3}'), '00:00.000');
    equal(Time.format(0, '%s{1}.%M{0}'), '0.0');
    equal(Time.format(0, '%M{20}'), '00000000000000000000');
});

test('Formats 56ms Correctly', 5, function() {
    equal(Time.format(56, '%d{1}:%h:%m{2}:%s.%M{3}'), '0:0:00:0.056');
    equal(Time.format(56, '%h{1}:%m:%s{2}.%M'), '0:0:00.56');
    equal(Time.format(56, '%m{1}:%s.%M{2}'), '0:0.56');
    equal(Time.format(56, '%s{3}.%M'), '000.56');
    equal(Time.format(56, '%M{5}'), '00056');
});

test('Formats 10secs 12ms Correctly', 5, function() {
    var _10s12ms = (10 * 1E3) + (12);
    
    equal(Time.format(_10s12ms, '%d{1}:%h:%m{2}:%s.%M{3}'), '0:0:00:10.012');
    equal(Time.format(_10s12ms, '%h{1}:%m:%s{2}.%M'), '0:0:10.12');
    equal(Time.format(_10s12ms, '%m{1}:%s.%M{3}'), '0:10.012');
    equal(Time.format(_10s12ms, '%s{3}.%M'), '010.12');
    equal(Time.format(_10s12ms, '%M{10}'), '0000010012');
});

test('Formats 25mins 42secs 612ms Correctly', 5, function() {
    var _25m42s612ms = (25 * 60 * 1E3) + (42 * 1E3) + (612);
    
    equal(Time.format(_25m42s612ms, '%d{1}:%h:%m{3}:%s.%M{5}'), '0:0:025:42.00612');
    equal(Time.format(_25m42s612ms, '%h{1}:%m:%s{3}.%M'), '0:25:042.612');
    equal(Time.format(_25m42s612ms, '%m{2}:%s{5}.%M{8}'), '25:00042.00000612');
    equal(Time.format(_25m42s612ms, '%s{2}.%M'), '1542.612');
    equal(Time.format(_25m42s612ms, '%M{10}'), '0001542612');
});

test('Formats 23hrs 58mins 2secs 999ms Correctly', 5, function() {
    var _23h58m2s999ms = (23 * 60 * 60 * 1E3) + (58 * 60 * 1E3) + (2 * 1E3) + (999);
    
    equal(Time.format(_23h58m2s999ms, '%d{2}:%h:%m{1}:%s.%M'), '00:23:58:2.999');
    equal(Time.format(_23h58m2s999ms, '%h{3}:%m:%s.%M{6}'), '023:58:2.000999');
    equal(Time.format(_23h58m2s999ms, '%m{5}:%s.%M'), '01438:2.999');
    equal(Time.format(_23h58m2s999ms, '%s{6}.%M'), '086282.999');
    equal(Time.format(_23h58m2s999ms, '%M{10}'), '0086282999');
});

test('Formats 1day 3hrs 20min 56sec 200ms Correctly', 5, function() {
    var _1d3h20m56s200ms = (1 * 24 * 60 * 60 * 1E3) + (3 * 60 * 60 * 1E3) + (20 * 60 * 1E3) + (56 * 1E3) + (200);
    
    equal(Time.format(_1d3h20m56s200ms, '%d{3}:%h:%m{3}:%s.%M'), '001:3:020:56.200');
    equal(Time.format(_1d3h20m56s200ms, '%h{5}:%m:%s{2}.%M'), '00027:20:56.200');
    equal(Time.format(_1d3h20m56s200ms, '%m{7}:%s.%M{0}'), '0001640:56.200');
    equal(Time.format(_1d3h20m56s200ms, '%s{9}.%M'), '000098456.200');
    equal(Time.format(_1d3h20m56s200ms, '%M{11}'), '00098456200');
});

test('Formats 999days 23hrs 59min 59sec 999ms Correctly', 5, function() {
    var _500d23h59m59s999ms = (999 * 24 * 60 * 60 * 1E3) + (23 * 60 * 60 * 1E3) + (59 * 60 * 1E3) + (59 * 1E3) + (999);
    
    equal(Time.format(_500d23h59m59s999ms, '%d{5}:%h:%m{6}:%s.%M'), '00999:23:000059:59.999');
    equal(Time.format(_500d23h59m59s999ms, '%h{8}:%m:%s{0}.%M'), '00023999:59:59.999');
    equal(Time.format(_500d23h59m59s999ms, '%m{11}:%s.%M{1}'), '00001439999:59.999');
    equal(Time.format(_500d23h59m59s999ms, '%s{14}.%M'), '00000086399999.999');
    equal(Time.format(_500d23h59m59s999ms, '%M{17}'), '00000086399999999');
});