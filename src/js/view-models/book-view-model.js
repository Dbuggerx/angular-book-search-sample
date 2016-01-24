import moment from 'moment';

/**
 * @class BookViewModel
 */
export default class BookViewModel {

  /**
   * Returns the relative published date
   * @return {string} The relative published date
   */
  get relativePublishedDate(){
    return moment.duration(moment().diff(this.published)).humanize();
  }
}
