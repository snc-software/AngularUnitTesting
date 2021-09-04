import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs/internal/observable/of";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent (Deep)', () => {
    let _component : HeroesComponent;
    let _fixture: ComponentFixture<HeroesComponent>;
    let _mockHeroService;
    let _heroes: Hero[]; 

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
                HeroComponent
            ],
            providers: [
                {provide: HeroService, useValue: _mockHeroService}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        _mockHeroService.getHeroes.and
            .returnValue(of(_heroes));


        _fixture = TestBed.createComponent(HeroesComponent);
        _component = _fixture.componentInstance;
        _fixture.detectChanges();
    });

    it('ShouldRenderEachHeroAsAHeroComponent', () => {
        const heroElements = _fixture.debugElement
            .queryAll(By.directive(HeroComponent));

        expect(heroElements.length).toBe(_heroes.length);

        for(let i = 0; i < _heroes.length; i++) {
            expect(heroElements[i].componentInstance.hero)
            .toEqual(_heroes[i]);
        }
    })
})