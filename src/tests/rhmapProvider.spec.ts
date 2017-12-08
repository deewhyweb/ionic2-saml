import {} from 'jasmine';
import { RhmapProvider } from '../providers/rhmap';
import { CloudOptions } from "../fh-js-sdk";
import * as $fh from "fh-js-sdk";
import sinon from 'sinon';


describe('Rhmap Provider', () => {

    let component: RhmapProvider;
    beforeEach(() => { 

      component = new RhmapProvider();
        
      var cloud = sinon.stub($fh, 'cloud').callsFake((options: CloudOptions, success: Function, fail: Function) => {
        if (options.path === '/hello'){
            success({msg: "hello world"});
          }
          if (options.path === '/invalidPath'){
            fail('Cannot POST /invalidPath');
          }
          if (options.headers){
            var authorizationHeader = options.headers.Authorization;
            var parts = authorizationHeader.split(" ");
            if (parts[0] !== "Basic"){
              fail('Invalid Authorization header')
            } else {
              var token = atob(parts[1]);
              var credentials = token.split(":");
              if (credentials[0] === 'username' && credentials[1]=== 'password'){
                success(true);
              } else {
                fail('Invalid username and password');
              }
            }
          } else {
            fail('Headers missing');
          }
      });
    });
  
    afterEach(() => {
      component = null;
      (<any>$fh.cloud).restore()
    });
  
    it('cloud makes successfull call to $fh.cloud  ', (done) => {
      component.setToken('token');
      var options: CloudOptions = {
          path: '/hello',
          method: 'POST'
      }
      component.cloud(options)
      .then((res: any) => {
        expect(res.msg).toEqual('hello world');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
    });
    it('cloud makes unsuccessfull call to $fh.cloud  ', (done) => {
      component.setToken('token');
      var options: CloudOptions = {
          path: '/invalidPath',
          method: 'POST'
      }
      component.cloud(options)
      .then((res) => {
        
      })
      .catch((err) => {
        expect(err).toEqual('Cannot POST /invalidPath');
        done();
      });
    });
    it('cloud makes unsuccessfull call to $fh.cloud with missing token  ', (done) => {
      var options: CloudOptions = {
          path: '/hello',
          method: 'POST'
      }
      component.cloud(options)
      .then((res) => {
        
      })
      .catch((err) => {
        expect(err).toEqual('Missing token');
        done();
      });
    });
});