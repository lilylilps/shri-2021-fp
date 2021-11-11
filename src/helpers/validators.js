/**
 * @file Домашка по FP ч. 1
 * 
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
 import { equals, prop, compose, allPass, anyPass, values, filter, map, all, not, gt } from "ramda";

const isRed = equals('red');
const isGreen = equals('green');
const isOrange = equals('orange');
const isBlue = equals('blue');
const isWhite = equals('white');

const getStar = prop('star');
const getSquare = prop('square');
const getTriangle = prop('triangle');
const getCircle = prop('circle');
const getLength = prop('length');

const isRedStar = compose(isRed, getStar);
const isWhiteStar = compose(isWhite, getStar);
const isGreenSquare = compose(isGreen, getSquare);
const isWhiteTriangle = compose(isWhite, getTriangle);
const isWhiteCircle = compose(isWhite, getCircle);
const isBlueCircle = compose(isBlue, getCircle);
const isOrangeSquare = compose(isOrange, getSquare);
const isGreenTriange = compose(isGreen, getTriangle);
const isNotWhiteTriangle = compose(not, isWhite, getTriangle);
const isNotWhiteSquare = compose(not, isWhite, getSquare);

const countRed = compose(getLength, filter(isRed), values);
const countGreen = compose(getLength, filter(isGreen), values);
const countOrange = compose(getLength, filter(isOrange), values);
const countBlue = compose(getLength, filter(isBlue), values);

const isGreaterThanOne = (number) => gt(number, 1);
const isGreaterThanTwo = (number) => gt(number, 2);
const equalsTwo = equals(2);
const equalsOne = equals(1);
const areTriangleAndSquareEqual = (figures) => equals(getTriangle(figures), getSquare(figures));
const areBlueAndRedEqual = (figures) => equals(countRed(figures), countBlue(figures));
const twoGreenFigures = compose(equalsTwo, countGreen);
const oneRedFigure = compose(equalsOne, countRed);
const allMatches = all(figure => figure);

const minThreeRed = compose(isGreaterThanTwo, countRed);
const minThreeBlue = compose(isGreaterThanTwo, countBlue);
const minThreeOrange = compose(isGreaterThanTwo, countOrange);
const minThreeGreen = compose(isGreaterThanTwo, countGreen);

const minThreeSame = anyPass([minThreeRed, minThreeBlue, minThreeOrange, minThreeGreen]);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([isRedStar, isGreenSquare, isWhiteTriangle, isWhiteCircle]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(isGreaterThanOne, countGreen);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = areBlueAndRedEqual;

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = allPass([isBlueCircle, isRedStar, isOrangeSquare]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = minThreeSame;

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = allPass([twoGreenFigures, isGreenTriange, oneRedFigure]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(allMatches, map(isOrange), values);

// 8. Не красная и не белая звезда.
export const validateFieldN8 = compose(not, anyPass([isRedStar, isWhiteStar]));

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(allMatches, map(isGreen), values);

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = allPass([isNotWhiteSquare, isNotWhiteTriangle, areTriangleAndSquareEqual]);
