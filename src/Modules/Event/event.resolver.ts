import * as yup from 'yup';
import {
  Arg, Ctx, Extensions, Mutation, Resolver,
} from 'type-graphql';
import { Event, EventDelete, EventPayload } from './type/event.type';
import { EventDeleteInput, EventInput } from './type/event.input';
import { IEvent, EventCollection } from '../../models/event.model';
import { ObjectIdScalar } from '../../Scalars/ObjectIdScalars';
import EventService from '../../services/event.service';
@Resolver()
export class EventResolver {
  @Mutation(() => EventPayload)
  @Extensions({
    authenticate: true,
    validationSchema: yup.object().shape({
      data: yup.object().shape({
        title: yup.string()
          .required('Title is a required field.'),
        description: yup.string()
          .trim()
          .min(5)
          .required('Description is a required field.'),
      }),
    }),
  })
  async createEvent(@Arg('data') input: EventInput): Promise<EventPayload> {
    const create: IEvent = await EventCollection.create(input);
    const result: Event = {
      title: create.title,
      description: create.description,
      id: ObjectIdScalar.parseValue(create.id),
    };
    return {
      event: result,
      errors: null,
    };
  }

  @Mutation(() => EventDelete)
  async deleteEvent(@Arg('data') input: EventDeleteInput,
    @Ctx() { eventService }: { eventService: EventService }): Promise<EventDelete> {
    const isDelete = await eventService.delete(input);
    return {
      event: isDelete,
      errors: null,
    };
  }
}
