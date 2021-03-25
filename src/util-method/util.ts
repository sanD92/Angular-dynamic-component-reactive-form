import { Injectable } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})

export class UtilMethodsService {

  // to check if any object is empty
  public static isEmpty(value: any) {
    let isEmpty: boolean = value === null || value === undefined ? true : false;

    if (!isEmpty && value instanceof Array) {
      isEmpty = value.length === 0;
    }
    if (!isEmpty && typeof value === 'string') {
      isEmpty = value.trim().length === 0;
    }
    if (!isEmpty && value instanceof Object && !(value instanceof Date) && !(value instanceof String)) {
      isEmpty = Object.getOwnPropertyNames(value).length === 0;
    }
    return isEmpty;
  }

  // Filter Empty values from object and delete
  public static filterEmptyValueFromObject(object, exceptions?: any) {
    Object.keys(object).forEach(key => {

      // tslint:disable-next-line:triple-equals
      if (object[key] == null || object[key] == undefined || object[key] === '') {
        if (this.isEmpty(exceptions) || exceptions.indexOf(key) < 0) {
          delete object[key];
        }
      }
      if (object[key] != null && typeof object[key] === 'object' && !Array.isArray(object[key])) {
        if (!UtilMethodsService.isEmpty(object[key])) {
          Object.keys(object[key]).forEach(inkey => {
            // tslint:disable-next-line:triple-equals
            if (object[key][inkey] == null || object[key][inkey] == undefined || object[key][inkey] == '') {
              if (this.isEmpty(exceptions) || exceptions.indexOf(inkey) < 0) {
                delete object[key][inkey];
              }
            } else if (typeof object[key] === 'object') {
              this.filterEmptyValueFromObject(object[key], exceptions);
            }
            if (Array.isArray(object[key][inkey])) {
              // for qa qc user only
              if (object[key]['documentVerification'] && object[key]['documentVerification'].length > 0) {
                return;
              }
              Object.keys(object[key][inkey]).forEach(inArraykey => {
                if (object[key][inkey][inArraykey] == null
                  // tslint:disable-next-line:triple-equals
                  || object[key][inkey][inArraykey] == undefined
                  // tslint:disable-next-line:triple-equals
                  || object[key][inkey][inArraykey] == '' || object[key][inkey][inArraykey] == '-') {
                  if (this.isEmpty(exceptions) || exceptions.indexOf(inArraykey) < 0) {
                    delete object[key][inkey][inArraykey];
                  }
                } else if (typeof object[key][inkey][inArraykey] === 'object') {
                  this.filterEmptyValueFromObject(object[key][inkey][inArraykey], exceptions);
                }
              });
            }
          });
        } else {
          if (this.isEmpty(exceptions) || exceptions.indexOf(key) < 0) {
            delete object[key];
          }
        }
      }
    });
    return object;
  }

  // Make a copy of object
  public static copyObject(oldObj: any): any {
    let newObj: any;

    if (oldObj && typeof oldObj === 'object') {
      newObj = Object.prototype.toString.call(oldObj) === '[object Array]' ? [] : {};
      // tslint:disable-next-line:prefer-const
      for (let i in oldObj) {
        if (oldObj.hasOwnProperty(i)) {
          newObj[i] = this.copyObject(oldObj[i]);
        }
      }
    } else {
      newObj = oldObj;
    }

    return newObj;
  }

  // Compare Objects

  public static objectsEqual(obj1: any[], obj2: any[], matchCase?: boolean): boolean {
    if (obj1 && obj2) {
      for (const item in obj1) {
        if (typeof obj1[item] === 'object') {
          if (Object.keys(obj1[item]).length &&
            Object.keys(obj2[item]).length &&
            Object.keys(obj1[item]).length !== Object.keys(obj2[item]).length) {
            return false;
          } else {
            this.objectsEqual(obj1[item], obj2[item]);
          }
        } else if (obj1[item] instanceof Array) {
          this.arraysEqual(obj1[item], obj2[item]);
        } else {
          if ((typeof obj1[item] === 'string' || typeof obj1[item] === 'number') && obj1[item] !== obj2[item]) {
            return false;
          }
        }
      }
      return true;
    }
  }

  public static arraysEqual(item1: any[], item2: any[], matchCase?: boolean): boolean {
    if (item1 && item2) {
      if (item1.length !== item2.length) {
        return false;
      } else {
        // compare items
        for (let i = 0; i < item1.length; i++) {
          if (!this.equals(item1[i], item2[i], { matchCase: matchCase })) {
            return false;
          }
        }
        return true;
      }
    }
    return item1 === item2;
  }

  public static equals(item1: any, item2: any, config?: any): boolean {
    const configuration = config || {};
    if (!this.isEmpty(item1) && !this.isEmpty(item2)) {
      if (typeof item1 === typeof item2) {
        if (typeof item1 === 'string') {
          if (!configuration.matchCase) {
            return item1.trim().toLowerCase() === item2.trim().toLowerCase();
          }
        } else if (item1 instanceof Array) {
          return this.arraysEqual(item1, item2, configuration.matchCase);
        } else if (typeof item1 === 'object') {
          return this.objectsEqual(
            item1, item2
          );
        }
      } else {
        if (!configuration.matchCase) {
          // tslint:disable-next-line:triple-equals
          return item1 == item2;
        }
      }
    } else if (!configuration.matchCase) {
      return this.isEmpty(item1) && this.isEmpty(item2);
    }

    return item1 === item2;
  }

  public static subStringUtil(original_str, sub_afterString): string {
    let return_str = '';
    return_str = original_str.substring(0, original_str.indexOf(sub_afterString));
    if (return_str) {
      return return_str.replace(/,\s*$/, ''); // to remove last comma
    } else {
      return original_str;
    }
  }

  public static serializePhoneNumber(phoneNumber: string): string {
    return phoneNumber ? phoneNumber.replace(/[^\d]/g, '') : phoneNumber;
  }

  public static deserializePhoneNumber(phoneNumber: string): string {
    return phoneNumber ? phoneNumber.replace(/(\d{3})(\d{3})(\d{1})/g, `$1-$2-$3`) : phoneNumber;
  }

  public static formatDateToString(date): string {
    if (date && typeof date === 'object') {
      const formattedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
      return formattedDate.slice(0, 10);
    } else {
      return date;
    }
  }

  public static renameObjectKeys(keysMap, obj) {
    return Object.keys(obj).reduce((acc, key) => {
      const renamedObject = {
        [keysMap[key] || key]: obj[key],
      };
      return {
        ...acc,
        ...renamedObject,
      };
    }, {});
  }

  public static evaluateFn(_arg) {
    return new Function('return ' + _arg)();
  }

}
