import { ProfilesProvider } from './profilesProvider';

const profileService =  new ProfilesProvider()

describe('Profile Service', ()=> {
  it(`returns null if Id doesn't exist`, ()=>{
    expect(profileService.getProfileById("not a real profile")).toBeNull()
  })

})
