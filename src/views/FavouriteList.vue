<template>
  <div class="container">
      <h4>My Favourites</h4>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">qty</th>
          <th scope="col">protein</th>
          <th scope="col">fat</th>
          <th scope="col">carbs</th>
          <th scope="col">ingredientLines</th>
          <th scope="col" colspan="2">control</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in contents" v-bind:key="item.id">
          <td>
            <img :src="item.image" height="100" width="100" />
          </td>
          <td>{{item.title}}</td>
          <td>{{item.qty}}</td>
          <td>{{item.protein}}</td>
          <td>{{item.fat}}</td>
          <td>{{item.carbs}}</td>
          <td>{{item.ingredientLines}}</td>
          <td>
            <button class="m-3 btn btn-sm btn-danger" @click="removeRecipe(item.id)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import RecipeService from '../services/recipe.service';
import FavService from '../services/favourite.service';

export default {
  name: 'favourite',
  data() {
    return {
      contents: [],
    };
  },
  methods: {
    removeRecipe(id) {
      FavService.removeRecipe(id)
        .then((response) => {
          this.getRecipe();

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // addFav(recipe,username) {
    //   FavService.addFav(recipe,username)
    //     .then((response) => {
    //       console.log(response.data);
    //       this.$alert("Hello Vue Simple Alert.");
    //       this.getRecipe();
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },

    getRecipe() {
      FavService.getFav().then(
        (response) => {
          this.contents = response.data;
        },
        (error) => {
          this.contents =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    this.getRecipe();
  },
};
</script>
