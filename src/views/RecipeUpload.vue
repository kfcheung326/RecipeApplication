<template>
  <div class="col-md-12">
    <div class="card card-container">
      <form name="form" @submit="handleRecpie">
        <div v-if="successful">upload recipe successful</div>

        <div v-if="!successful">
          <h3>user:{{recipe.username}}</h3>
          <!-- input of title -->
          <div class="form-group">
            <label for="title">title</label>
            <input v-model="recipe.title" type="text" class="form-control" name="title" />
          </div>

          <!-- input of qty -->
          <div class="form-group">
            <label for="qty">qty</label>
            <input v-model="recipe.qty" type="number" class="form-control" name="qty" />
          </div>



          <!-- input of protein -->
          <div class="form-group">
            <label for="protein">protein</label>
            <input v-model="recipe.protein" type="text" class="form-control" name="protein" />
          </div>

          <!-- input of fat -->
          <div class="form-group">
            <label for="fat">fat</label>
            <input v-model="recipe.fat" type="text" class="form-control" name="fat" />
          </div>

          <!-- input of carbs -->
          <div class="form-group">
            <label for="carbs">carbs</label>
            <input v-model="recipe.carbs" type="text" class="form-control" name="carbs" />
          </div>

          <!-- input of carbs -->
          <div class="form-group">
            <label for="ingredientLines">ingredientLines</label>
            <textarea
              v-model="recipe.ingredientLines"
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
      recipe: {
        title: '',
        qty: '',
        energy:'',
        protein: '',
        fat: '',
        carbs: '',
        ingredientLines: '',
        username: this.$store.state.auth.user.username,
      },
      submitted: false,
      successful: false,
      message: '',
    };
  },
  methods: {
    handleRecpie() {
      var data = {
        title: this.recipe.title,
        qty: this.recipe.qty,
        protein: this.recipe.protein,
        energy: this.recipe.energy,
        fat: this.recipe.fat,
        carbs: this.recipe.carbs,
        ingredientLines: this.recipe.ingredientLines,
        username: this.recipe.username,
      };

      recipeService
        .uploadRecipe(data)
        .then((response) => {
          //   this.poster.id = response.data.id;
          console.log(response.data);
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
  },
};
</script>