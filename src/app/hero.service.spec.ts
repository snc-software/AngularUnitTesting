import { TestBed } from "@angular/core/testing"
import { HeroService } from "./hero.service"
import { MessageService } from "./message.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"

describe('HeroService', () => {

    let _mockMessageService;
    let _httpTestingController : HttpTestingController;

    beforeEach(() => {
        _mockMessageService = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HeroService, 
            {provide: MessageService, useValue: _mockMessageService}]
        });

        _httpTestingController = TestBed
            .inject(HttpTestingController);
    })
})