<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h4>update recipe</h4>

      <form name="form" @submit="updateRecipe">
        <div v-if="!successful">
          <!-- <h3>user:{{currRecipe.username}}</h3> -->
          <!-- input of title -->
          <div class="form-group">
            <label for="title">title</label>
            <input v-model="currRecipe.title" type="text" class="form-control" name="title" />
          </div>

          <!-- input of qty -->
          <div class="form-group">
            <label for="qty">qty</label>
            <input v-model="currRecipe.qty" type="number" class="form-control" name="qty" />
          </div>

          <!-- input of protein -->
          <div class="form-group">
            <label for="protein">protein</label>
            <input v-model="currRecipe.protein" type="text" class="form-control" name="protein" />
          </div>

          <!-- input of fat -->
          <div class="form-group">
            <label for="fat">fat</label>
            <input v-model="currRecipe.fat" type="text" class="form-control" name="fat" />
          </div>

          <!-- input of carbs -->
          <div class="form-group">
            <label for="carbs">carbs</label>
            <input v-model="currRecipe.carbs" type="text" class="form-control" name="carbs" />
          </div>

          <!-- input of carbs -->
          <div class="form-group">
            <label for="ingredientLines">ingredientLines</label>
            <textarea
              v-model="currRecipe.ingredientLines"
              type="text"
              class="form-control"
              name="ingredientLines"
            />
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block">Upload recipe</button>
          </div>
        </div>
      </form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
    </div>
  </div>
</template>

<script>
import recipeService from '../services/recipe.service';

export default {
  name: 'addRecipe',
  data() {
    return {
      currRecipe: null,
      submitted: false,
      successful: false,
      message: '',
    };
  },
  methods: {
    getRecipe(id) {
      recipeService
        .getRecipe(id)
        .then((response) => {
          this.currRecipe = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateRecipe() {
      recipeService
        .updateRecipe(this.$route.params.id,this.currRecipe)
        .then((response) => {
          // console.log(response.data);
          alert("update successful")
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  computed: {
    currentUser() {
      var user = this.$store.state.auth.user;
      return user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    this.getRecipe(this.$route.params.id);
  },
};
</script>