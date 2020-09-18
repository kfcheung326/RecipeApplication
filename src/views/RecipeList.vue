<template>
  <div class="container">
      <h4>Recipe</h4>
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
          <th scope="col">username</th>
          <th scope="col" colspan="3">control</th>
          <th scope="col">comment</th>


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
          <td>{{item.username}}</td>
          <td>
            <button class="m-3 btn btn-sm btn-primary" @click="addFav(item,currentUser.username)">Add favourite</button>
          </td>
          <td v-if="item.username== currentUser.username">
            <button class="m-3 btn btn-sm btn-danger" @click="removeRecipe(item.id)">Remove</button>
          </td>
          <td v-if="item.username== currentUser.username">
            <a class="badge badge-warning" :href="'/recipe/'+item.id">edit</a>
          </td>
          <td>
            <a class="badge badge-warning" :href="'/comment/'+item.id">view comment</a>
          </td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import RecipeService from '../services/recipe.service';
import FavService from '../services/favourite.service';

export default {
  name: 'Home',
  data() {
    return {
      contents: [],
      sRecipe: '',
    };
  },
  methods: {
    removeRecipe(id) {
      RecipeService.removeRecipe(id)
        .then((response) => {
          this.getRecipe();
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    addFav(recipe) {
      FavService.addFav(recipe,this.$store.state.auth.user.id)
        .then((response) => {
          console.log(response.data);
          this.$alert("added recipe to favourites");
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getRecipe() {
      RecipeService.getDbRecipe().then(
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
