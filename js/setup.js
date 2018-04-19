'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_NUMBER = 4;
var similarWizards = [];
var setupElement = document.querySelector('.setup');
var templateSimilarWizard = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarWizardsContainer = document.querySelector('.setup-similar');

var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var generateWizard = function () {
  return {
    'name': NAMES[generateRandomNumber(0, NAMES.length - 1)] + ' ' + SURNAMES[generateRandomNumber(0, SURNAMES.length - 1)],
    'coatColor': COAT_COLORS[generateRandomNumber(0, COAT_COLORS.length - 1)],
    'eyesColor': EYE_COLORS[generateRandomNumber(0, EYE_COLORS.length - 1)]
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

