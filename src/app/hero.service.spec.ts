import { inject,TestBed } from "@angular/core/testing"
import { HeroService } from "./hero.service"
import { MessageService } from "./message.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"

describe('HeroService', () => {

    let _mockMessageService;
    let _httpTestingController : HttpTestingController;
    let _service: HeroService;

    beforeEach(() => {
        _mockMessageService = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HeroService, 
            {provide: MessageService, useValue: _mockMessageService}]
        });

        _httpTestingController = TestBed
            .inject(HttpTestingController);
        _service = TestBed.inject(HeroService);
    })

    describe('getHero', () => {
        it('should call get with the correct url', () => {
            _service.getHero(4).subscribe();

            const request = _httpTestingController
                .expectOne('api/heroes/4');
            request.flush({id:4, name:'SuperDude', strength:100});
            
            _httpTestingController.verify();
            expect(request.request.method).toBe('GET');
        })
    })
})