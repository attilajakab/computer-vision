const cv = require('opencv4nodejs');

const drawRect = (frame, rectProperties, rectColor = new cv.Vec(0, 255, 0), rectThickness = 2) => {
  frame.drawRectangle(
    new cv.Point2(rectProperties.x, rectProperties.y),
    new cv.Point2(rectProperties.x + rectProperties.width, rectProperties.y + rectProperties.height),
    rectColor,
    rectThickness
  );
};

const convertToRGBA = frame => frame.channels === 1 
                              ? frame.cvtColor(cv.COLOR_GRAY2RGBA) 
                              : frame.cvtColor(cv.COLOR_BGR2RGBA);

exports.drawRect = drawRect;
exports.convertToRGBA = convertToRGBA;