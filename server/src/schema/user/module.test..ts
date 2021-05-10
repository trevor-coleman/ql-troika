import 'reflect-metadata';
import {
  Application,
  gql,
  Inject,
  Injectable,
  MODULE_ID,
  testkit,
} from 'graphql-modules';
import { User, UserInput } from '../../generated/graphql';
import {
  IUsersProvider, USERS_PROVIDER, UsersProvider,
} from '../../providers/users-provider';
import { application } from '../Application';
import { IUserModuleConfig, userModule } from './module';

describe('userModule', () => {



  it('set up correctly', () => {
    const app = testkit.testModule(userModule, {
      replaceExtensions: true,
    });
    expect(app.schema.getQueryType())
        .toBeDefined();
  });

    describe('Query user(id) {}', () => {
      let id: string;
      let user: User;
      const makeTestUserFromId = (id: string) => (
          {
            _id: id,
            name: `testName-${id}`,
            email      : `testEmail@email.com-${id}`,
          }

      );

      beforeEach(() => {
        id = "some-test-id";

        user = {
          _id: id,
          name: 'testName',
          email      : 'testEmail@email.com',
        };

      });

    it('calls UserProvider.getUserById() with id for user query', async () => {

      const app = testkit.mockApplication(application)
                         .replaceModule(testkit.mockModule(userModule, {
                           providers: [
                             {
                               provide : USERS_PROVIDER,
                               useValue: {
                                 getUserById(id: string): User | null {
                                   return makeTestUserFromId(id);
                                 },
                               },
                             },
                           ],
                         }));

        const resultPromise = testkit.execute(app, {
            document    : gql`query Query($id: ID! ) {
                user(id: $id)  {
                    name
                    email 
                    games
                    characters
                }
            }`,
          variableValues: {id},
        });

      const result = (
          await resultPromise).data;

      //Returns User
      expect(result)
          .toHaveProperty('user');

      //Has correct properties
      expect(result?.user)
          .toHaveProperty('name');
      expect(result?.user)
          .toHaveProperty('email');

      //Properties include the test id;
      expect(result?.user?.name)
          .toEqual(makeTestUserFromId(id).name);
      expect(result?.user?.email)
          .toEqual(makeTestUserFromId(id).email);
    });



    })

  describe('Mutation createUser(userInput) {}', () => {
    let app: Application;
    let userInput: UserInput;

    beforeEach(()=>{

      userInput = {
        name: 'testName',
        email      : 'testEmail',
        password   : 'testPassword'

      }

      app = testkit.mockApplication(application)
                         .replaceModule(testkit.mockModule(userModule, {
                           providers: [
                             {provide : USERS_PROVIDER,
                               useValue: {
                               createUser: (userInput: UserInput)=> {
                                   return "12345"
                                 }
                               },
                             }
                           ],
                         }));
    })

    test('returns an error if user is not created', async ()=> {

        const result = await testkit.execute(app, {
            document    : gql`
                mutation Mutation($userInput: UserInput!) 
                {
                createUser(userInput: $userInput)
            }`,
          variableValues: {user: userInput},
        });

        expect(result).toHaveProperty('errors')
    })


      test('returns error if userInfo is missing name', async () => {
          const result = await testkit.execute(app, {
              document: gql`
                  mutation Mutation($userInput: UserInput!)
                  {
                      createUser(userInput: $userInput)
                  }`,
              variableValues: {
                userInput: {
                  name: {...userInput, name: undefined}
                }
              }
          });


        expect(result)
            .toHaveProperty('errors')
      });

      test('returns error if userInfo is missing email', async () => {
          const result = await testkit.execute(app, {
              document: gql`
                  mutation Mutation($userInput: UserInput!)
                  {
                      createUser(userInput: $userInput)
                  }`,
            variableValues: {
              userInput: {
                name: {
                  ...userInput,
                  email: undefined
                }
              }
            }
          });

        expect(result)
            .toHaveProperty('errors')
      });

      test('returns error if userInfo is missing password', async () => {
          const result = await testkit.execute(app, {
              document    : gql`
                  mutation Mutation($userInput: UserInput!)
                  {
                      createUser(userInput: $userInput)
                  }`,
            variableValues: {
              userInput: {
                name: {
                  ...userInput,
                  password: undefined
                }
              }
            }
          });

        expect(result)
            .toHaveProperty('errors')
      });
  })



});
