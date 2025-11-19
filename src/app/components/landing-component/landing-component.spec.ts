import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LandingComponent } from './landing-component'

describe('LandingComponent', () => {
  let landingComponent: LandingComponent
  let fixture: ComponentFixture<LandingComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LandingComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(LandingComponent)
    landingComponent = fixture.componentInstance
    fixture.detectChanges()
  })

  describe('getProfileImage', () => {
    let user: any

    describe('Given a user with a url including googleusercontent and NOT including =s', () => {
      it('should append ?sz=100 to the url', () => {
        user = {
          user_metadata: {
            avatar_url: 'https://lh3.googleusercontent.com/some-route',
          },
        }
        const result = landingComponent.getProfileImage(user)
        expect(result).toBe('https://lh3.googleusercontent.com/some-route?sz=100')
      })
    })

    describe('Given a user with a url not including googleusercontent ', () => {
      it('should return the url as is', () => {
				user = {
          user_metadata: {
            avatar_url: 'https://lh3.dummyusercontent.com/a-/AOh14Gjexample=s96-c',
          },
        }
        const result = landingComponent.getProfileImage(user)
        expect(result).toBe('https://lh3.dummyusercontent.com/a-/AOh14Gjexample=s96-c')
      })
    })
  })
})
