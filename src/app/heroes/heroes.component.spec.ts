import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent', () => {
    let _component: HeroesComponent;
    let _heroes;
    let _mockHeroService;

    beforeEach(() => {
        _heroes = [
            {id:1, name: 'SpiderDude', strength:8},
            {id:2, name: 'Wonderful Woman', strength:24},
            {id:3, name: 'SuperDude', strength:55},
        ];

        _mockHeroService = jasmine.createSpyObj(
            ['addHero', 'getHeroes', 'deleteHero']
        );
    
        _component = new HeroesComponent(_mockHeroService);
    })

    describe('delete', () => {

        it('ShouldRemoveTheHeroFromTheHeroesList', () => {
           _mockHeroService.deleteHero.and.returnValue(of(true));
            _component.heroes = _heroes;

            _component.delete(_heroes[2]);

            expect(_component.heroes.length).toBe(2);
            expect(_component.heroes).not.toContain(
                jasmine.objectContaining(_heroes[2]));
        })

        it('ShouldDeleteTheHeroUsingTheHeroService', () => {
            _mockHeroService.deleteHero.and.returnValue(of(true));
            _component.heroes = _heroes;

            _component.delete(_heroes[2]);

            expect(_mockHeroService.deleteHero)
                .toHaveBeenCalledTimes(1);
            expect(_mockHeroService.deleteHero)
                .toHaveBeenCalledWith(_heroes[2]);
        })

    })
})