<script setup>
import { ref, onMounted } from "vue";
import { collection, onSnapshot, addDoc,deleteDoc,doc,updateDoc,query, orderBy  } from "firebase/firestore";
import { db } from "@/firebase";

const todosCollectionRef=collection(db,"todos");
const todosCollectionQuery = query(todosCollectionRef, orderBy("date", "desc"));
const todos = ref([]);

onMounted(() => {
  onSnapshot(todosCollectionQuery, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
      };
      fbTodos.push(todo);
    });
    todos.value = fbTodos;
  });
});
const newTodoContent = ref("");

// add todo
function addTodo() {
  addDoc(todosCollectionRef, {
    content: newTodoContent.value,
    done: false,
    date:Date.now()
  });

  newTodoContent.value = "";
}

// delete todo
function deleteTodo(id) {
  deleteDoc(doc(todosCollectionRef, id))
}
// toggle todo
function toggleDone(id) {
  const index=todos.value.findIndex(todo=>todo.id===id);
  updateDoc(doc(db, "todos", id), {
   done: !todos.value[index].done
  });
}
</script>
<template>
  <v-container>
    <v-form @submit.prevent="addTodo">
      <div class="d-flex align-center justify-center">
        <v-text-field
          label="Label"
          variant="outlined"
          v-model="newTodoContent"
        ></v-text-field>
        <v-btn
          variant="outlined"
          type="submit"
          class="ms-3"
          color="success"
          :disabled="!newTodoContent"
        >
          Add
        </v-btn>
      </div>
    </v-form>
    <v-card
      v-for="(todo, index) in todos"
      :key="index"
      class="d-flex align-center justify-space-evenly mb-4 py-3"
      :class="todo.done ? 'bg-teal-lighten-5' : ''"
    >
      <p :class="todo.done ? 'text-decoration-line-through text-green' : ''">
        {{ todo.content }}
      </p>
      <div>
        <v-btn
          icon="mdi:mdi-check"
          variant="tonal"
          density="compact"
          :color="todo.done ? 'teal-darken-2' : 'cyan-lighten-2'"
          class="me-3"
          @click="toggleDone(todo.id)"
        >
        </v-btn>
        <v-btn
          icon="mdi:mdi-close-thick"
          variant="tonal"
          color="red"
          density="compact"
          @click="deleteTodo(todo.id)"
        >
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>
