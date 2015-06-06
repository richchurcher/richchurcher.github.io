angular

  .module('magic', [])
  .controller('Magician', Magician)
  .directive('magicShow', ['$interval', '$timeout', magicShow])

function Magician () {
  var vm = this;
  vm.magics = []; 

  function contextInit () {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    return new AudioContext();
  }

  function gainInit () {
    gainNode = vm.audio.createGain();
    gainNode.connect(vm.audio.destination);
    gainNode.gain.value = 0;
    return gainNode;
  }

  function oscillatorInit () {
    oscillator = vm.audio.createOscillator();
    oscillator.connect(vm.biquadFilter);
    //oscillator.connect(vm.gainNode);

    // Change here for waveform. Options:
    // sine, square, saw, triangle
    oscillator.type = 'sine';
    oscillator.start();
    return oscillator;
  }

  // From MSDN docs
  function makeDistortionCurve(amount) {
    var k = typeof amount === 'number' ? amount : 50,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;
    for ( ; i < n_samples; ++i ) {
      x = i * 2 / n_samples - 1;
      curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
    }
    return curve;
  };

  function distortionInit() {
    var distortion = vm.audio.createWaveShaper();
    distortion.connect(vm.gainNode);
    distortion.curve = makeDistortionCurve(4000);
    distortion.oversample = '18x';
    return distortion;
  }

  function biquadInit() {
    var filter = vm.audio.createBiquadFilter();
    filter.type = "lowshelf";
    filter.frequency.value = 1000;
    filter.gain.value = 25;
    filter.connect(vm.distortion);
    return filter;
  }

  vm.audio = contextInit();
  vm.gainNode = gainInit();
  vm.distortion = distortionInit();
  vm.biquadFilter = biquadInit();
  vm.oscillator = oscillatorInit();
}

function magicShow($interval, $timeout) {
  var getRadius = function (x, y) {
    return Math.sqrt(x * x + y * y);
  };
  
  return {
    templateUrl: 'magic03/magicWand.html',
    link: function (scope) {
      var radiusControl = 0;
      var angle = 360;
      var radius = 20;
      var startx = document.documentElement.clientWidth / 2;
      var starty = document.documentElement.clientHeight / 2;
      var firstMagic = new Magic();
      firstMagic.left = startx;
      firstMagic.top = starty;
      scope.vm.magics.push(firstMagic);

      $interval(function() {
        var m = new Magic();
        var lastx = scope.vm.magics[scope.vm.magics.length - 1].left;
        var lasty = scope.vm.magics[scope.vm.magics.length - 1].top;
        lastx -= startx;
        lasty -= starty;
        radius = getRadius(lastx, lasty) || radius;
        radius += 2;
        angle -= 1;
        //if (angle < 0) {
          //angle = 360;
        //}
        m.left = startx + radius * Math.cos(angle);
        m.top = starty + radius * Math.sin(angle);
        scope.vm.magics.push(m);

        scope.vm.oscillator.frequency.value = m.Hz;

        // Change here for more volume (up to 1)
        scope.vm.gainNode.gain.value = 0.3;

        $timeout(function() {
          scope.vm.gainNode.gain.value = 0;
        }, m.milliseconds);

      }, 50);
    }
  }

}

