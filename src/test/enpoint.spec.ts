import supertest from 'supertest';
import app from '../app';
import { PagingModel } from '../constant/response.constant';
import { OrderPayLoadModel } from '../order/entities/order.model';
import { ProductModel } from '../product/entities/product.model';
import { UserModel } from '../user/entities/user.model';


const request = supertest(app);
let token ='';
let productInsert  = new ProductModel();
describe('Enpoint Api', () => {
  const user = {
    username: 'casterpin',
    password: '12345678',
    firstName: 'Test',
    lastName: 'User 001',
  } as UserModel;
  const requestBody = { name: 'Test End Point Order', price: 100 } as ProductModel;
  const pageModel = {
    pageNo: 1,
    pageSize: 20,
  } as PagingModel;
  it('create user api endpoint',async()=>{
    const data = await request.post('/user/create').set('Accept', 'application/json').send(user);
    console.log(data);
    expect(data.status).toEqual(200);
  })
  it('login user api endpoint',async()=>{
    const loginUser = await request
      .post('/user/login')
      .set('Accept', 'application/json')
      .send(user);
      token = loginUser.body.data;
      expect(loginUser.status).toEqual(200);
  })
  it('show detail user api endpoint', async () => {
    const res = await request.get('/user/index').set('Authorization', `Bearer ${token}`);

    expect(res.body.data.username as string).toEqual('casterpin');
  });
  it('get all user api endpoint', async () => {
    const res = await request
      .get('/user/show')
      .set('Authorization', `Bearer ${token}`)
      .send({
        pageNo: 1,
        pageSize: 20,
      } as PagingModel);

    expect(res.body.data.items.length).toBeGreaterThan(0);
    expect(res.body.status).toBe(200);
  });
  it('create product api endpont',async() =>{
    const res  = await request.post('/product/create').set('Authorization', `Bearer ${token}`).send(requestBody);
    productInsert = res.body.data;

    expect(res.status).toEqual(200);
  })
  it('create order api endpoint', async () => {
    //get Product
    const orderModel = {
      quantity: 100,
      productId: productInsert.id as string,
    } as OrderPayLoadModel;
    const res = await request
      .post('/order/create')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(orderModel);
    expect(res.status).toEqual(200);
  });
  it('get all product api endpoint', async () => {
    const res = await request.post('/product/show').send(pageModel);
    expect(res.status).toEqual(200);
  });
  it('get detail product api endpoint', async () => {  
    const res = await request.get(`/product/index/${productInsert.id}`);
    expect(res.body.data.name).toEqual(requestBody.name);
  });
  it('get order of user api endpoint', async () => {
    // get order of user
    const res = await request.get('/order/detail').set('Authorization', `Bearer ${token}`);
    expect(res.status).toEqual(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});
