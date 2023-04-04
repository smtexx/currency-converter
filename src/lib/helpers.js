// Creates deep copy of an object
export function createStateCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Function calculates class name based on config argument
/* --- Argument format ---
  [
    [ class-1],
    [ class-2, true ],
    [ class-3, class-4, false ],
  ]
    => 'class-1 class-2 class-4'
*/

export function setClass(config) {
  try {
    // Check setClass argument type
    if (config.constructor.name !== 'Array') {
      throw new TypeError(
        'Wrong type of argument in setClass function'
      );
    }

    // Calculate className from options
    const newClassName = config.reduce((prev, option, idx) => {
      // Check option type
      if (option.constructor.name !== 'Array') {
        throw new TypeError(
          `Wrong type of option #${idx} in setClass function`
        );
      }

      // Calculate new part of className from current option
      const length = option.length;
      let classNamePart = '';

      switch (length) {
        case 1:
          classNamePart = option[0];
          break;

        case 2:
          classNamePart = option[1] ? option[0] || '' : '';
          break;

        case 3:
          classNamePart = option[2] ? option[0] : option[1];
          break;
        default:
          throw new TypeError(
            `Unknown option #${idx} length - ${length} in setClass function`
          );
      }

      // If classNamePart is empty, return prev value
      if (!classNamePart) return prev;

      // Return calculated part of newClassName
      return prev ? `${prev} ${classNamePart}` : classNamePart;
    }, null);

    // Return final className
    return newClassName;
  } catch (error) {
    console.error(error);
    return '!!!-wrongClassName';
  }
}

// Extracts float number from string
// returns {value, valid}, is valid = false, argument was not valid
export function extractNumber(str) {
  if (str === '') {
    return {
      value: 0,
      valid: true,
    };
  }

  if (/^\d+([,.]\d*)?$/.test(str)) {
    const extracted = parseFloat(str.trim().replace(',', '.'));
    if (Number.isFinite(extracted) && !Number.isNaN(extracted)) {
      return {
        value: extracted,
        valid: true,
      };
    }
  }

  return {
    value: 0,
    valid: false,
  };
}

export function roundNumber(value, to) {
  const multiplier = 10 ** to;
  return Math.round(value * multiplier) / multiplier;
}

export function trimNumber(value, to) {
  let [integer, fractional] = value.toString().split('.');
  if (fractional && fractional.length > to) {
    fractional = fractional.slice(0, to);
  }
  return parseFloat(`${integer}.${fractional}`);
}
