import * as yup from 'yup';
import {
  Arg, Extensions, Mutation, Resolver,
} from 'type-graphql';
import { Event, EventPayload } from './type/event.type';
import { EventInput } from './type/event.input';
import { IEvent, EventCollection } from '../../Models/event.model';
import { ObjectIdScalar } from '../../Scalars/ObjectIdScalars';
@Resolver()
export class EventResolver {
  @Mutation(() => EventPayload)
  @Extensions({
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
}
