import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroComponent } from "./hero.component"
import { RouterTestingModule } from '@angular/router/testing';
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";

describe('HeroComponent (Shallow)', () => {

    let _component: HeroComponent;
    let _fixture : ComponentFixture<HeroComponent>;
    let _hero: Hero;

    //NO_ERRORS_SCHEMA - Tells angular dont try to validate the schema, dont validate template
    // don't get schema validation we normally get in angular

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });

        _hero = {id: 1, name:'SuperDude', strength:3};

        _fixture = TestBed.createComponent(HeroComponent);
        _fixture.componentInstance.hero = _hero;
        _component = _fixture.componentInstance;
        _fixture.detectChanges(); // run change detection and update any bindings    
    })

    it('ShouldHaveTheCorrectHero', () => {
        expect(_component.hero).toEqual(
            jasmine.objectContaining(_hero));
    })

    it('ShouldRenderHeroNameInAnAnchorTag', () => {
        //_fixture.nativeElement gets access to the DOM element 
        //that represents the container for the template
        let anchorTag = _fixture.nativeElement.querySelector('a');
        
        expect(anchorTag.textContent).toContain(_hero.name);

        //using debug element
        let anchorDebugElement = _fixture.debugElement
            .query(By.css('a'));
            //can pass in .<classname> or #<id>

        expect(anchorDebugElement.nativeElement.textContent)
            .toContain(_hero.name);
    })
})