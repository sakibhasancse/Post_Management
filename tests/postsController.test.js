
import  request  from 'supertest';
import app from './../app';


jest.mock('./../Api/service/posts')

describe('Post controller suite' ,()=>{

test('should get 200', async() => {
   const response =await request(app).get('/posts')
   const body = response.body.posts

   expect(response.statusCode).toBe(200)
   expect(body.length).toBe(3)
   console.log(body[2])
   expect(body[0]._id).toBe('1')
})

})