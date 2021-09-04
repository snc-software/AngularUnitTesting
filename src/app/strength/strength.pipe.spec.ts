import { StrengthPipe } from "./strength.pipe"

describe('StrengthPipe', () => {

    let pipe: StrengthPipe;

    beforeEach(() => {
        pipe = new StrengthPipe();
    })


    it('ShouldReturnWeakIfValueIsLessThan10', () => {
        for(let i = 1; i < 10; i++) {

            let result = pipe.transform(i);

            expect(result).toBe(i + ' (weak)');
        }
    })

    it('ShouldReturnStrongWhenValueIs10OrHigherButLesssThan20', () => {
        for(let i = 10; i < 20; i++) {

            let result = pipe.transform(i);

            expect(result).toBe(i + ' (strong)');
        }
    })

    it('ShouldReturnUnbelievableWhenValueIs20', () => {
        let result = pipe.transform(20);

        expect(result).toBe('20 (unbelievable)')
    })

    it('ShouldReturnUnbelievableWhenValueIs20OrHigher', () => {
        //random number higher than 20
        let value = Math.floor(Math.random() * 100) + 20;

        let result = pipe.transform(value);

        expect(result).toBe(value + ' (unbelievable)')
    })
})
