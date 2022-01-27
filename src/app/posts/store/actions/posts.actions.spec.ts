import * as fromPosts from './posts.actions';

describe('loadPostss', () => {
  it('should return an action', () => {
    expect(fromPosts.loadPostss().type).toBe('[Posts] Load Postss');
  });
});
