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
    oscillator.connect(vm.gainNode);

    // Change here for waveform. Options:
    // sine, square, saw, triangle
    oscillator.type = 'sawtooth';
    oscillator.start();
    return oscillator;
  }

  vm.audio = contextInit();
  vm.gainNode = gainInit();
  vm.oscillator = oscillatorInit();
}

function magicShow($interval, $timeout) {
  return {
    templateUrl: 'magic02/magicWand.html',
    link: function (scope) {
      $interval(function() {
        var m = new Magic();
        scope.vm.magics.push(m);
        scope.vm.oscillator.frequency.value = m.Hz;

        // Change here for more volume (up to 1)
        scope.vm.gainNode.gain.value = 0.3;

        $timeout(function() {
          scope.vm.gainNode.gain.value = 0;
        }, m.milliseconds);
      }, 100);
    }
  }
}

