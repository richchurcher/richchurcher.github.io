angular

  .module('magic', [])
  .controller('Magician', ['$interval', Magician])
  .directive('magicShow', magicShow)

function Magician ($interval) {
  var vm = this;
  vm.magics = []; 
  vm.audio = new (window.AudioContext || window.webkitAudioContext)();
  oscillator = vm.audio.createOscillator();
  var gainNode = vm.audio.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(vm.audio.destination);
  gainNode.gain.value = 0.4;
  oscillator.frequency.value = 100;
  oscillator.start();

  oscillator.type = 'sine';

  $interval(function() {
    var m = new Magic();
    vm.magics.push(m);
    oscillator.frequency.value = Math.floor(Math.random() * 2) + (m.width * 25);
  }, 50);
}

function magicShow() {
  return {
    templateUrl: 'magic01/magicWand.html',
  }
}

