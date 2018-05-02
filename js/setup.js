'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848]'];
var WIZARDS_NUMBER = 4;
var similarWizards = [];
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var templateSimilarWizard = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarWizardsContainer = document.querySelector('.setup-similar');
var userNameValue = setup.querySelector('.setup-user-name');
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var wizardEyesValue = setup.querySelector('.setup-wizard-appearance input[name="eyes-color"]');
var fireball = setup.querySelector('.setup-fireball-wrap');
var fireballValue = fireball.querySelector('input[name="fireball-color"]');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomColorFromArray = function (colorsArray) {
  return colorsArray[generateRandomNumber(0, colorsArray.length - 1)];
};

var generateWizard = function () {
  return {
    'name': NAMES[generateRandomNumber(0, NAMES.length - 1)] + ' ' + SURNAMES[generateRandomNumber(0, SURNAMES.length - 1)],
    'coatColor': getRandomColorFromArray(COAT_COLORS),
    'eyesColor': getRandomColorFromArray(EYE_COLORS)
  };
};

var createWizardsArray = function () {
  for (var i = 0; i < WIZARDS_NUMBER; i++) {
    similarWizards[i] = generateWizard();
  }
};

var createWizardElement = function (number) {
  var wizardElement = templateSimilarWizard.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = similarWizards[number].name;
  wizardElement.querySelector('.wizard-coat').style.fill = similarWizards[number].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = similarWizards[number].eyesColor;

  return wizardElement;
};

var renderWizards = function () {
  var fragment = document.createDocumentFragment();

  similarWizards.forEach(function (similarWizard, i) {
    fragment.appendChild(createWizardElement(i));
  });

  document.querySelector('.setup-similar-list').appendChild(fragment);
};

var addEventListeners = function () {
  setupClose.addEventListener('click', closeSetupButtonHandler);
  setupClose.addEventListener('keydown', closeSetupEnterPressHandler);
  wizardEyes.addEventListener('click', wizardEyesChangeColorHandler);
  fireball.addEventListener('click', fireballChangeColorHandler);
  userNameValue.addEventListener('invalid', nameInputValidityHandler);
  document.addEventListener('keydown', closeSetupEscPressHandler);
};

var removeEventListeners = function () {
  setupClose.removeEventListener('click', closeSetupButtonHandler);
  setupClose.removeEventListener('keydown', closeSetupEnterPressHandler);
  wizardEyes.removeEventListener('click', wizardEyesChangeColorHandler);
  fireball.removeEventListener('click', fireballChangeColorHandler);
  userNameValue.removeEventListener('invalid', nameInputValidityHandler);
  document.removeEventListener('keydown', closeSetupEscPressHandler);
};

var toogleSetupVisibility = function () {
  setup.classList.toggle('hidden');
};

var openSetup = function () {
  toogleSetupVisibility();
  addEventListeners();
};

var closeSetup = function () {
  toogleSetupVisibility();
  removeEventListeners();
};

var openSetupButtonClickHandler = function () {
  openSetup();
};

var openSetupEnterPressHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetup();
  }
};

var closeSetupButtonHandler = function () {
  closeSetup();
};

var closeSetupEnterPressHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetup();
  }
};

var closeSetupEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSetup();
  }
};

var nameInputValidityHandler = function () {
  if (userNameValue.validity.tooShort) {
    userNameValue.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameValue.validity.tooLong) {
    userNameValue.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameValue.validity.valueMissing) {
    userNameValue.setCustomValidity('Обязательное поле');
  } else {
    userNameValue.setCustomValidity('');
  }
};

var wizardEyesChangeColorHandler = function () {
  var randomColor = getRandomColorFromArray(EYE_COLORS);
  wizardEyes.style.fill = randomColor;
  wizardEyesValue.value = randomColor;
};

var fireballChangeColorHandler = function () {
  var randomColor = getRandomColorFromArray(FIREBALL_COLORS);
  fireball.style.backgroundColor = randomColor;
  fireballValue.value = randomColor;
};

createWizardsArray();
renderWizards();
similarWizardsContainer.classList.remove('hidden');
setupOpen.addEventListener('click', openSetupButtonClickHandler);
setupOpen.addEventListener('keydown', openSetupEnterPressHandler);
