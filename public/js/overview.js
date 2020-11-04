/* eslint-disable */

var navigationPanel = document.querySelector('.navigation');
var phoneNavigationList = document.querySelector('.navigation__listPhone');
var navActivatorButton = document.querySelector('.iconNavCheckBox--on');
var navActivatorButtonOff = document.querySelector('.iconNavCheckBox--off');
var picturesLogoText = document.querySelector('.logoPhoneFadeInText');

navActivatorButton.addEventListener('click', function () {
  navigationPanel.style.height = '100vh';
  navActivatorButton.classList.add('displayCheckBox');
  navActivatorButtonOff.classList.remove('displayCheckBox');
  phoneNavigationList.style.display = 'block';
});

navActivatorButtonOff.addEventListener('click', function () {
  navigationPanel.style.height = 'auto';
  navActivatorButton.classList.remove('displayCheckBox');
  navActivatorButtonOff.classList.add('displayCheckBox');
  phoneNavigationList.style.display = 'none';
});

window.addEventListener('load',function(){
  document.querySelector('.loader').style.display = 'none';
})