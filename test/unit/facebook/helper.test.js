import FacebookHelper from '../../../src/facebook/helper.js'

describe('facebook-helper', () => {
  let facebookHelper = null;

  before((done) => {
    let userId = "754362197950399";
    let token = "EAACEdEose0cBAPvND7oGlv3BpGlqDWEf2ZAWeYBwKIwMgl97UluEEcbCSPz6KoR3r8sUz7Mo8GXuwfS0QnoOEf32n1flmy7Lz3PRE1owNb46UFavfAzCRaQBm4C4nFYG0mSopjE7gTdmhDOIyMBMODSlZB9nEnIxJrZAV6VuwZDZD";
    facebookHelper = new FacebookHelper({userId, token});
    console.log(facebookHelper);
    done();
  });

  it("get friends list", async (done) => {
    try {
      let friends = await facebookHelper.getFriends();
      console.log("friends", friends);
      (friends != null).should.be.true;
      friends.should.be.Array;
      friends[0].should.have.keys("name", "id");
      done();
    } catch (e) {
      done(e);
    }
  });

  it.skip("publish post", async (done) => {
    try {
      let post = {
        message: 'test facebook post api'
      }
      let result = await facebookHelper.publishPost(post);
      console.log("result", result);
      done();
    } catch (e) {
      done(e);
    }
  });
});
