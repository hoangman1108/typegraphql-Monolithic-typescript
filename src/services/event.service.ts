import { EventCollection, IEvent } from '../models/event.model';
import { EventDeleteInput, EventInput } from '../Modules/Event/type/event.input';

class EventService {
  async create(input: EventInput): Promise<IEvent> {
    return EventCollection.findOne({ title: input.title })
      .then(async (event: IEvent | null) => {
        if (event) {
          const error = new Error('Event is exists');
          throw error;
        }
        const create = await EventCollection.create(input);
        return create;
      });
  }

  async delete(input: EventDeleteInput): Promise<string> {
    return EventCollection.deleteOne({ _id: input.id }).then((result) => {
      if (result.n && result.n > 0) {
        return 'delete success';
      }
      return 'delete failed';
    });
  }
}

export default EventService;
