import { query } from "@angular/animations";
import { Component, Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs/internal/observable/of";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component"

@Directive({
    selector: '[routerLink]',
    host: {'(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;

    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

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
                HeroComponent,
                RouterLinkDirectiveStub
            ],
            providers: [
                {provide: HeroService, useValue: _mockHeroService}
            ],
            // schemas: [NO_ERRORS_SCHEMA]
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

    it('ShouldCallDeleteWhenTheHeroComponentsDeleteButtonIsClicked', () => {
        spyOn(_component, 'delete'); //watch to see if it is invoked
        const heroElements = _fixture.debugElement
            .queryAll(By.directive(HeroComponent));

        heroElements[0].query(By.css('button'))
        .triggerEventHandler('click', 
        {stopPropagation: () => {}});

        //we got the first hero element which correlates to the first hero
        expect(_component.delete).toHaveBeenCalledWith(_heroes[0]); 
     })

     it('ShouldCallDeleteWhenTheHeroComponentsDeleteButtonIsClickedWithoutQuery', () => {
        spyOn(_component, 'delete'); //watch to see if it is invoked
        const heroElements = _fixture.debugElement
            .queryAll(By.directive(HeroComponent));

        // (<HeroComponent>heroElements[0].componentInstance).delete.emit(undefined);
        heroElements[0].triggerEventHandler('delete',null);//raise the delete event without caring about child event emitter

        //we got the first hero element which correlates to the first hero
        expect(_component.delete).toHaveBeenCalledWith(_heroes[0]); 
     })

     it('ShouldCallAddWhentheAddButtonIsClicked', () => {
        spyOn(_component, 'add')
        const heroName = "Mr Ice";
        _mockHeroService.addHero.and.returnValue(of({id:5, name:heroName, strength:4}));
        const inputElement = _fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = _fixture.debugElement.queryAll(By.css('button'))[0]; //should use css accessor

        //simulates typing heroName into the input box
        inputElement.value = heroName;
        addButton.triggerEventHandler('click', null);
        _fixture.detectChanges();

        expect(_component.add).toHaveBeenCalledOnceWith(heroName);
        expect(_component.add).toHaveBeenCalledTimes(1);
     })

     it('ShouldAddANewHeroToTheHeroListWhenTheAddButtonIsClicked', () => {
        //spyOn(_component, 'add')
        const heroName = "Mr Ice";
        _mockHeroService.addHero.and.returnValue(of({id:5, name:heroName, strength:4}));
        const inputElement = _fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = _fixture.debugElement.queryAll(By.css('button'))[0]; //should use css accessor

        //simulates typing heroName into the input box
        inputElement.value = heroName;
        addButton.triggerEventHandler('click', null);
        _fixture.detectChanges();

        //expect(_component.add).toHaveBeenCalledOnceWith(heroName);
        const heroes = _fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        expect(heroes).toContain(heroName);
     })

     it('TheHeroComponentShouldHaveTheCorrectRouteWhenClicked', () => {
        const heroElements = _fixture.debugElement
            .queryAll(By.directive(HeroComponent));
        let routerLink = heroElements[0]
            .query(By.directive(RouterLinkDirectiveStub))
            .injector.get(RouterLinkDirectiveStub);

        const anchorTag = heroElements[0].query(By.css('a'))
            .triggerEventHandler('click', null);
        
            expect(routerLink.navigatedTo).toEqual('/detail/1');
     })
})