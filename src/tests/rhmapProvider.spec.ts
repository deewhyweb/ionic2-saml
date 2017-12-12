import {} from 'jasmine';
import { RhmapProvider } from '../providers/rhmap';
import { CloudOptions } from "../fh-js-sdk";
import * as $fh from "fh-js-sdk";
import sinon from 'sinon';
import { query } from '@angular/core/src/animation/dsl';


class DeviceMock {
    cordova: string;
    model: string;
    platform: string;
    uuid: string = 'mockUuid';
    version: string;
    manufacturer: string;
    isVirtual: boolean;
    serial: string;
}

describe('Rhmap Provider', () => {

    let device: DeviceMock;
    let component: RhmapProvider;
    beforeEach(() => { 

      device = new DeviceMock();

      component = new RhmapProvider(device);

    });
  
    afterEach(() => {
      component = null;
      (<any>$fh.cloud).restore()
    });
  
    it('cloud makes successfull call to $fh.cloud  ', (done) => {
      sinon.stub($fh, 'cloud').callsFake((options: CloudOptions, success: Function, fail: Function) => {
        if (options.path === '/hello'){
            expect(options.data.token).toEqual('mockUuid')
            success({msg: "hello world"});
          }

      });
      //component.device.uuid = 'DummyUUID';
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
      sinon.stub($fh, 'cloud').callsFake((options: CloudOptions, success: Function, fail: Function) => {
        if (options.path === '/invalidPath'){
            expect(options.data.token).toEqual('mockUuid')
            fail({msg: "Cannot POST /invalidPath"});
          }

      });
      var options: CloudOptions = {
          path: '/invalidPath',
          method: 'POST'
      }
      component.cloud(options)
      .then((res) => {
        
      })
      .catch((err) => {
        expect(err.msg).toEqual('Cannot POST /invalidPath');
        done();
      });
    });
});