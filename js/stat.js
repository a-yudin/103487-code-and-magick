'use strict';

window.renderStatistics = function (ctx, names, times) {
  var TEXT_FONT_SIZE = '16px';
  var TEXT_FONT_FAMILY = 'PT Mono';
  var TEXT_COLOR = 'rgb(0, 0, 0)';
  var TITLE_TEXT_X_COORDINATE = 140;
  var TITLE_TEXT_Y_COORDINATE = 35;
  var TITLE_TEXT_Y_BETWEEN_LINES_OFFSET = 20;
  var titleTextNewLineYCoordinate = TITLE_TEXT_Y_COORDINATE + TITLE_TEXT_Y_BETWEEN_LINES_OFFSET;

  drawCloud(ctx);
  printText(ctx, 'Ура вы победили!', TEXT_COLOR, TEXT_FONT_SIZE, TEXT_FONT_FAMILY, TITLE_TEXT_X_COORDINATE, TITLE_TEXT_Y_COORDINATE);
  printText(ctx, 'Список результатов:', TEXT_COLOR, TEXT_FONT_SIZE, TEXT_FONT_FAMILY, TITLE_TEXT_X_COORDINATE, titleTextNewLineYCoordinate);
  drawBarChart(ctx, names, times, TEXT_COLOR, TEXT_FONT_SIZE, TEXT_FONT_FAMILY);
};

var printText = function (ctx, text, textColor, textFontSize, textFont, initialCoordinateX, initialCoordinateY) {
  var FONT_STYLE_GAP = ' ';
  ctx.fillStyle = textColor;
  ctx.font = textFontSize + FONT_STYLE_GAP + textFont;
  ctx.fillText(text, initialCoordinateX, initialCoordinateY);
};

var drawCloud = function (ctx) {
  var CLOUD_COLOR = 'rgb(255, 255, 255)';
  var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
  var CLOUD_SHADOW_X_OFFSET = 10;
  var CLOUD_SHADOW_Y_OFFSET = 10;
  var DEFAULT_OFFSET = 0;
  var X_INITIAL_COORDINATE = 100;
  var Y_INITIAL_COORDINATE = 10;

  ctx.fillStyle = CLOUD_COLOR;
  ctx.shadowColor = CLOUD_SHADOW_COLOR;
  ctx.shadowOffsetX = CLOUD_SHADOW_X_OFFSET;
  ctx.shadowOffsetY = CLOUD_SHADOW_Y_OFFSET;
  ctx.beginPath();
  ctx.moveTo(X_INITIAL_COORDINATE, Y_INITIAL_COORDINATE);
  ctx.lineTo(110, 30);
  ctx.lineTo(105, 50);
  ctx.lineTo(115, 90);
  ctx.lineTo(100, 150);
  ctx.lineTo(110, 190);
  ctx.lineTo(115, 230);
  ctx.lineTo(110, 250);
  ctx.lineTo(105, 260);
  ctx.lineTo(100, 270);
  ctx.lineTo(220, 265);
  ctx.lineTo(300, 290);
  ctx.lineTo(450, 270);
  ctx.lineTo(500, 280);
  ctx.lineTo(510, 275);
  ctx.lineTo(520, 270);
  ctx.lineTo(525, 260);
  ctx.lineTo(520, 240);
  ctx.lineTo(530, 190);
  ctx.lineTo(515, 110);
  ctx.lineTo(525, 50);
  ctx.lineTo(530, 30);
  ctx.lineTo(520, 10);
  ctx.lineTo(400, 20);
  ctx.lineTo(330, 5);
  ctx.lineTo(240, 15);
  ctx.lineTo(150, 5);
  ctx.lineTo(X_INITIAL_COORDINATE, Y_INITIAL_COORDINATE);
  ctx.fill();
  ctx.shadowOffsetX = DEFAULT_OFFSET;
  ctx.shadowOffsetY = DEFAULT_OFFSET;
};

var drawBarChart = function (ctx, names, times, textColor, textFontSize, textFont) {
  var BAR_CHART_INITIAL_X_COORDINATE = 140;
  var BAR_INITIAL_Y_COORDINATE = 90;
  var TIME_Y_OFFSET = 10;
  var PLAYER_NAME_INITIAL_Y_COORDINATE = 260;
  var COLUMN_WIDTH = 40;
  var COLUMN_MAX_HEIGHT = 150;
  var BETWEEN_COLUMN_GAP = 50;
  var SATURATE_MIN = 1;
  var SATURATE_MAX = 100;
  var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
  var PLAYER_NAME = 'Вы';

  var randomSaturateProperty = 0;
  var integerPlayedTime = 0;
  var coordinateX = 0;
  var barCoordinateY = 0;
  var timeCoordinateY = 0;
  var columnHeight = 0;
  var randomBarColor = '';
  var maximalTime = Math.max.apply(null, times);

  for (var i = 0; i < names.length; i++) {
    if (names[i] === PLAYER_NAME) {
      randomBarColor = PLAYER_COLOR;
    } else {
      randomSaturateProperty = Math.floor(Math.random() * (SATURATE_MAX - SATURATE_MIN)) + SATURATE_MIN;
      randomBarColor = 'hsl(240, ' + randomSaturateProperty + '%, 50%)';
    }
    columnHeight = COLUMN_MAX_HEIGHT / maximalTime * times[i];
    integerPlayedTime = Math.round(times[i]);
    coordinateX = i * (COLUMN_WIDTH + BETWEEN_COLUMN_GAP) + BAR_CHART_INITIAL_X_COORDINATE;
    barCoordinateY = BAR_INITIAL_Y_COORDINATE + (COLUMN_MAX_HEIGHT - columnHeight);
    timeCoordinateY = barCoordinateY - TIME_Y_OFFSET;
    printText(ctx, integerPlayedTime, textColor, textFontSize, textFont, coordinateX, timeCoordinateY);
    printText(ctx, names[i], textColor, textFontSize, textFont, coordinateX, PLAYER_NAME_INITIAL_Y_COORDINATE);
    drawBar(ctx, randomBarColor, coordinateX, barCoordinateY, COLUMN_WIDTH, columnHeight);
  }
};

var drawBar = function (ctx, barColor, initialCoordinateX, initialCoordinateY, barWidth, barHeight) {
  ctx.fillStyle = barColor;
  ctx.fillRect(initialCoordinateX, initialCoordinateY, barWidth, barHeight);
};
