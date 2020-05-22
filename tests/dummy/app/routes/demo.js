import Route from '@ember/routing/route';
import { run } from '@ember/runloop';
import { getData } from '../utils/get-data';
import { action } from '@ember/object';

export default class DemoRoute extends Route {
  numRows = 100;
  _nextLoad = null;

  model() {
    return getData(this.numRows);
  }

  afterModel() {
    run.later(this, this.loadSamples, 100);
  }

  loadSamples() {
    this.controller.set('model', getData(this.numRows));
    this._nextLoad = run.next(this, this.loadSamples);
  }

  @action
  willTransition() {
    run.cancel(this._nextLoad);
    this.controller.set('model', null);
  }
}