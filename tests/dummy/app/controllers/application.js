import Controller from '@ember/controller'
import config from 'dummy/config/environment'

export default Controller.extend({
  packageVersion: config.version
})