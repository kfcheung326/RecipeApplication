<template>
  <div class="container">
    <header class="jumbotron">
      <div>
        <ul>
          <li>title: {{recipe.title}}</li>
          <li>qty:{{recipe.qty}}</li>
          <li>protein:{{recipe.protein}}</li>
          <li>fat:{{recipe.fat}}</li>

          <li>carbs:{{recipe.carbs}}</li>
          <li>ingredientLines:{{recipe.ingredientLines}}</li>
          <li>username:{{recipe.username}}</li>
        </ul>
      </div>
    </header>
    <div>
      <h4>Comment:</h4>
      <div v-if="haveComment">
        <form @submit="createComment()">
          <textarea v-model="comment.content" placeholder="input the comment....."></textarea>
          <div>
            <button class="btn btn-warning">create</button>
          </div>
        </form>
      </div>
      <div v-else>
        <label>comment faster:</label>
        <button class="btn btn-primary" @click="inputComment('great')">Great</button>
        <button class="btn btn-primary" @click="inputComment('useful')">useful</button>
        <div>
          <textarea v-model="comments.content" placeholder="input the comment....."></textarea>
        </div>
        <button class="btn btn-warning" @click="updateComment()">submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import CommentService from '../services/comment.service';
import RecipeService from '../services/recipe.service';

export default {
  name: 'comment',
  data() {
    return {
      recipe: '',
      comments: '',
      comment: {
        content: '',
        username: '',
        userId: '',
        recipeId: '',
      },
      haveComment: false,

    };
  },
  methods: {
    handPage(id) {
      
      RecipeService.getRecipe(id).then(
        (response) => {
          this.recipe = response.data;
        },
        (error) => {
          this.recipe =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );

      CommentService.getComment(id,this.$store.state.auth.user.id).then(
        (response) => {
          this.haveComment = false;
          this.comments = response.data;
        },
        (error) => {
          this.haveComment = true;
        }
      );


    },

    inputComment(text) {
      this.comments.content = text;
    },

    createComment() {
      this.comment.username = this.$store.state.auth.user.username;
      this.comment.userId = this.$store.state.auth.user.id;
      this.comment.recipeId = this.$route.params.id;

      CommentService.uploadComment(this.comment).then(
        (response) => {
          this.comments = response.data;
        },
        (error) => {
          // this.comment =
          //   (error.response && error.response.data) ||
          //   error.message ||
          //   error.toString();
        }
      );
    },
    updateComment() {
      CommentService.updateComment(this.comments.id, this.comments).then(
        (response) => {
          this.handPage(this.$route.params.id);
          alert("success to update comment");
        },
        (error) => {
          // this.comments =
          //   (error.response && error.response.data) ||
          //   error.message ||
          //   error.toString();
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
    this.handPage(this.$route.params.id);
  },
};
</script>
