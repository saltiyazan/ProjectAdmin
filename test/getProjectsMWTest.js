let expect = require('chai').expect;
let getProjectsMW= require('../middleware/project/getProjectsMW');

describe('get projects list middleware',
    function () {
        var req = {};
        var res = {
            locals: {}
        };
        it('should return projects', function (done) {

            let fakeProjModel={
              find: function (err, cb) {
                  cb(undefined,['project1','project2'])
              }
            };
            getProjectsMW({
                projModel: fakeProjModel
            })(req,res,function (err) {
                expect(res.locals.projects).to.eql(['project1','project2']);
                expect(err).to.eql(undefined);
                done();
            });
        });
        it('should return error on db error', function (done) {

            let fakeProjModel2={
                find: function (err, cb) {
                    cb(true,undefined)
                }
            };
            getProjectsMW({
                projModel: fakeProjModel2
            })(req,res,function (err) {
                expect(err).to.eql(true);
                done();
            });
        });


    });
