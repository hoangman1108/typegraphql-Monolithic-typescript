# TypeGraphQL, Typescript, Node, Mongoose

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
1. git clone [https://github.com/hoangman1108/typegraphql-Monolithic-typescript.git](https://github.com/hoangman1108/typegraphql-Monolithic-typescript.git)

2. Install the dependencies and devDependencies and start the server.
```sh
// with npm
$ cd typegraphql-Monolithic-typescript
$ npm install -d
$ npm run dev

// with yarn
$ cd typegraphql-Monolithic-typescript
$ yarn install
$ yarn dev
```

## Services Example

Services help custom when call to code is fresh.

```typescript
import { IUser, UserCollection } from './user.model';
import { UserIdInput, UserInput } from './type/user.input';
import { User } from '../type/user.type';

class UserService {
  async create(user: UserInput): Promise<IUser> {
    const create: IUser = await UserCollection.create(user);
    return create;
  }

  async list(): Promise<IUser[] | null> {
    const list: IUser[] = await UserCollection.find();
    return list;
  }

  async detail(id: String): Promise<User> {
    const user: IUser | null = await UserCollection.findById(id);
    if (!user) {
      throw new Error('User does not exists');
    }
    // Curently, I didn't know how to use result:User = {...user}, it has some thing wrong
    const result:User = {
      id: user.id,
      name: user.name,
      password: user.password,
      email: user.email,
    };
    return result;
  }

  async delete(id: UserIdInput): Promise<string> {
    return UserCollection.deleteOne({ _id: id.id }).catch((error) => {
      if (error) return 'DELETE_ERROR';
      return 'DELETED_SUCCESS';
    });
  }
}

export default UserService;

```

## eventBus
```typescript
import * as events from 'events';

class EventsBus extends events.EventEmitter {
  async publish(event: string, args: any) {
    return this.emit(event, args);
  }

  async subscribe(event: string, handler: any) {
    this.on(event, handler);
  }
}

export default EventsBus;

```

## Registry
 
 Registry map services and eventBus (register is export all services)  

```typescript
import { Logger } from 'pino';
import EventsBus from './eventBus';
import Modules from './register';

class ServiceRegistry {
  public services: any;

  public eventsBus: EventsBus;

  constructor(logger: Logger) {
    this.eventsBus = new EventsBus();
    logger.info('Register Service');

    this.services = {
      eventsBus: this.eventsBus,
    };

    Object.entries(Modules.services).forEach((service) => {
      this.services = { ...this.services, [service[0].toString()]: new service[1]() };
    });
  }

  get(): void {
    return this.services;
  }
}

export default ServiceRegistry;

```

 ###   register

```typescript
import UserHandler from './user.service';


export default {
  services: {
    userService: UserHandler,
    ...
    // all services here
  },
};

```
## Authentication
1. passport
1. passport-jwt

## [Typegraphql](https://typegraphql.com/)
- Useful for typescript and help custom easier to read.