import { MessageService } from "./message.service"

describe('MessageService', () => {

    let service : MessageService;

    beforeEach(() => {
        service = new MessageService();
    })

    it('MessagesShouldBeEmptyWhenInitialised', () => {
        expect(service.messages.length).toBe(0);
    })


    it('AMessageShouldBeAddedWhenCallingAdd', () => {
        let message = 'TestMessage';
        
        service.add(message);

        expect(service.messages.length).toBe(1);
        expect(service.messages).toContain(message);
    })

    it('ShouldEmptyTheMessagesWhenCallingClear', () => {
        service.messages = ['message1', 'message2']
        expect(service.messages.length).toBe(2);

        service.clear();

        expect(service.messages.length).toBe(0);
    })
})