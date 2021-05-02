import 'reflect-metadata';
import {
  Application,
  gql,
  Inject,
  Injectable,
  MODULE_ID,
  testkit,
} from 'graphql-modules';
import { Profile, ProfileInput } from '../../generated/graphql';
import {
  IProfilesProvider, PROFILES_PROVIDER, ProfilesProvider,
} from '../../providers/profilesProvider';
import { application } from '../Application';
import { IProfileModuleConfig, profileModule } from './profileModule';

describe('profileModule', () => {



  it('set up correctly', () => {
    const app = testkit.testModule(profileModule, {
      replaceExtensions: true,
    });
    expect(app.schema.getQueryType())
        .toBeDefined();
  });

    describe('Query profile(id) {}', () => {
      let id: string;
      let profile: Profile;
      const makeTestProfileFromId = (id: string) => (
          {
            displayName: `testDisplayName-${id}`,
            email      : `testEmail@email.com-${id}`,
          }

      );

      beforeEach(() => {
        id = "some-test-id";

        profile = {
          displayName: 'testDisplayName',
          email      : 'testEmail@email.com',
        };

      });

    it('calls ProfileProvider.getProfileById() with id for profile query', async () => {

      const app = testkit.mockApplication(application)
                         .replaceModule(testkit.mockModule(profileModule, {
                           providers: [
                             {
                               provide : PROFILES_PROVIDER,
                               useValue: {
                                 getProfileById(id: string): Profile | null {
                                   return makeTestProfileFromId(id);
                                 },
                               },
                             },
                           ],
                         }));

        const resultPromise = testkit.execute(app, {
            document    : gql`query Query($id: ID! ) {
                profile(id: $id)  {
                    displayName
                    email
                    games
                    characters
                }
            }`,
          variableValues: {id},
        });

      const result = (
          await resultPromise).data;

      //Returns Profile
      expect(result)
          .toHaveProperty('profile');

      //Has correct properties
      expect(result?.profile)
          .toHaveProperty('displayName');
      expect(result?.profile)
          .toHaveProperty('email');

      //Properties include the test id;
      expect(result?.profile?.displayName)
          .toEqual(makeTestProfileFromId(id).displayName);
      expect(result?.profile?.email)
          .toEqual(makeTestProfileFromId(id).email);
    });



    })

  describe('Mutation createProfile(profileInput) {}', () => {
    let app: Application;
    let profileInput: ProfileInput;

    beforeEach(()=>{

      profileInput = {
        displayName: 'testDisplayName',
        email      : 'testEmail',
        password   : 'testPassword'

      }

      app = testkit.mockApplication(application)
                         .replaceModule(testkit.mockModule(profileModule, {
                           providers: [
                             {provide : PROFILES_PROVIDER,
                               useValue: {
                               createProfile: (profileInput: ProfileInput)=> {
                                   return "12345"
                                 }
                               },
                             }
                           ],
                         }));
    })

    test('returns an error if profile is not created', async ()=> {

        const result = await testkit.execute(app, {
            document    : gql`
                mutation Mutation($profileInput: ProfileInput!) 
                {
                createProfile(profileInput: $profileInput)
            }`,
          variableValues: {profile: profileInput},
        });

        expect(result).toHaveProperty('errors')
    })


      test('returns error if profileInfo is missing displayName', async () => {
          const result = await testkit.execute(app, {
              document: gql`
                  mutation Mutation($profileInput: ProfileInput!)
                  {
                      createProfile(profileInput: $profileInput)
                  }`,
              variableValues: {
                profileInput: {
                  displayName: {...profileInput, displayName: undefined}
                }
              }
          });


        expect(result)
            .toHaveProperty('errors')
      });

      test('returns error if profileInfo is missing email', async () => {
          const result = await testkit.execute(app, {
              document: gql`
                  mutation Mutation($profileInput: ProfileInput!)
                  {
                      createProfile(profileInput: $profileInput)
                  }`,
            variableValues: {
              profileInput: {
                displayName: {
                  ...profileInput,
                  email: undefined
                }
              }
            }
          });

        expect(result)
            .toHaveProperty('errors')
      });

      test('returns error if profileInfo is missing password', async () => {
          const result = await testkit.execute(app, {
              document    : gql`
                  mutation Mutation($profileInput: ProfileInput!)
                  {
                      createProfile(profileInput: $profileInput)
                  }`,
            variableValues: {
              profileInput: {
                displayName: {
                  ...profileInput,
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
