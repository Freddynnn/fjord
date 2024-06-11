const { registerUser } = require('../controllers/users');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const httpMocks = require('node-mocks-http');

// Mock dependencies
jest.mock('../models/user');
jest.mock('bcrypt');

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
