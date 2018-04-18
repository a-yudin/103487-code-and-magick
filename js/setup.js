'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var RGB_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_NUMBER = 4;
var WIZARD_NAMES_NUMBER = 8;
var WIZARD_SURNAMES_NUMBER = 8;
var WIZARD_COAT_COLORS = 6;
var WIZARD_EYE_COLORS = 5;
var similarWizards = [];
var setupElement = document.querySelector('.setup');
var templateSimilarWizard = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarWizardsContainer = document.querySelector('.setup-similar');

var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var generateWizard = function () {
  return {
    'name': NAMES[generateRandomNumber(0, WIZARD_NAMES_NUMBER)] + ' ' + SURNAMES[generateRandomNumber(0, WIZARD_SURNAMES_NUMBER)],
    'coatColor': RGB_COLORS[generateRandomNumber(0, WIZARD_COAT_COLORS)],
    'eyesColor': COLORS[generateRandomNumber(0, WIZARD_EYE_COLORS)]
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

setupElement.classList.remove('hidden');
createWizardsArray();
renderWizards();
similarWizardsContainer.classList.remove('hidden');

