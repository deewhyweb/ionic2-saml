import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HomePage } from './home';
import { TabsPage } from '../tabs/tabs';
import { IonicModule, NavController, AlertController} from 'ionic-angular/index';
import {} from 'jasmine';
import { RhmapProvider } from '../../providers/rhmap';
import sinon from 'sinon';
import { CloudOptions } from "../../fh-js-sdk";
import { setTimeout } from 'timers';

class MockRhmapProvider { 
    constructor() {
    }

    cloud(options: CloudOptions) {
      return new Promise((resolve: Function, reject: Function) => {
        if (options.path !== '/items'){
          reject('incorrect path');
        } else {
            var items = [
                {label:'Item 1', description: 'Description for Item 1'},
                {label:'Item 2', description: 'Description for Item 2'},
                {label:'Item 3', description: 'Description for Item 3'},
                {label:'Item 4', description: 'Description for Item 4'},
                {label:'Item 5', description: 'Description for Item 5'},
                {label:'Item 6', description: 'Description for Item 6'}
            ]
           resolve(items);
        }
        
      });
    }
  }

class MockNavController {
    push(page) {}

}

class MockAlertController {
    _getPortal(): any { return {} };
    create(options?: any) { return {} };
};


describe('Home', () => {
  let de: DebugElement;
  let comp: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(HomePage)
      ],
      providers: [
        { provide: RhmapProvider, useClass: MockRhmapProvider},
        { provide: NavController, useClass: MockNavController},
        { provide: TabsPage, TabsPage}
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('ion-title'));
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('should have expected ion-title text', () => {

    fixture.detectChanges();
    const ionTitle = de.nativeElement;
    expect(ionTitle.innerText).toMatch('Home',
      'ion-title should show header message');
  });


  it('Should get items', (done) => {
     fixture.whenStable()
     .then(() =>{
        expect(comp.items.length).toEqual(6);
        done();
     });
  });

  it('should test selecting an item', (done) => {
    var item = {label:'Item 1', description: 'Description for Item 1'};
    sinon.stub(comp.navCtrl, 'push').callsFake((page, passedItem) => {
        expect(passedItem.item.label).toEqual('Item 1');
        expect(page.name).toEqual('DetailPage');
        done();
      })
    comp.itemSelected(item);

  });



});
