import { Location } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs/internal/observable/of";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component"

describe('HeroDetailComponent', () => {

    let _mockHeroService;
    let _mockLocation;
    let _mockActivatedRoute;
    let _fixture: ComponentFixture<HeroDetailComponent>
    let _component: HeroDetailComponent;
    let _hero: Hero;

    beforeEach(() => {

        _mockHeroService = jasmine.createSpyObj(
            ['getHero', 'updateHero']);
        _mockLocation = jasmine.createSpyObj(['back'])
        _mockActivatedRoute = {
            snapshot: {
                paramMap: {
                    get: () => {
                        return '3'
                    }
                }
            }
        }

        _hero = {id: 3, name:'SuperDude', strength: 100};
        _mockHeroService.getHero.and.returnValue(of(_hero));

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [HeroDetailComponent],
            providers: [
                {provide: ActivatedRoute, useValue: _mockActivatedRoute},
                {provide: HeroService, useValue: _mockHeroService},
                {provide: Location, useValue: _mockLocation},
            ]
        })

        _fixture = TestBed.createComponent(HeroDetailComponent);
        _component = _fixture.componentInstance;
        _fixture.detectChanges();
    })

    it('ShouldRenderTheHeroNameInAH2Tag', () => {
        let h2Tag = _fixture.nativeElement.querySelector('h2').textContent;

        expect(h2Tag).toContain(_hero.name.toUpperCase());
    })

})