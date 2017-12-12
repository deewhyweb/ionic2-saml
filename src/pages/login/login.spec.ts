import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LoginPage } from './login';
import { TabsPage } from '../tabs/tabs';
import { IonicModule, NavController, AlertController} from 'ionic-angular/index';
import {Observable} from 'rxjs/Rx';

import {} from 'jasmine';

import { AuthProvider } from '../../providers/auth';
import sinon from 'sinon';

class mockInAppBrowser {
    create() {
        console.log('in mock create');
    }


}
class MockAuthProvider { 
    login(){
        return new Promise((resolve: Function, reject: Function) => {
            var res: any = {
                sso: 'https://sso.com'
            }
            resolve(res);
        });
    }
}

class MockNavController {
    push(page) {
        expect(page.name).toEqual('TabsPage');
        return new Promise((resolve: Function, reject: Function) => {
            resolve(true);
        });
    }
}

class MockAlertController {
    _getPortal(): any { return {} };
    create(options?: any) { 
    };
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
        { provide: InAppBrowser, useClass: mockInAppBrowser},
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
    expect(ionTitle.innerText).toMatch('RHMAP SAML Login',
      'ion-title should show header message');
  });


  it('Should doLogin', (done) => {

      sinon.stub(comp.iab, 'create').callsFake( (url: string,location: string, params: string)  => {
        expect(url).toEqual('https://sso.com');
        done();
        return {
            close: function(){
            },
            on: function(param){
                return  {
                    subscribe: function(cb){
                        if (param == 'loadstop'){
                            cb({url: '/login/ok'})
                        }
                    }
                }
            }
        }
      });
      comp.doLogin({});
  });

  it('Should not do Login', (done) => {
    sinon.stub(comp.alertCtrl, 'create').callsFake( (options: any) => {
        return {
            present: function(){
                expect(options.subTitle).toEqual('Error displaying SSO login page, please try again')
                done();
            }
        }
      });
    sinon.stub(comp.iab, 'create').callsFake( (url: string,location: string, params: string)  => {
      expect(url).toEqual('https://sso.com');
      return {
          close: function(){
          },
          on: function(param){
              return  {
                  subscribe: function(cb){
                      if (param == 'loaderror'){
                          cb({message: 'Error'})
                      }
                  }
              }
          }
      }
    });
    comp.doLogin({});
  });

});
