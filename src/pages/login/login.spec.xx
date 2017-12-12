import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { LoginPage } from './login';
import { TabsPage } from '../tabs/tabs';
import { IonicModule, NavController, AlertController} from 'ionic-angular/index';
import {} from 'jasmine';
import { AuthProvider } from '../../providers/auth';
import sinon from 'sinon';

class MockAuthProvider { 
    verify(username: string, password: string){
        return new Promise((resolve: Function, reject: Function) => {
            if (username == 'username'  && password == 'password'){
                resolve(true);
            } else {
                reject('invalid username or password');
            }
        });
    }
}

class MockNavController {
    setRoot(page) {}

}

class MockAlertController {
    _getPortal(): any { return {} };
    create(options?: any) { return {} };
};


describe('Login', () => {
  let de: DebugElement;
  let comp: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(LoginPage)
      ],
      providers: [
        { provide: AuthProvider, useClass: MockAuthProvider},
        { provide: NavController, useClass: MockNavController},
        { provide: AlertController, useClass: MockAlertController },
        { provide: TabsPage, TabsPage}
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('ion-title'));
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('should have expected ion-title text', () => {

    fixture.detectChanges();
    const ionTitle = de.nativeElement;
    expect(ionTitle.innerText).toMatch('RHMAP Basic Auth Login',
      'ion-title should show header message');
  });


  it('Should doLogin', (done) => {
      sinon.stub(comp.navCtrl, 'setRoot').callsFake(page => {
        expect(page.name).toEqual('TabsPage');
        done();
      })
      comp.formData.value.username = 'username';
      comp.formData.value.password = 'password';
      comp.doLogin({});
  });

  it('Should not doLogin', () => {
    sinon.stub(comp.alertCtrl, 'create').callsFake(options => {
        expect(options.subTitle).toEqual('invalid username or password');
        return {
            present: () =>{}
        }
    });
    comp.formData.value.username = 'invalid';
    comp.formData.value.password = 'invalid';
    comp.doLogin({});
  });

});
