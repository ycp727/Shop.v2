<template>
  <div>
    <q-item
      style="max-width: 420px"
      v-for="msg in messages"
      :key="msg.id"
      clickable
      v-ripple
    >
      <q-item-section avatar>
        <q-avatar>
          <img :src="msg.avatar" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ msg.name }}</q-item-label>
        <q-item-label caption lines="1">{{ msg.msg }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        {{ msg.time }}
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MessagesPage",
  setup() {
    return {
      messages: [
        {
          id: 1,
          name: " Don Quijote ",
          msg: " Y, viéndole don Quijote de aquella manera, con muestras de tanta tristeza, le dijo: Sábete, Sancho, que no es un hombre ",
          avatar: "https://avatars2.githubusercontent.com/u/34883558?s=400&v=4",
          time: "10:42 PM",
        },
        {
          id: 2,
          name: " Don Quijote ",
          msg: "más que otro si no hace más que otro. Todas estas borrascas que nos suceden son señales de que presto ha de serenar el",
          avatar: "https://cdn.quasar.dev/img/avatar6.jpg",
          time: "11:17 AM",
        },
        {
          id: 3,
          name: " Don Quijote ",
          msg: " tiempo y han de sucedernos bien las cosas; porque no es posible que el mal ni el bien sean durables, y de aquí se ",
          avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
          time: "5:17 AM",
        },
        {
          id: 4,
          name: " Don Quijote ",
          msg: " sigue que, habiendo durado mucho el mal, el bien está ya cerca. Así que, no debes congojarte por las desgracias que a ",
          avatar: "https://cdn.quasar.dev/team/jeff_galbraith.jpg",
          time: "5:17 AM",
        },
        {
          id: 5,
          name: " Don Quijote ",
          msg: " mí me suceden, pues a ti no te cabe parte dellas.Y, viéndole don Quijote de aquella manera, con muestras de tanta ",
          avatar: "https://cdn.quasar.dev/team/razvan_stoenescu.jpeg",
          time: "5:17 AM",
        },
      ],
    };
  },
});
</script>

<style scoped></style>
