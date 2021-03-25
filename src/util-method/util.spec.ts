import { TestBed, async, inject } from '@angular/core/testing';
import { UtilMethodsService } from './util';

describe('Service: Utils Method Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UtilMethodsService],
        });
    });

    it('should create an instance', inject([UtilMethodsService], (service: UtilMethodsService) => {
        expect(service).toBeTruthy();
    }));

    it('should return delete object [key] if filterEmptyValueFromObject get call with null , undefined ,empty key',
        inject([UtilMethodsService], (service: UtilMethodsService) => {

            const obj = {
                'question_reference_id': null,
                'sequence_number': null,
                'label': '',
                'name': '',
                'type': '',
            };

            const result = UtilMethodsService.filterEmptyValueFromObject(obj);
            expect(typeof result).toBe('object');

        }));

    it('should filter empty values from object and delete',
        inject([UtilMethodsService], (service: UtilMethodsService) => {

            const obj = {
                'question_reference_id': 181,
                'sequence_number': 1,
                'label': 'name',
                'name': '',
                'type': null,
                'dummy': {
                    'name': '',
                    'city': null,
                    'dummyArr': [{
                        'documentVerification': null,
                    },
                    ],
                    'dummyArrA': [{
                        'documentVerification': {
                            'documentVerificationName': '',
                        },
                    },
                    ],
                },
                'validations': [
                    {
                        'name': 'required',
                        'pattern': '',
                        'message': 'This field is required',
                    },
                    {
                        'name': 'maxlength',
                        'pattern': '255',
                        'message': 'This field should not exceed 255 characters.',
                    },
                ],
            };

            const result = UtilMethodsService.filterEmptyValueFromObject(obj);
            expect(typeof result).toBe('object');

        }));

    it('should return true if object equal if objectsEqual method get called', inject([UtilMethodsService], (service: UtilMethodsService) => {
        const result = UtilMethodsService.objectsEqual(null, null);
        expect(result).toBe(true);
    }));

    it('should return false if object not equal if objectsEqual method get called',
        inject([UtilMethodsService], (service: UtilMethodsService) => {

            const result = UtilMethodsService.objectsEqual(null, null);
            expect(result).toBe(true);
        }));

    it('should return false if arrays are not equal if arraysEqual method get called',
        inject([UtilMethodsService], (service: UtilMethodsService) => {
            const arr1 = [1, 2, 3, 4, 5, 6];
            const arr2 = [1, 2, 3];
            const arr3 = [1, 2, 3, 4, 5, 6];
            const arr4 = [1, 2, 3, 4, 6, 6];

            const result = UtilMethodsService.arraysEqual(arr1, arr2);
            const result1 = UtilMethodsService.arraysEqual(arr3, arr4);
            expect(result).toBe(false);
            expect(result1).toBe(false);
        }));

    it('should return true if arrays are equal if arraysEqual method get called',
        inject([UtilMethodsService], (service: UtilMethodsService) => {
            const arr1 = [1, 2, 3, 4, 5, 6];
            const arr2 = [1, 2, 3, 4, 5, 6];
            const result = UtilMethodsService.arraysEqual(arr1, arr2);
            const result1 = UtilMethodsService.arraysEqual(null, null);
            expect(result).toBe(true);
            expect(result).toBe(true);
        }));


});
