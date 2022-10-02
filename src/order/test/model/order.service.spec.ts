import { PagingModel } from '../../../constant/response.constant';
import { Auth } from '../../../jwt/auth';
import { ProductModel } from '../../../product/entities/product.model';
import { ProductService } from '../../../product/service/product.service';
import { UserModel } from '../../../user/entities/user.model';
import { UserService } from '../../../user/service/user.service';
import { OrderModel } from '../../entities/order.model';
import { OrderService } from '../../service/order.service';

const orderService = new OrderService();
const productService = new ProductService();
const userService = new UserService();

describe('Order Service Test', () => {
 
  beforeAll(async () => {
    await userService.createUser({
      username: 'userordermodeltest1',
      password: '12345678',
      firstName: 'Test Order Model',
      lastName: 'Test Order Model',
    } as UserModel);
    
    await productService.create({
      name: 'Product Test Order 1', 
      price: 100
    });
  });
  
  it('create successfully', async () => {
    
    const users = await userService.getAll({
      pageNo: 1,
      pageSize: 20,
    } as PagingModel);
  
    var userTest = users.data.items.find((x:UserModel)=>x.username =="userordermodeltest1");

    const productData = await productService.getAll({
      pageNo: 1,
      pageSize: 20,
    } as PagingModel);
    
    var productTest = productData.data.items.find((x:ProductModel)=>x.name =="Product Test Order 1");
    const orderModel = {
      quantity: 100,
      product_id: productTest.id as string,
      user_id: userTest.id as string,
    } as OrderModel;

    const result = await orderService.create(orderModel);

    expect(result.status).toEqual(200);
  });
});
