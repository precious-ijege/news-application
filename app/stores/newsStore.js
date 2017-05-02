import { EventEmitter } from 'events';
import assign from 'object-assign';
import NewsDispatcher from '../dispatcher/newsDispatcher';
import NewsActionTypes from '../constants/newsActionTypes';

const CHANGE_EVENT = 'change';
const NewsStore = assign({}, EventEmitter.prototype, {

  news: [],


// Accessor method
  getNews() {
    // console.log('get news method from store', this.news);
    return this.news;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

});

NewsDispatcher.register((payload) => {
  switch (payload.eventName) {

    case NewsActionTypes.GET_NEWS:
      console.log('news store dispatcher', payload);
      NewsStore.news = payload.newsItem;
      NewsStore.emitChange();
      break;
    default:
      return true;
  }
});

export default NewsStore;