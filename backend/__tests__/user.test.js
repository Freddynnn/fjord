const { registerUser, loginUser, deleteUser, editUserByID } = require('../controllers/users');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const httpMocks = require('node-mocks-http');

jest.mock('../models/user');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('User Controller', () => {

    describe('registerUser', () => {
        it('should return 400 if username or password is missing', async () => {
            const req = httpMocks.createRequest({
                method: 'POST',
                body: { username: '', password: '' }
            });
            const res = httpMocks.createResponse();
            
            await registerUser(req, res);
            
            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toEqual({ error: 'Please fill in the required fields' });
        });

        it('should return 400 if username already exists', async () => {
            User.findOne.mockResolvedValue({ username: 'existingUser' });
            
            const req = httpMocks.createRequest({
                method: 'POST',
                body: { username: 'existingUser', password: 'password123' }
            });
            const res = httpMocks.createResponse();
            
            await registerUser(req, res);
            
            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toEqual({ error: 'Username already exists. Please choose a different one.' });
        });

        it('should create a new user successfully', async () => {
            User.findOne.mockResolvedValue(null);
            bcrypt.hash.mockResolvedValue('hashedPassword');
            User.prototype.save = jest.fn().mockResolvedValue(true);
            
            const req = httpMocks.createRequest({
                method: 'POST',
                body: { username: 'newUser', password: 'password123' }
            });
            const res = httpMocks.createResponse();
            
            await registerUser(req, res);
            
            expect(res.statusCode).toBe(201);
            expect(res._getJSONData()).toEqual({ message: 'User created successfully' });
        });
    });

    describe('loginUser', () => {
        it('should return 400 if username is not found', async () => {
            User.findOne.mockResolvedValue(null);
            
            const req = httpMocks.createRequest({
                method: 'POST',
                body: { username: 'nonexistentUser', password: 'password123' }
            });
            const res = httpMocks.createResponse();
            
            await loginUser(req, res);
            
            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toEqual({ code: 400, msg: 'Username not found' });
        });

        it('should return 401 if password is incorrect', async () => {
            User.findOne.mockResolvedValue({ username: 'existingUser', password: 'hashedPassword' });
            bcrypt.compare.mockResolvedValue(false);
            
            const req = httpMocks.createRequest({
                method: 'POST',
                body: { username: 'existingUser', password: 'wrongPassword' }
            });
            const res = httpMocks.createResponse();
            
            await loginUser(req, res);
            
            expect(res.statusCode).toBe(401);
            expect(res._getJSONData()).toEqual({ code: 401, msg: 'Incorrect password' });
        });

        it('should return a token if login is successful', async () => {
            User.findOne.mockResolvedValue({ username: 'existingUser', password: 'hashedPassword', _id: '123' });
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('fakeToken');
            
            const req = httpMocks.createRequest({
                method: 'POST',
                body: { username: 'existingUser', password: 'correctPassword' }
            });
            const res = httpMocks.createResponse();
            
            await loginUser(req, res);
            
            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual({
                code: 200,
                msg: 'Login success!',
                user: { _id: '123', username: 'existingUser' },
                token: 'fakeToken'
            });
        });
    });

    describe('deleteUser', () => {
        it('should return 404 if user not found', async () => {
            User.findById.mockResolvedValue(null);

            const req = httpMocks.createRequest({
                method: 'DELETE',
                params: { userId: 'nonexistentUserId' }
            });
            const res = httpMocks.createResponse();

            await deleteUser(req, res);

            expect(res.statusCode).toBe(404);
            expect(res._getJSONData()).toEqual({ code: 404, msg: 'User not found' });
        });

        it('should delete user if user exists', async () => {
            User.findById.mockResolvedValue({ _id: 'existingUserId' });
            User.findByIdAndDelete.mockResolvedValue(true);

            const req = httpMocks.createRequest({
                method: 'DELETE',
                params: { userId: 'existingUserId' }
            });
            const res = httpMocks.createResponse();

            await deleteUser(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual({ code: 200, msg: 'User deleted successfully' });
        });
    });

    describe('editUserByID', () => {
        it('should return 404 if user ID is invalid', async () => {
            mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(false);

            const req = httpMocks.createRequest({
                method: 'PUT',
                params: { userId: 'invalidUserId' }
            });
            const res = httpMocks.createResponse();

            await editUserByID(req, res);

            expect(res.statusCode).toBe(404);
            expect(res._getJSONData()).toEqual({ error: 'User with ID invalidUserId does not exist' });
        });

        it('should return 404 if user not found', async () => {
            mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
            User.findByIdAndUpdate.mockResolvedValue(null);

            const req = httpMocks.createRequest({
                method: 'PUT',
                params: { userId: 'validUserId' },
                body: { username: 'newUsername' }
            });
            const res = httpMocks.createResponse();

            await editUserByID(req, res);

            expect(res.statusCode).toBe(404);
            expect(res._getJSONData()).toEqual({ error: 'User with ID validUserId not found' });
        });

        it('should update user if user exists', async () => {
            mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
            const updatedUser = { _id: 'validUserId', username: 'newUsername' };
            User.findByIdAndUpdate.mockResolvedValue(updatedUser);

            const req = httpMocks.createRequest({
                method: 'PUT',
                params: { userId: 'validUserId' },
                body: { username: 'newUsername' }
            });
            const res = httpMocks.createResponse();

            await editUserByID(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(updatedUser);
        });
    });
});
