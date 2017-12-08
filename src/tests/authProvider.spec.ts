import {} from 'jasmine';
import { AuthProvider } from '../providers/auth';
import { CloudOptions } from "../fh-js-sdk";

class MockRhmapProvider { 
  token: string;
  constructor() {
  }
  setToken(token){
    this.token = token;
  }
  cloud(options: CloudOptions) {
    return new Promise((resolve: Function, reject: Function) => {
      if (options.path !== 'api/v1/verify'){
        reject('incorrect path');
      } else {
        resolve(true);
      }
      
    });
  }
}

describe('Auth Provider', () => {
  
    let component: AuthProvider;
    let service: MockRhmapProvider;
  
    beforeEach(() => { 
      

      service = new MockRhmapProvider();
      component = new AuthProvider(service);
    });
  
    afterEach(() => {

      service = null;
      component = null;
    });
  
    it('verify returns success for valid username and password  ', (done) => {
      component.verify('username', 'password')
      .then((res) => {
        expect(res).toBe(true);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
    });

    it('verify returns error for missing username or password  ', (done) => {
      component.verify('username','')
      .then((res) => {
      })
      .catch((err) => {
        expect(err).toEqual('Missing argument');
        done();
      })
    });

    it('generateBasicAuthToken return correctly formatted token', (done) => {
      var token = component.generateBasicAuthToken('username', 'password');
      expect(token).toEqual('dXNlcm5hbWU6cGFzc3dvcmQ=');
      done();
    });
  });