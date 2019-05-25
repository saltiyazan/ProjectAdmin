let expect = require('chai').expect;
let saveProjectMW= require('../middleware/project/saveProjectMW');

describe('save project middleware',
    function () {

        it('should call next if req.body.name is undefined', function (done) {
            var req = {
                body:{}
            };
            var res = {
                locals: {}
            };
            saveProjectMW({projModel: true})(req,res,function () {
                done();
            })
        });

        it('should call next if req.body.description is undefined', function (done) {
            var req = {
                body:{name: 'test1'}
            };
            var res = {
                locals: {}
            };
            saveProjectMW({projModel: true})(req,res,function () {
                done();
            })
        });
        it('should call next if req.body.estimated_time is undefined', function (done) {
            var req = {
                body:{name:'test1',
                description:'test description'}
            };
            var res = {
                locals: {}
            };
            saveProjectMW({projModel: true})(req,res,function () {
                done();
            })
        });
        it('redirect to / if project data is modified and the data is successfully modified ', function (done) {
            var req = {
                body:{
                    name:'test1',
                    description:'test description',
                    estimated_time:3}
            };
            let projMock= {
                name: 'old name',
                description: 'old description',
                estimated_time: 2,
                save: function (cb) {
                    cb(undefined,{})
                }
            };

            var res = {
                locals: {
                    project: projMock
                },
                redirect: function (newurl) {
                    expect(res.locals.project.name).be.eql('test1');
                    expect(res.locals.project.description).be.eql('test description');
                    expect(res.locals.project.estimated_time).be.eql(3);
                    expect(newurl).be.eql('/');
                    done();
                }
            };
            saveProjectMW({projModel: true})(req,res,function () {
                expect('next should not be called').be.eql(false);
            })
        });

        it('should throw an error on db error', function (done) {
            var req = {
                body:{
                    name:'test1',
                    description:'test description',
                    estimated_time:3}
            };
            let projMock= {
                name: 'old name',
                description: 'old description',
                estimated_time: 2,
                save: function (cb) {
                    cb('error',{})
                }
            };

            var res = {
                locals: {
                    project: projMock
                },
                redirect: function (newurl) {
                    done();
                }
            };
            saveProjectMW({projModel: true})(req,res,function (err) {
                expect(err).be.eql('error');
                done();
            })
        });
        it('create new project, save it and redirect to / ', function (done) {
            var req = {
                body:{
                    name:'test1',
                    description:'test description',
                    estimated_time:3}
            };

            let projModelMock=function () {
            };
            projModelMock.prototype.save= function (cb) {
                expect(this.name).be.eql('test1');
                expect(this.description).be.eql('test description');
                expect(this.estimated_time).be.eql(3);
                cb(undefined,{});
            };

            var res = {
                locals: {
                },
                redirect: function (newurl) {

                    expect(newurl).be.eql('/');
                    done();
                }
            };
            saveProjectMW({projModel: projModelMock})(req,res,function () {
                expect('next should not be called').be.eql(false);
            })
        });


    });