import Controller from '@ember/controller'
import config from '../../config/environment'

export default Controller.extend({
  packageVersion: config.version
})