import {} from 'jasmine';
import { AuthProvider } from '../providers/auth';
import { CloudOptions } from "../fh-js-sdk";



class MockRhmapProvider { 
  uuid: string;
  getDeviceId(){
    return this.uuid;
  }
  constructor( public device: any) {
  }

  cloud(options: CloudOptions) {
    return new Promise((resolve: Function, reject: Function) => {
      var res: any = {
        sso: 'https://sso.com'
      }
      if (options.path !== 'sso/session/login_host'){
        reject('incorrect path');
      } else {
        resolve(res);
      }
      
    });
  }
}

describe('Auth Provider', () => {
  
    let component: AuthProvider;
    let service: MockRhmapProvider;
    let mockDevice: any;
  
    beforeEach(() => { 
      
      mockDevice = {};
      service = new MockRhmapProvider(mockDevice);
      component = new AuthProvider(service);
    });
  
    afterEach(() => {

      mockDevice = null;
      service = null;
      component = null;
    });
  
    it('login returns success for valid ', (done) => {
      component.login()
      .then((res: any) => {
        expect(res.sso).toEqual('https://sso.com');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
    });
  });