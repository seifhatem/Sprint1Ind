<template>
<div>
  <div clas="container">
      <h1>Products</h1>


      <table class="table table-striped table-borderes">
      <thead>
        <tr>
           <th class="center">Name</th>
           <th class="center">Price</th>
           <th class="center">Created At</th>
           <th class="center">Updated At</th>
           <th class="center">Seller</th>
           <th class="center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product_details in Product">
          <td class="text-left"> {{ product_details.name}}</td>
          <td class="text-left"> {{ product_details.price}}</td>
          <td class="text-left"> {{ product_details.createdAt}}</td>
          <td class="text-left"> {{ product_details.updatedAt}}</td>
          <td class="text-left"> {{ product_details.seller}}</td>
          <td class="text-center"><span @click="editForm(product_details._id,product_details.name,product_details.price,product_details.seller);" class="ti-pencil"/>  <span @click="deleteProduct(product_details._id);" class="ti-trash"/></td>

        </tr>
      </tbody>
    </table>
      </div>

      <div align="center" class="productsadd">
          <h1>Add/edit product</h1>
          <form>
          Name: <input type="text" v-model="add_name" name="name"><br><br>
          Price: <input type="text" v-model="add_price" name="price"><br><br>
          Seller: <input type="text" v-model="add_seller" name="seller"><br><br>
          <input type="button" value="Add" @click="addProduct();" />
          <input type="button" value="Edit" @click="editProduct();" />
          </form>
      </div>

      </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
export default {
    name:'Store',
    data() {
        return {
            Product: [],
            add_name: '',
            add_price: '',
            add_seller: '',
            add_autoid: ''
        }
    },
        mounted() {
        this.reloadProducts()
    },
    methods: {
    editForm: function (productId,name,price,seller) {
      this.add_autoid = productId
      this.add_name=name
      this.add_price=price
      this.add_seller=seller
    },
    deleteProduct: function (productId) {
    axios.delete('http://localhost:3000/api/product/deleteProduct/'+productId).then(res => {
        this.reloadProducts()
      })
      .catch((error) => {
          console.dir(error);
          alert(error.response.data.msg);
      });
    },
    addProduct: function () {
    axios.post('http://localhost:3000/api/product/createProduct', {
    name: this.add_name,
    price: this.add_price,
    seller: this.add_seller,
    }).then(res => {
        this.reloadProducts()
        this.add_name = ''
        this.add_price= ''
        this.add_seller= ''
        this.add_autoid= ''
      })
      .catch((error) => {
          console.dir(error);
          alert(error.response.data.msg);
      });
    },
    editProduct: function () {
    axios.patch('http://localhost:3000/api/product/updateProduct/'+this.add_autoid, {
    name: this.add_name,
    price: this.add_price,
    seller: this.add_seller,
    }).then(res => {
        this.reloadProducts()
        this.add_name = ''
        this.add_price= ''
        this.add_seller= ''
        this.add_autoid= ''
      })
      .catch((error) => {
          console.dir(error);
          alert(error.response.data.msg);
      });
    },
    reloadProducts(){
    axios.get('http://localhost:3000/api/product/getProducts')
        .then((response) => {
            this.Product = response.data.data;
        })
        .catch((error) => {
            console.log(error);
        });
    }
    },
  }
</script>

<style>

</style>
