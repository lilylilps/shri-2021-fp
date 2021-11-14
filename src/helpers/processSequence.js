/**
 * @file Домашка по FP ч. 2
 * 
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 * 
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 * 
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import { round } from 'lodash';
import { allPass, andThen, assoc, compose, concat, gt, ifElse, length, lt, match, modulo, otherwise, prop, tap, toString, __ } from 'ramda';
import Api from '../tools/api';

const api = new Api();

const getValue = prop('value');
const getWriteLog = prop('writeLog');
const getHandleSuccess = prop('handleSuccess');
const getHandleError = prop('handleError');
const getResult = prop('result');

const isLessThanTen = gt(10);
const isGreaterThanTwo = lt(2);
const isPositiveNumber = lt(0);
const isFloatNumber = match(/^[0-9]+\.{0,1}[0-9]+$/);

const isValidLength = compose(allPass([isLessThanTen, isGreaterThanTwo]), length);
const isValidInput = compose(allPass([isValidLength, isPositiveNumber, isFloatNumber]), getValue);

const parseInput = compose(round, parseFloat, getValue);
const squareValue = (value) => Math.pow(value, 2);
const getRemainderOfDivisionByThree = (value) => modulo(value, 3);

const getSystemTransferApi = api.get('https://api.tech/numbers/base');
const setParams = assoc('number', __, { from: 10, to: 2 });

const createAnimalUrl = concat('https://animals.tech/');
const getAnimalApi = api.get(__, {});

const getRandomAnimal = compose(getAnimalApi, createAnimalUrl);

const handleValidationError = (input) => getHandleError(input)('ValidationError');
const handlePromiseError = (error) => getHandleError(error);
const processSequence = (input) => {
    
    const writeLog = getWriteLog(input);
    const logInput = compose(writeLog, getValue);
    const getSuccessResult = getHandleSuccess(input);

    const result = compose(
        ifElse(
            isValidInput, 
            compose(
                otherwise(handlePromiseError),
                andThen(getSuccessResult),
                andThen(getResult),
                andThen(getRandomAnimal),
                andThen(toString),
                andThen(tap(writeLog)),
                andThen(getRemainderOfDivisionByThree),
                andThen(tap(writeLog)),
                andThen(squareValue),
                andThen(tap(writeLog)),
                andThen(length),
                andThen(tap(writeLog)),
                andThen(getResult),
                getSystemTransferApi,
                setParams,
                tap(writeLog),
                parseInput,
            ),
            tap(handleValidationError)
        ),
        tap(logInput),
    )
    result(input);
}

export default processSequence;
