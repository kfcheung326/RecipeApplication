<template>
  <div class="container">
    <h3>Search Recipe</h3>
    <form>
      <label>Search Recipe:</label>
      <label>{{sRecipe}}</label>
      <input type="text" v-model="sRecipe" />
      <button @click="searchRecipe() ">search</button>
    </form>
    <div>{{contents}}</div>

    <div>
      <table class="table table-striped" v-if="isRecipe">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">qty</th>
            <th scope="col">protein</th>
            <th scope="col">fat</th>
            <th scope="col">carbs</th>
            <th scope="col">ingredientLines</th>
          </tr>
        </thead>
        <tbody >
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
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import RecipeService from '../services/recipe.service';

export default {
  name: 'Home',
  data() {
    return {
      contents: [],
      sRecipe: "",
      isRecipe: false,
    };
  },
  methods: {
    // reRender() {
    //   this.isRecipe = false;
    //   this.isRecipe = true;

    // },
    searchRecipe() {
      RecipeService.getRecipeContent(this.sRecipe).then(
        (response) => {
          this.contents = response.data;
          // this.reRender();
          // this.$forceUpdate();
          this.isRecipe = true;

          console.log(response.data);
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
  mounted() {
    this.searchRecipe();
  },
};
</script>
