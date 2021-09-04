import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs/internal/observable/of";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent (Shallow)', () => {
    let _component : HeroesComponent;
    let _fixture: ComponentFixture<HeroesComponent>;
    let _mockHeroService;
    let _heroes: Hero[];
    

    @Component({
        selector: 'app-hero',
        template: '<div></div>',
      })
    class TestHeroComponent {
        @Input() hero: Hero;
        //@Output() delete = new EventEmitter();
      }      


    beforeEach(() => {
        _mockHeroService = jasmine.createSpyObj(
            ['getHeroes', 'addHero', 'deleteHero']);

            _heroes = [
                {id:1, name: 'SpiderDude', strength:8},
                {id:2, name: 'Wonderful Woman', strength:24},
                {id:3, name: 'SuperDude', strength:55},
            ];

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                TestHeroComponent
            ],
            providers: [
                {provide: HeroService, useValue: _mockHeroService}
            ]
        });

        _fixture = TestBed.createComponent(HeroesComponent);
        _component = _fixture.componentInstance;
    });

    it('ShouldSetHeroesFromTheService', () => {
        _mockHeroService.getHeroes.and
            .returnValue(of(_heroes));
        _fixture.detectChanges();

        expect(_component.heroes).toEqual(_heroes);
    })

    it('ShouldCreateAnApp-HeroElementForEachHero', () => {
        _mockHeroService.getHeroes.and
            .returnValue(of(_heroes));
        _fixture.detectChanges();

        var listElements = _fixture.debugElement
        .queryAll(By.css('app-hero'));

        expect(listElements.length).toBe(_heroes.length);
    })
})