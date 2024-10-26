to run Server by nodemon  => npm run server
to run Server by node  => npm run start
to run server and DB all Time => npm start
to install => npm i

if(!localhost:4000 ){
localhost:6000
}else{
    call me
}



APIs OF BACKEND 

Register (POST):
http://localhost:4000/users/register

Example :
{
    "firstname" :"tooot",
    "lastname" : "mhassmed",
    "email" : "tasot@gmail.com",
    "password": "otda32888", must be at least 8 chars
    "country" : "EGY",
    "phone" : "010109288" just numbers
}


-------------------------------------------------------

Login (POST)
http://localhost:4000/users/login
Example:
{
    "email" : "tasot@gmail.com",
    "password": "otda32888", must be at least 8 chars
}

-------------------------------------------------------

Logout (POST)
http://localhost:4000/users/logout

-------------------------------------------------------

Get All Users (GET)
http://localhost:4000/users/all_users

-------------------------------------------------------

ADD Cart (POST)
http://localhost:4000/carts/add
لازم يكون اليوزر عامل Login
عشان يشتغل

-------------------------------------------------------

Delete Cart (DELETE)
http://localhost:4000/carts/remove
لازم يكون اليوزر عامل Login
عشان يشتغل

-------------------------------------------------------

GET CARTS (GET)
http://localhost:4000/carts/get
لازم يكون اليوزر عامل Login
عشان يشتغل

-------------------------------------------------------

ADD Product (POST)
http://localhost:4000/products/add
example json:
{
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: false }, // غير مطلوب
    image2: { type: String, required: false }, // غير مطلوب
    image3: { type: String, required: false }, // غير مطلوب
    image4: { type: String, required: false }, // غير مطلوب
};
غير مطلوب قصدي انه مش لازم 4 صور ممكن يحط 2 بس او 3 او 1 او ميحطش

-------------------------------------------------------

Delete Product (DELETE)
http://localhost:4000/products/remove
example
{
id :"klsdjjkcfhakwehfu"
}

-------------------------------------------------------

Get all products (GET)
http://localhost:4000/products/list

-------------------------------------------------------

Add Order (POST)
http://localhost:4000/orders/place
Example:
{
  "userId": "671709f405dbe1cb37904435",  // ضع معرف مستخدم حقيقي من قاعدة البيانات
  "items": [
    { "productId": "66fbac9f2a8230255d8de2c0" },
    { "productId": "66fbad452a8230255d8de2c2" }
  ],
  "amount": 35,
  "address": {
    "street": "123 Main St",
    "city": "Cairo",
    "zip": "12345"
  },
  "paymentMethod": "paypal"  // أو "stripe" حسب طريقة الدفع المطلوبة
}

-------------------------------------------------------

http://localhost:4000/orders/verify
To Verify Order paid or not (POST)

example:
    {
  "orderID": "7TE72426JA5795607",  // استخدم معرف الطلب الذي حصلت عليه من Place Order
  "paymentMethod": "paypal"
  }

-------------------------------------------------------

http://localhost:4000/orders/userOrders
To Get order of uniqe User

-------------------------------------------------------



http://localhost:4000/orders/allorders
To Get All Orders (GET)


-------------------------------------------------------

http://localhost:4000/users/favourites/add 
To add Favourite Item (POST)
Example:
{
  "userId": "671709f405dbe1cb37904435",
  "itemId": "66fbad452a8230255d8de2c2"
}


-------------------------------------------------------

 http://localhost:4000/users/favourites/list
 To Get Favourite Items for uniqe user (GET)
 {
  "userId": "671709f405dbe1cb37904435",
  "itemId": "66fbad452a8230255d8de2c2"
}

-------------------------------------------------------


http://localhost:4000/users/favourites/remove
To Remove Favourite Item (Delete)

{
    "itemId":"66f8e4ed1e6c445ca8c58db8"
}

-------------------------------------------------------

