import axios from 'axios';
export default class CommentsApi {
  static async getAll(limit = 10, page = 1) {
    return await axios.get('https://jsonplaceholder.typicode.com/comments', {
      params: {
        _limit: limit,
        _page: page,
      },
    });
  }

  static async getById(id) {
    return await axios.get(
      'https://jsonplaceholder.typicode.com/comments/' + id,
    );
  }

  static async getByFilter(query, queryField) {
    return await axios.get(
      `https://jsonplaceholder.typicode.com/comments?${queryField}=${query}`,
    );
  }
}
