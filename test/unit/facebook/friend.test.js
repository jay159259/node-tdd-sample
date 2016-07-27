import task1_initModel from '../../../src/database/task1';
import FacebookHelper from '../../../src/facebook/helper.js'

describe.only('Test models for friend.js', () => {
    let facebookHelper = null;
    let model = null;
    let fbFriendList = [];
    
    before( async (done) => {
        let userId = "754362197950399";
        let token = "EAACEdEose0cBAL5jdIz7KdQ3gaZCecVEsPCtI1jfZADywwQ3R66ZChmAUvPZAuv9mnYI5ZAlRor5TuZBmoIS3rhxyxsCT1CbQ9AkZBjGtpVeQVQevZB1ZC59ShCxWLoFI3pok0SJ2O292A8aUPObRt4IJqvuZCwHVXITQ6HeHiZBfZAsXwZDZD";
        facebookHelper = await new FacebookHelper({userId, token});
        model = await task1_initModel();
        console.log(facebookHelper);
        done();
    });


    it('把從 facebook 取得的 friends list 存入 sequelize 之 friend model (create)', async (done) => {
        try {
            fbFriendList = await facebookHelper.getFriends();
            console.log(fbFriendList);
            let result = await model.friend.bulkCreate(fbFriendList);
            result.length.should.be.eq(fbFriendList.length);
            done();            
        } catch(e) {
            done(e);
        }
    });
    
    it('原本用 api 取得 friends list 改為透過查詢資料庫的方式 (find)', async (done) =>  {
       try {
           let findFriend = await model.friend.findOne({
                where: {
                 name: '趙冠逸'
            },
       });
           findFriend.name.should.be.eq(fbFriendList[0].name);
           done();
       } catch(e) {
           done(e);
       }
    });
    
    it('將其中一個 friend 更新其 email 欄位為 hellojs@trunk.studio (update)', async (done) =>  {
       try {
           let friend = await model.friend.findById(fbFriendList[1].id);
           friend.email = 'hellojs@trunk.studio';
           await friend.save();
           friend.email.should.be.eq('hellojs@trunk.studio');
           done();
       } catch(e) {
           done(e);
       }
    });
    
    it('刪除該位 friend (delete)', async (done) =>  {
       try {
          let friend = await model.friend.findOne({
              where: {
                name: '劉喜春'  
              },
          });
           await friend.destroy();  
           
           let test = await model.friend.findOne({
              where: {
                name: '劉喜春'  
              },
          });
           
           (test === null).should.be.true;
           done();
       } catch(e) {
           done(e);
       }
    });
});